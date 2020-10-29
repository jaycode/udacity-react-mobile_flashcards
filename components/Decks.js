import React, { useEffect } from "react"
import { ScrollView, View, Text, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { handleInitialData } from "../actions"
import DeckItem from "../components/DeckItem"
import Header from "../components/Header"

export default function Decks({ navigation }) {
  const decks = useSelector(_state => {
    return _state
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(handleInitialData())
  }, [])

  const handleNav = deck => {
    navigation.navigate("Deck",
      { deckId: deck.title })
  }

  if (Object.keys(decks).length === 0) {
    return (
      <View>
        <Header title={"Mobile Flashcards"} />
        <View style={styles.container}>
          <Text style={styles.textOnly}>
            You have no decks, please add a deck to get started.
          </Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView>
      <View>
        <Header title={"Welcome to Mobile Flashcards!"} />
        <View style={styles.container}>
          {Object.keys(decks).map(deck => (
            <View key={deck}>
              <DeckItem deck={decks[deck]} toDeck={handleNav} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  },
  textOnly: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 20
  }
})
