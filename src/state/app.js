
const initialState = {
  debug: false,
  loading: false,
  step: "0",
}

// ACTIONS

const SET_DEBUG = "SET_DEBUG"
export const setDebug = (debug)  => ({
  type: SET_DEBUG, debug
})

const SET_LOADING = "SET_LOADING"
export const setLoading = (loading) => ({
  type: SET_LOADING, loading
})

const SET_STEP = "SET_STEP"
export const setStep = (step) => ({
  type: SET_STEP, step
})

// REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DEBUG:
      return { ...state, debug: action.debug }
    case SET_LOADING:
      return { ...state, loading: action.loading }
    case SET_STEP:
      return { ...state, step: action.step }
    default:
      return state
  }
}

