import React, { useState, useEffect } from 'react'

import { View, FlatList } from 'react-native'
import { Guild, GuildProps } from '../../components/Guild'
import { ListDivider } from '../../components/ListDivider'
import { Load } from '../../components/Load'
import { api } from '../../services/api'

import { styles } from './styles'

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
}

export const Guilds = ({ handleGuildSelect }: Props) => {
  const [guilds, setGuilds] = useState<GuildProps[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchGuild() {
    const response = await api.get('/users/@me/guilds')
    setGuilds(response.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchGuild()
  }, [])

  return (
    <View style={styles.container}>
      {
        loading 
        ? <Load />
        : (
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
        )
      }
      
      
    </View>
  )
}