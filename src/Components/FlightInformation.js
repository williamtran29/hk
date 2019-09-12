import React from 'react'
import { 
  StyleSheet,
  View,
	Text as TextNative
} from 'react-native'
import { Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getAirportName } from '../Utils'
import { FlightInfoContainer, FlightNo, AirPortName, Title } from './Styled'

export default function FlightInformation({ item }) {
  return (
    <View style={{ flex: 1, height: 180}}>
          {!!item.flight && item.flight[0] && 
            <FlightNo>{item.flight[0].no}</FlightNo>
          }
          <FlightInfoContainer>
            <View style={{ width: '45%' }}>
              {!!item.flight && item.flight[0] && 
                <>
                  <Title>{item.flight[0].airline}</Title>
                  <AirPortName>{getAirportName(item.flight[0].airline)}</AirPortName>
                </>
              } 
                {!!item.status &&
                  <Text>{item.status}</Text>
                }
                {!!item.statusCode &&
                  <Text>Flight Status: {item.statusCode}</Text>
                }
                {!!item.aisle &&
                  <Text>Aisle: {item.aisle}</Text>
                }
                {!!item.gate &&
                  <Text>Gate: {item.gate}</Text>
                }
                {!!item.terminal &&
                  <Text>Terminal: {item.terminal}</Text>
                }
            </View>
            <View style={{ width: '10%'}}>
              <Icon name="arrow-right" />
            </View>
            <View style={{ width: '45%' }}>
                {!!item.destination && item.destination[0] &&
                  <>
                    <Title>{item.destination[0]}</Title>
                    <AirPortName>{getAirportName(item.destination[0])}</AirPortName>
                  </>
                }
                <Text>Time of arrival: {item.time}</Text>
            </View>
          </FlightInfoContainer>
    </View>
)}
