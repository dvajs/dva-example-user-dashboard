import { delay } from '../services/delay';

export default {
  namespace: 'a',
  state: '',
  reducers: {
    fetchSuccess(state, { payload }) {
      return state + payload;
    },
  },
  effects: {
    *foo(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'reusable/addMessage', payload: { data: '666' } });
    },
  },
};

