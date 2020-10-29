import { AsyncStorage } from "react-native";

export const MF_STORAGE_KEY = "MobileFlashcards:decks";

function setStore() {
  let decks = {};
  AsyncStorage.setItem(MF_STORAGE_KEY, JSON.stringify(decks));
  return decks;
}

function getStore(results) {
  return results === null ? setStore() : results;
}

export function addCard({ question, answer, name }) {
  return AsyncStorage.getItem(MF_STORAGE_KEY).then(results => {
    let decks = { ...JSON.parse(results) };
    decks = {
      ...decks,
      [name]: {
        ...decks[name],
        questions: decks[name].questions.concat([{ question, answer }])
      }
    };
    AsyncStorage.mergeItem(MF_STORAGE_KEY, JSON.stringify(decks));
  });
}


export function getDecks() {
  return AsyncStorage.getItem(MF_STORAGE_KEY).then(getStore);
}

export function getDeckByTitle(title) {
  return AsyncStorage.getItem(MF_STORAGE_KEY).then(results => results[title]);
}

export function saveDeck(title) {
  return AsyncStorage.mergeItem(
    MF_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: []
      }
    })
  );
}

export function deleteDeck(title) {
  return AsyncStorage.getItem(MF_STORAGE_KEY).then(res => {
    const data = JSON.parse(res);
    data[title] = undefined;
    delete data[title];
    AsyncStorage.setItem(MF_STORAGE_KEY, JSON.stringify(data));
  });
}
