import React, { useState, useEffect } from 'react'
import { 
  StyleSheet,
  View,
	FlatList
} from 'react-native'
import { loadFromStorage } from '../Utils'
import { Button, SearchBar, Card } from 'react-native-elements'
import { Colors } from '../Themes'
import FlightInformation from '../Components/FlightInformation'

const FlightAlert = () => {
  const [data, setData] = useState([])
  const renderItem = ({ item }) => {
    return (
        <Card>
          <FlightInformation item={item} />
        </Card>
    )
  }
  const keyExtractor = (item, index) => index.toString()
  useEffect(() => {
    const fetchData = async () => {
      const flightAlert = await loadFromStorage('@flight_alerts') 
      setData(flightAlert)
    }
    fetchData()
  }, [])
  return (
    <View style={{ flex: 1 }}>
        <FlatList
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={10}
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
        />
    </View>
  )
}
export default FlightAlert 
