import React from "react"
import { Platform } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import Decks from "./Decks"
import AddDeck from "./AddDeck"
import { standout, secondaryLight, white } from "../utils/colors"

const Tab = createBottomTabNavigator()
export default function Tabs () {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon
          if (route.name === "Decks") {
            icon = (
              <Ionicons name="ios-bookmarks" size={size} color={color}/>
            )
          } else if (route.name === "AddDeck") {
            icon = (
              <FontAwesome name="plus-square" size={size} color={color}/>
            )
          }
          return icon
        }
      })}
      options={{
        header: null
      }}
      tabBarOptions={{
        activeTintColor: white,
        inactiveTintColor: secondaryLight,
        style: {
          height: 60,
          backgroundColor: standout,
          shadowColor: `rgba(0, 0, 0, 0.24)`,
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      }}
    >
      <Tab.Screen name="Decks" component={Decks} />
      <Tab.Screen name="AddDeck" component={AddDeck} />
    </Tab.Navigator>
  )
}
