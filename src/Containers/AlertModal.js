import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { Text } from 'react-native-elements'
import Firebase from "react-native-firebase"
import { Button, Card, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modal'
import moment from 'moment'
import { Colors } from '../Themes'
import { saveToStorage } from '../Utils'
import { ModalContainer, TextInfo, TextSuccess, AlertTitle } from '../Components/Styled'
import { buildNotification } from '../../Firebase'

console.log(buildNotification)

const AlertModal = ({ isModalVisible, toggleModal, flight, selectedDate }) => {
  const handleAlertSetting = async () => {
    if (!!flight.time) {
      const arriveTime = moment(`${moment(selectedDate).format('YYYY-MM-DD')} ${flight.time}`)
                        .subtract(30, "minutes")
      Firebase.notifications().scheduleNotification(buildNotification(flight), {
         fireDate: arriveTime.valueOf()
      });
      Alert.alert(
        'Set alert/notification for the flight successfully!'
      )
    }
    await saveToStorage('@flight_alerts', flight)
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isModalVisible}>
        <ModalContainer>
          <AlertTitle>Manage Alert</AlertTitle>
          <View style={{ height: 300 }}>
            <Text h4>Alert Date</Text> 
            <TextInfo>{moment(selectedDate).format('MMM D, YYYY')}</TextInfo>
            <Text h4>Minutes out Alert</Text> 
            <TextInfo>30 minutes before arriving</TextInfo> 
          </View>
          <View>
            <Button
                icon={<Icon name='bell' color='#ffffff' />}
                buttonStyle={{ marginTop: 10, backgroundColor: Colors.main }}
                titleStyle={{ padding: 10 }}
                title='Set Alert'
                onPress={handleAlertSetting}
            />
            <Button
              title="Close"
              onPress={toggleModal}
              buttonStyle={{ marginTop: 10, backgroundColor: Colors.fire }}
              titleStyle={{ padding: 10 }}
            />
          </View>
        </ModalContainer>
      </Modal>
    </View>
  )
}

export default AlertModal
