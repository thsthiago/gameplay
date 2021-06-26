import React, { useState } from "react"

import { View, FlatList } from "react-native"

import { styles } from './styles'
import { Profile } from "../../components/Profile"
import { ButtonAdd } from "../../components/ButtonAdd"
import { CategorySelect } from "../../components/CategorySelect"
import { ListHeader } from "../../components/ListHeader"
import { Appointment } from "../../components/Appointment"
import { ListDivider } from "../../components/ListDivider"
import { Background } from '../../components/Background'
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { stateProps } from "../SignIn"

export const Home = () => {
  const [category, setCategory] = useState('')
  const navegation = useNavigation()
  const { user } = useSelector((state: stateProps) => state.auth)

  const appointments = [
    {
      id: '1',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: 'É hoje que vamos chegar ao challenger sem perder um partida da md10'
    },
    {
      id: '2',
      guild: {
        id: '2',
        name: 'Lendários',
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: 'É hoje que vamos chegar ao challenger sem perder um partida da md10'
    }
  ]

  function handleCategorySelect(categodyId: string) {
    categodyId === category ? setCategory('') : setCategory(categodyId)
  }

  function handleAppointmentDetails () {
    navegation.navigate('AppointmentDetails')
  }

  function handleApponintmentCreate () {
    navegation.navigate('AppointmentCreate')
  }

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
    
      <ListHeader 
        title="Partidas agendadas"
        subtitle="Total 7"
      />
      
      <FlatList 
        data={appointments}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Appointment 
            data={item} 
            onPress={handleAppointmentDetails}
          />
        )}
        ItemSeparatorComponent={() => <ListDivider />}
        contentContainerStyle={{ paddingBottom: 30 }}
        style={styles.matches}
        showsVerticalScrollIndicator={false}
      />
    </Background>
  )
}