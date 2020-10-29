import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useSelector } from "react-redux"

import { headerStyle } from "../utils/helpers"
import QuizItem from "../components/QuizItem"
import { setLocalNotification, clearLocalNotification } from "../utils/notifications"

import {
  primary,
  secondary,
  secondaryLight,
  std,
  standout,
  standoutLight
} from "../utils/colors"

export function QuizOptions ({ route }) {
  const { title } = route.params
  return headerStyle(`${title} Quiz`)
}

export default function Quiz ({ route, navigation }) {
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(0)
  const [correct, setCorrect] = useState([])
  const [incorrect, setIncorrect] = useState([])
  const deck = useSelector(_decks => {
    return _decks[route.params.title]
  })

  useEffect(() => {
    setCount(deck.questions.length)
  }, [])

  const correctAnswer = question => {
    setCurrent(current + 1)
    setCorrect(correct.concat([question]))
  }

  const incorrectAnswer = question => {
    setCurrent(current + 1)
    setIncorrect(incorrect.concat([question]))
  }

  const handleAnswer = (answer, question) => {
    if (answer === true) {
      correctAnswer(question.question)
    } else {
      incorrectAnswer(question.question)
    }
  }

  const restartQuiz = () => {
    setCurrent(1)
    setCount(0)
    setCorrect([])
    setIncorrect([])
    clearLocalNotification().then(setLocalNotification);
  }

  const toDeck = () => {
    restartQuiz();
    navigation.goBack();
  }

  const { questions } = deck;
  return (
    <View style={styles.container}>
      {questions.map((question, index) => (
        <QuizItem
          key={question.question}
          deck={deck.title}
          question={question}
          index={index}
          current={current}
          onAnswer={handleAnswer}
        />
      ))}
      {current > questions.length && (
        <View>
          <Text style={styles.deckTitle}>Quiz Complete</Text>
          <Text style={styles.cardTitle}>
            You got {correct.length} out of {questions.length} correct. (
            {Math.floor((correct.length / questions.length) * 100)}%)
          </Text>
          <TouchableOpacity style={styles.btn} onPress={restartQuiz}>
            <Text style={styles.btnText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLink} onPress={toDeck}>
            <Text style={styles.btnLinkText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  deckTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: primary,
    marginBottom: 10,
    marginTop: 25,
    textAlign: "center"
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
    marginTop: 25
  },
  btnLinkText: {
    textAlign: "center",
    color: standout
  }
})
