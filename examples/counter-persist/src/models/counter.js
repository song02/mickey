import { REHYDRATE } from 'redux-persist/constants'

const delay = timeout => new Promise((resolve) => {
  setTimeout(resolve, timeout)
})

export default {
  namespace: 'counter',
  state: {
    count: 0,
    loading: false,
  },
  enhancers: [
    reducer => (state, action) => {
      const { type, payload } = action
      if (type === REHYDRATE) {
        return {
          ...state,
          ...payload.counter,
        }
      }
      return reducer(state, action)
    },
  ],
  increment: state => ({ ...state, count: state.count + 1 }),
  decrement: state => ({ ...state, count: state.count - 1 }),
  incrementAsync: {
    * effect(payload, { call }, { succeed }) {
      yield call(delay, 2000)
      yield succeed()
    },
    prepare: state => ({ ...state, loading: true }),
    succeed: state => ({ ...state, count: state.count + 1, loading: false }),
  },
}
