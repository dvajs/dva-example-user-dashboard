import { delay } from '../services/delay';

export default {
  namespace: 'b',
  state: '',
  reducers: {
  },
  effects: {
    addWatcher: [function *watcher({ take, put }) {
      /* eslint-disable */
      while (true) {
        /* eslint-enable */
        // watch foo action from model a
        const data1 = yield take('a/foo');
        yield put({ type: 'reusable/addMessage', payload: `observe an action from model A: ${data1}` });

        // watch addLogSuccess action from model reuseable
        const data2 = yield take('reusable/addMessageSuccess');
        yield put({ type: 'reusable/addMessage', payload: `observe an action from model reusable: ${data2}` });
      }
    }, { type: 'watcher' }],

    *foo(action, { call, put }) {
      yield call(delay, 3000);
      yield put({ type: 'reusable/addMessage', payload: '233' });
    },
  },
};
