export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const RECEIVE_DECK = "RECEIVE_DECK"
export const ADD_DECK = "ADD_DECK"
export const REMOVE_DECK = "REMOVE_DECK"
export const ADD_CARD = "ADD_CARD"
export const REMOVE_CARD = "REMOVE_CARD"

import {
  getDecks as _getDecks,
  saveDeck as _saveDeck,
  getDeckByTitle as _getDeckByTitle,
  deleteDeck as _deleteDeck,
  addCard as _addCard } from "../utils/api"

// Actions
// --------
export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function receiveDeck(deck) {
  return {
    type: RECEIVE_DECK,
    deck
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  };
}
export function removeDeck(title) {
  return {
    type: REMOVE_DECK,
    title
  };
}

export function addCard(card) {
  return {
    type: ADD_CARD,
    card
  };
}

export function removeCard(deckQuestion) {
  return {
    type: REMOVE_CARD,
    deckQuestion
  };
}

// Handlers
// ---------

export function handleInitialData() {
  return dispatch => {
    return _getDecks()
      .then(data => {
        dispatch(receiveDecks(JSON.parse(data)));
      })
      .catch(e => {
        console.error(e);
      });
  };
}

export function handleAddDeck(title) {
  return dispatch => {
    return _saveDeck(title)
      .then(() => {
        dispatch(addDeck(title));
      })
      .catch(e => {
        console.error(e);
      });
  };
}

export function handleReceiveDeck(title) {
  return dispatch => {
    return _getDeckByTitle(title)
      .then(data => {
        dispatch(receiveDeck(JSON.parse(data)));
      })
      .catch(e => console.error(e));
  };
}

export function handleRemoveDeck(title) {
  return dispatch => {
    return _deleteDeck(title)
      .then(() => {
        dispatch(removeDeck(title));
      })
      .catch(e => console.error(e));
  };
}

export function handleAddCard(card) {
  return dispatch => {
    return _addCard(card)
      .then(() => {
        dispatch(addCard(card));
      })
      .catch(e => console.error(e));
  };
}
