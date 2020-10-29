import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useSelector, useDispatch } from "react-redux"

import { headerStyle } from "../utils/helpers"
import { handleRemoveDeck } from "../actions"
import {
  primary,
  secondary,
  secondaryLight,
  std,
  standout,
  standoutLight
} from "../utils/colors"

export function DeckOptions ({ route }) {
  const title = route.params.deckId
  return headerStyle(title)
}

export default function Deck ({ route, navigation }) {
  const deck = useSelector(_decks => {
    return _decks[route.params.deckId]
  })

  const dispatch = useDispatch()
  const handleDeleteDeck = () => {
    const { title } = deck;
    navigation.navigate("Decks")
    dispatch(handleRemoveDeck(title))
  }

  if (deck) {
    const { title, questions } = deck
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text style={styles.cardTitle}>
          {questions.length > 1 || questions.length < 1
            ? `${questions.length} Cards`
            : `${questions.length} Card`}
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("AddCard", { title })}
        >
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>

        {questions.length > 0 && (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Quiz", { title })}
          >
            <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.btnLink} onPress={handleDeleteDeck}>
          <Text style={styles.btnLinkText}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
  else {
    return <View><Text>Deck {route.params.deckId} not found</Text></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  deckTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: primary,
    marginBottom: 10,
    marginTop: 25
  },
  cardTitle: {
    fontSize: 15,
    color: secondary
  },
  input: {
    borderColor: secondaryLight,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  btn: {
    borderWidth: 1,
    borderColor: standoutLight,
    backgroundColor: standout,
    padding: 15,
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5
  },
  btnText: {
    color: std,
    fontSize: 20,
    textAlign: "center"
  },
  btnLink: {
    padding: 15,
    marginTop: 25,
    textAlign: "center"
  },
  btnLinkText: {
    color: standout
  }
})
