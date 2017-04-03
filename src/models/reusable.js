import { delay } from '../services/delay';

export default {
  namespace: 'reusable',
  state: {
    messages: [],
  },
  reducers: {
    addMessageSuccess(state, { payload }) {
      const message = {
        id: state.messages.length,
        text: payload.data,
      };

      const messages = state.messages.concat([message]);
      return {
        messages,
      };
    },
  },
  effects: {
    *addMessage(action, { call, put }) {
      const { payload } = action;
      const { resolve } = payload;
      yield call(delay, 1000);

      if (resolve) {
        resolve(payload.data);
      }

      yield put({ type: 'addMessageSuccess', payload });
    },
  },
};
