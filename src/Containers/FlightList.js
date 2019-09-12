import React, { useState, useEffect } from 'react'
import { 
  Platform,
  StyleSheet,
  View,
	FlatList
} from 'react-native'
import { flatten, isEmpty, filter, map, at} from 'lodash'
import { Button, SearchBar, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker'
import LottieLoader from 'react-native-lottie-loader'
import Moment from 'moment'
import 'moment-timezone'

import Api from '../../Api'
import { saveToStorage } from '../Utils'
import { Colors } from '../Themes'
import FlightInformation from '../Components/FlightInformation'
import AlertModal from './AlertModal'

const FlightList = () => {

  const [loading, setLoading] = useState(false)
  const [displayAlertModal, setDisplayAlertModal] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [flightList, setFlightList] = useState([])
  const [data, setData] = useState([])
  const [search, setSearch] = useState('') 

  const updateSearch = keyword => {
    setSearch(keyword) 
    if (keyword && keyword.length >= 2) {
      const newData = filter(flightList, item => {
        const flightInfo = map(item.flight, i => at(i, 'airline', 'no')).join(', ')
                          .concat(` ${!!item.destination && item.destination[0].toLowerCase()}`)
        return flightInfo.toLowerCase().includes(keyword.toLowerCase());
      })
      setData(newData)
    }
  }

  const setDate = (event, date) => {
      date = date || selectedDate
      setShowDatePicker(Platform.OS === 'ios' ? true : false)
      setSelectedDate(date);
      setSearch('')
      setData([])
  }

  const keyExtractor = (item, index) => index.toString()

  const handleFlightAlert = item => () => {
    setSelectedFlight(item)
    setDisplayAlertModal(!displayAlertModal) 
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await Api.getFlights(Moment(selectedDate)
                                .format('YYYY-MM-DD'))
        if (result && result.data && !isEmpty(result.data)) {
          const list = flatten(result.data.map(item => item.list))
          setFlightList(list)
          setData([])
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log('error', error)
      }
    }
    fetchData()  
  }, [selectedDate])

  const renderItem = ({ item }) => {
    return (
        <Card>
          <FlightInformation item={item} />
          <Button
            icon={<Icon name='bell' color='#ffffff' />}
            buttonStyle={{ marginTop: 10, backgroundColor: Colors.main }}
            titleStyle={{ padding: 10 }}
            title='Create Flight Alert'
            onPress={handleFlightAlert(item)}
          />
        </Card>
    )
  }
  return (
      <View style={{ flex: 1}} >
         <LottieLoader
          visible={loading}
          source={require("../Data/airplane.json")}
          animationStyle={{
            width: 200,
            height: 200
          }}
          speed={1}
        />
        <Button
          icon={
            <Icon
              name="calendar"
              size={15}
              color={Colors.main}
            />
          }
          titleStyle={{ padding: 10, color: Colors.main}}
          iconRight
          title={`Departing Date - ${Moment(selectedDate).format('DD/MM/YYYY')}`}
          type="clear"
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker &&
            <DateTimePicker value={selectedDate}
              mode='date'
              is24Hour={true}
              display="default"
              onChange={setDate}
            />
        }
       <SearchBar
          placeholder="flight or tail number,airport"
          onChangeText={updateSearch}
          value={search}
          lightTheme={true}
        />
        <FlatList
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={10}
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
        />
        <AlertModal
          flight={selectedFlight}
          isModalVisible={displayAlertModal}
          selectedDate={selectedDate}
          toggleModal={() => setDisplayAlertModal(!displayAlertModal)}
        />
      </View>
  )
}
export default FlightList
