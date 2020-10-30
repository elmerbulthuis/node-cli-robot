const { createStore, applyMiddleware } = require('redux');

function nextChar(c) {
  return c === 'Z' ? 'A' : String.fromCharCode(c.charCodeAt(0) + 1);
}

function todos(state, action) {
  switch (action.type) {
    case 'SWITCH_ON':
      return { isOn: true, currentLetter: 'A' }
    case 'SWITCH_OFF':
      return { ...state, isOn: false }
    case 'NEXT_LETTER':
      return { ...state, currentLetter: nextChar(state.currentLetter)}
    default:
      return state
  }
}

const logger = store => next => action => {
  console.log('dispatching', action)
  if (isOnSelector() || action.type === 'SWITCH_ON' || action.type === 'SWITCH_OFF') {
    return next(action)
  } else {
    throw new Error('Oh my gosh! I am off now! I can\'t answer :( ');
  }
}

const initialState = {
  isOn: false,
  currentLetter: 'A'
};

const reduxStore = createStore(
  todos,
  initialState,
  applyMiddleware(logger)
);

const isOnSelector = () => {
  const { isOn } = reduxStore.getState();
  return isOn;
}

const currentLetterSelector = () => {
  const { currentLetter } = reduxStore.getState();
  return currentLetter;
}

module.exports = { 
  store: reduxStore,
  selectIsRobotOn: isOnSelector,
  selectCurrentLetter: currentLetterSelector
};
