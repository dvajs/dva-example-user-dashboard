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
        text: payload,
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
        resolve(payload);
      }

      yield put({ type: 'addMessageSuccess', payload });
    },
  },
};
