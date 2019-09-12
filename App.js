/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useDimensions } from 'react-native-hooks'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import FlightList from './src/Containers/FlightList'
import FlightAlert from './src/Containers/FlightAlert'
import { Colors } from './src/Themes'
import { setBadge, notificationListener } from './Firebase'

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: Colors.main ,
  },
  tab: {
    backgroundColor: Colors.darkGreen,
  }
})
const App = () => {
  const [navigationState, setNavigationState] = useState({
    index: 0,
    routes: [
      { key: 'flight', title: 'Flights' },
      { key: 'alert', title: 'Manage Alerts' },
    ] 
  })

  const { width, height } = useDimensions().window

  useEffect(() => {
    notificationListener() 
  }, [])

  useEffect(() => {
    setBadge(0)
  }, [])

  return (
      <TabView
        navigationState={navigationState}
        renderScene={SceneMap({
          flight: FlightList,
          alert: FlightAlert,
        })}
        renderTabBar={props => (
          <TabBar
            {...props}
            tabStyle={styles.tabStyle}
            style={styles.tab}
          />
        )}
        onIndexChange={index => setNavigationState({...navigationState, index})}
        initialLayout={{ width, height}}
      />
  );
}
export default App;
