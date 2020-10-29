import React, { useState } from "react"
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet
} from "react-native"
import { useDispatch } from "react-redux"

import { handleAddDeck } from "../actions"
import Header from "../components/Header"
import { secondaryLight, std, standout, standoutLight } from "../utils/colors"

export default function AddDeck ({ navigation }) {
  const [title, setTitle] = useState("")
  const [invalid, setInvalid] = useState(false)

  const handleChange = (_title) => {
    if (_title !== "") {
      setInvalid(false)
    }
    setTitle(_title)
  }

  const onBlur = () => {
    Keyboard.dismiss();
  }

  const dispatch = useDispatch()
  const addDeck = () => {

    if (title.replace(" ", "") === "") {
      setInvalid(true)
      return
    }

    dispatch(handleAddDeck(title))
    Keyboard.dismiss();
    setTitle("")
    setInvalid(false)
    toHome()
  }

  const toHome = () => {
    navigation.goBack()
  }

  return (
    <ScrollView>
      <View>
        <Header title="Add Deck"></Header>
        <TextInput
          style={[styles.input, invalid ? styles.invalid : styles.valid]}
          placeholder="Enter deck title"
          value={title}
          onChangeText={handleChange}
          onBlur={() => Keyboard.dismiss}
        ></TextInput>
        <TouchableOpacity onPress={addDeck} style={styles.btn}>
          <Text style={styles.btnText}>Add Deck</Text>
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
