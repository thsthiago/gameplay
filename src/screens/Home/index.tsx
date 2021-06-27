import React, { useState, useCallback } from "react"

import { View, FlatList } from "react-native"

import { styles } from './styles'
import { Profile } from "../../components/Profile"
import { ButtonAdd } from "../../components/ButtonAdd"
import { CategorySelect } from "../../components/CategorySelect"
import { ListHeader } from "../../components/ListHeader"
import { Appointment, AppointmentProps } from "../../components/Appointment"
import { ListDivider } from "../../components/ListDivider"
import { Background } from '../../components/Background'
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLLECTION_APPOINTMENT } from "../../configs/database"
import { Load } from "../../components/Load"

export const Home = () => {
  const [category, setCategory] = useState('')
  const navegation = useNavigation()
  const [appointments, setAppointments] = useState<AppointmentProps[]>([])
  const [loading, setLoading] = useState(true)

  function handleCategorySelect(categodyId: string) {
    categodyId === category ? setCategory('') : setCategory(categodyId)
  }

  function handleAppointmentDetails (guildSelected: AppointmentProps) {
    navegation.navigate('AppointmentDetails', { guildSelected })
  }

  function handleApponintmentCreate () {
    navegation.navigate('AppointmentCreate')
  }

  async function handleAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENT)
    const storage: AppointmentProps[] = response ? JSON.parse(response) : []
  
    if (category) {
      setAppointments(storage.filter(item => category === item.category))
    } else {
      setAppointments(storage)
    }

    setLoading(false)
  }

  useFocusEffect(useCallback(() => {
    handleAppointments()
  } ,[category]))

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleApponintmentCreate}/>
      </View>

      <CategorySelect 
        categorySelected={category}
        setCategory={handleCategorySelect}
      />
    
      {
        loading ? (
          <Load />
        ) : (
          <>
            <ListHeader 
              title="Partidas agendadas"
              subtitle={`Total ${appointments.length}`}
            />
            
            <FlatList 
              data={appointments}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Appointment 
                  data={item} 
                  onPress={() => handleAppointmentDetails(item)}
                />
              )}
              ItemSeparatorComponent={() => <ListDivider />}
              contentContainerStyle={{ paddingBottom: 30 }}
              style={styles.matches}
              showsVerticalScrollIndicator={false}
            />
          </>
        )
      }
    </Background>
  )
}