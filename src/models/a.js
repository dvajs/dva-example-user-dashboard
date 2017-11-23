import { delay } from '../services/delay';

export default {
  namespace: 'a',
  state: '',
  reducers: {
  },
  effects: {
    *foo(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'reusable/addMessage', payload: '666' });
    },
  },
};

