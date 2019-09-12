import React, { useState, useEffect } from 'react'
import { 
	Text as TextNative,
  View
} from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '../Themes'

export const AlertTitle = styled(TextNative)`
  font-size: 26;
  margin-top: 15;
  margin-bottom: 15;
  text-align: center;
  color: ${Colors.main}; 
`
export const FlightNo = styled(TextNative)`
  font-size: 19;
  margin-bottom: 10;
  text-align: center;
  font-weight: bold;
  color: ${Colors.main}; 
`
export const TextInfo = styled(TextNative)`
  font-size: 14;
  margin-top: 10;
  margin-bottom: 15;
  text-align: center;
  color: ${Colors.main}; 
`
export const TextSuccess = styled(TextNative)`
  font-size: 16;
  margin-top: 10;
  margin-bottom: 15;
  text-align: center;
  font-weight: bold;
  color: ${Colors.main}; 
`
export const Title = styled(TextNative)`
  font-weight: bold
`
export const AirPortName = styled(TextNative)`
  color: ${Colors.fire} 
`
export const FlightInfoContainer = styled.View`
  flex-direction: row;
  flex: 1; 
`
export const ModalContainer = styled.View`
 flex: 1;
 padding-top: 10;  
 padding-bottom: 30;  
 padding-bottom: 20;  
 padding-right: 15;  
 padding-left: 15;  
 background-color: white;
 justify-content: space-between;
`
