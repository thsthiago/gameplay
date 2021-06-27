import React, { useState } from "react";
import uuid from 'react-native-uuid'

import { styles } from './styles'
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { RectButton } from "react-native-gesture-handler";
import { Background } from "../../components/Background";
import { Header } from "../../components/Header"; 
import { CategorySelect } from "../../components/CategorySelect";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../global/styles/theme";
import { GuildIcon } from "../../components/GuildIcon";
import { SmallInput } from "../../components/SmallInput";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { ModalView } from "../../components/ModalView";
import { Guilds } from "../Guilds";
import { GuildProps } from "../../components/Guild";

import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLLECTION_APPOINTMENT } from "../../configs/database";
import { useNavigation } from "@react-navigation/native";

export const AppointmentCreate = () => {
  const [category, setCategory] = useState('')
  const [openGuildModal, setOpenGuildsModal] = useState(false)
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [description, setDescription] = useState('')

  const navegation = useNavigation()

  function handleOpenGuilds () {
    setOpenGuildsModal(true)
  }

  function handleCloseGuilds () {
    setOpenGuildsModal(false)
  }

  function handleOpenSelect (guildSelect: GuildProps) {
    setGuild(guildSelect)
    setOpenGuildsModal(false)
  }

  function handleCategorySelect(categodyId: string) {
    setCategory(categodyId)
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}/${minute}h`,
      description
    }

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENT)
    const appointments = storage ? JSON.parse(storage) : []

    await AsyncStorage.setItem(COLLECTION_APPOINTMENT, JSON.stringify([...appointments, newAppointment]))

    navegation.navigate('Home')
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <Background>
          <Header 
            title="Agendar partida"
          />

          <Text style={[styles.label, 
            { marginLeft: 24, marginTop: 36, marginBottom: 18}]}
          >Categoria</Text>

          <CategorySelect 
            hasCheckBox 
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {
                  guild.icon 
                  ? <GuildIcon guildId={guild.id} iconId={guild.icon}/> 
                  : <View style={styles.image} />
                  
                }

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>

                <Feather 
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>
          
            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>Dia e mês</Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setDay}/>
                  <Text style={styles.divider}>
                    /
                  </Text>
                  <SmallInput maxLength={2} onChangeText={setMonth}/>
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>Hora e minuto</Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setHour}/>
                  <Text style={styles.divider}>
                    :
                  </Text>
                  <SmallInput maxLength={2} onChangeText={setMinute}/>
                </View>
              </View>
            </View>
            
            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.caractersLimit}>Max 100 caracteres</Text>
            </View>


            <TextArea 
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button 
                title="Agendar"
                onPress={handleSave}
              />
            </View>
          </View>
        </Background>
      </ScrollView>

      <ModalView visible={openGuildModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleOpenSelect}/>
      </ModalView>
    </KeyboardAvoidingView>
  )
}