import React, { useState, useEffect } from "react";

import { styles } from "./styles"
import { Fontisto } from "@expo/vector-icons";
import { View, Text, ImageBackground, FlatList, Alert, Platform, Share } from 'react-native'
import { Background } from "../../components/Background";
import { Header } from "../../components/Header"; 
import { ListHeader } from "../../components/ListHeader";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Member, MemberProps } from "../../components/Member";
import { BorderlessButton } from "react-native-gesture-handler";
import { ListDivider } from "../../components/ListDivider";
import { theme } from "../../global/styles/theme";
import BannerImg from '../../assets/banner.png'
import { useRoute } from "@react-navigation/native";
import { AppointmentProps } from "../../components/Appointment";
import { api } from "../../services/api";
import { Load } from '../../components/Load'
import * as Linking from 'expo-linking'

type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export const AppointmentDetails = () => {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget)
  const [loading, setLoading] = useState(true)

  const routes = useRoute()
  const { guildSelected } = routes.params as Params

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`guilds/${guildSelected.guild.id}/widget.json`)
      setWidget(response.data)
      setLoading(false)
    } catch (err) {
      Alert.alert("Verifique as configurações do servidor. O Widget pode estar desabilidato")
    } finally {
      setLoading(false)
    }
  }

  function handleShareInvitation() {
    console.log(widget.instant_invite)

    const message = Platform.OS === 'ios' 
    ? `Junte-se a ${guildSelected.guild.name}`
    : widget.instant_invite

    Share.share({
      message,
      url: widget.instant_invite
    })
  }

  function handleOpenGuild () {
    Linking.openURL(widget.instant_invite)
  }

  useEffect(() => {
    fetchGuildWidget()
  }, [])

  return (
    <Background>
      <Header 
        title="Detalhes"
        action={
          guildSelected.guild.owner &&
          <BorderlessButton onPress={handleShareInvitation}>
            <Fontisto 
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground 
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          
          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>

      {
        loading 
        ? <Load />
        : (
          <>
            <ListHeader 
              title="Jogadores"
              subtitle={`Total ${widget.members.length}`}
            />
              
            <FlatList 
              data={widget.members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Member data={item} />  
              )}
              ItemSeparatorComponent={() => <ListDivider />}
              style={styles.members}
            />
          </>
        )
      }

      {
        guildSelected.guild.owner &&
        <View style={styles.footer}>
          <ButtonIcon 
            title="Entrar na partida"
            onPress={handleOpenGuild}
          />
        </View>
      }

    </Background>
  )
}