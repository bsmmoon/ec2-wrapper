
const initialState = {
  debug: false,
}

// ACTIONS

const SET_DEBUG = "SET_DEBUG"
export const setDebug = (debug)  => ({
  type: SET_DEBUG, debug
})

// REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DEBUG:
      return { ...state, debug: action.debug }
    default:
      return state
  }
}

