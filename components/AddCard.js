import React, { useState } from "react"
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard
} from "react-native"
import { useDispatch } from "react-redux"

import { handleAddCard } from "../actions"
import { headerStyle } from "../utils/helpers"
import { secondaryLight, std, standout, standoutLight } from "../utils/colors"

export function AddCardOptions ({ route }) {
  const { title } = route.params;
  return headerStyle(`Add Card to ${title}`)
}

export default function AddCard ({ route, navigation }) {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [questionInvalid, setQuestionInvalid] = useState(false)
  const [answerInvalid, setAnswerInvalid] = useState(false)

  const onBlur = () => {
    Keyboard.dismiss()
  }

  const dispatch = useDispatch()
  const addCard = () => {
    const { title } = route.params

    if (question.replace(" ", "") === "") {
      setQuestionInvalid(true)
      return
    }

    if (answer.replace(" ", "") === "") {
      setAnswerInvalid(true)
      return
    }

    dispatch(handleAddCard({ question, answer, name: title }))
    Keyboard.dismiss();
    setQuestion("")
    setAnswer("")
    setQuestionInvalid(false)
    setAnswerInvalid(false)
    navigation.goBack()
  }

  return (
    <ScrollView>
      <View>
        <TextInput
          style={[styles.input, questionInvalid
            ? styles.invalid
            : styles.valid]}
          placeholder="Enter question"
          value={question}
          onChangeText={newQuestion => {
            if (newQuestion.replace(" ", "") === "") {
              setQuestion(newQuestion)
              setQuestionInvalid(true)
            }
            else {
              setQuestion(newQuestion)
              setQuestionInvalid(false)

            }
          }}
          onBlur={onBlur}
        ></TextInput>
        <TextInput
          style={[styles.input, answerInvalid
            ? styles.invalid
            : styles.valid]}
          placeholder="Enter answer"
          value={answer}
          onChangeText={newAnswer => {
            if (newAnswer.replace(" ", "") === "") {
              setAnswer(newAnswer)
              setAnswerInvalid(true)
            }
            else {
              setAnswer(newAnswer)
              setAnswerInvalid(false)
            }
          }}
          onBlur={onBlur}
        ></TextInput>
        <TouchableOpacity onPress={addCard} style={styles.btn}>
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
    margin: 25,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5
  },
  btnText: {
    color: std,
    fontSize: 20,
    textAlign: "center"
  },
  invalid: {
    borderBottomColor: "tomato"
  },
  valid: {
    borderBottomColor: secondaryLight
  }
})
