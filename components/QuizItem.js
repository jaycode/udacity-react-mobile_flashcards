import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useSelector } from "react-redux"

import {
  primary,
  secondary,
  secondaryLight,
  std,
  standout,
  standoutLight
} from "../utils/colors"

export default function Quiz (props) {
  state = {
    displayAnswer: false
  }

  const [displayAnswer, setDisplayAnswerState] = useState(false)

  const questionCount = useSelector(_decks => {
    return _decks[props.deck].questions.length
  })

  const setDisplayAnswer = () => {
    const dA = !displayAnswer
    setDisplayAnswerState(dA)
  }

  const correct = () => {
    const { question } = props;
    props.onAnswer(true, question.question);
  }

  const incorrect = () => {
    const { question } = props;
    props.onAnswer(false, question.question);
  }

  const { question, index, current } = props;
  const i = index + 1;

  if (i === current) {
    return (
      <View style={styles.container}>
        <View style={styles.progressIndicator}>
          <Text style={styles.progressIndicatorText}>
            {i}/{questionCount}
          </Text>
        </View>
        {!displayAnswer && <Text style={styles.deckTitle}>{question.question}</Text>}
        {displayAnswer && <Text style={styles.deckTitle}>{question.answer}</Text>}
        <TouchableOpacity onPress={setDisplayAnswer} style={styles.btnLink}>
          {!displayAnswer && <Text style={styles.btnLinkText}>View Answer</Text>}
          {displayAnswer && <Text style={styles.btnLinkText}>View Question</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={correct} style={styles.btn}>
          <Text style={styles.btnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnAlt} onPress={incorrect}>
          <Text style={styles.btnText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    )
  }
  else {
    return <View />
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
  btnAlt: {
    borderWidth: 1,
    borderColor: secondaryLight,
    backgroundColor: secondary,
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
  },
  progressIndicator: {
    borderRadius: 10,
    backgroundColor: standout,
    margin: 15,
    padding: 5
  },
  progressIndicatorText: {
    color: std,
    fontWeight: "bold"
  }
})
