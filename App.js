import React from "react"
import { View, Text } from "react-native"
import { createStore } from "redux"
import { Provider as StoreProvider } from "react-redux"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

// Store-related imports
import middleware from "./middleware"
import reducer from "./reducers"

// Navigation-related imports
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import Tabs from "./components/Tabs"
import Deck, { DeckOptions } from "./components/Deck"
import AddCard, { AddCardOptions } from "./components/AddCard"
import Quiz, { QuizOptions } from "./components/Quiz"

const store = createStore(reducer, middleware)

const Stack = createStackNavigator()

export default function App () {
  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Decks"
              >
              <Stack.Screen
                name="Decks"
                component={Tabs}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Deck"
                component={Deck}
                options={DeckOptions}
              />
              <Stack.Screen
                name="AddCard"
                component={AddCard}
                options={AddCardOptions}
              />
              <Stack.Screen
                name="Quiz"
                component={Quiz}
                options={QuizOptions}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </StoreProvider>
    </SafeAreaProvider>
  )
}
