import React from 'react'

import { View, FlatList } from 'react-native'
import { GuildProps } from '../../components/Guild'
import { Guild } from '../../components/Guild'
import { ListDivider } from '../../components/ListDivider'

import { styles } from './styles'

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
}

export const Guilds = ({ handleGuildSelect }: Props) => {
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: 'image.png',
      owner: true
    },
    {
      id: '2',
      name: 'Galera do game',
      icon: 'image.png',
      owner: true
    }
  ]
  
  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Guild 
            data={item} 
            onPress={() => handleGuildSelect(item)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 100 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        ListHeaderComponent={() => <ListDivider isCentered />}
        style={styles.guilds}
      />
    </View>
  )
}