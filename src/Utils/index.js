import find from 'lodash/find'
import uniqBy from 'lodash/uniqBy'
import * as Airport from '../Data/airport.json'
import AsyncStorage from '@react-native-community/async-storage'

export function getAirportName(code) {
  const result = find(Airport, item => item.code === code)
  if (result) {
    return result.name
  }
  return ''
}  

export async function loadFromStorage(key) {
  try {
      const retrievedItem = await AsyncStorage.getItem(key)
      if(retrievedItem !== null) {
        return JSON.parse(retrievedItem)
      }
      return null
  } catch(e) {
    return null
  } 
}

export async function saveToStorage(key, item) {
  try {
      let data = []
      const retrievedItem = await AsyncStorage.getItem(key)
      if(retrievedItem !== null) {
        data = JSON.parse(retrievedItem) 
      }
      data = uniqBy([...data, item], item => item.flight[0].no)
      await AsyncStorage.setItem(key, JSON.stringify(data));
      return data
  } catch(e) {
    return null
  } 
}

export const delay = (duration) =>
  new Promise(resolve => setTimeout(resolve, duration))
