export default {
  namespace: 'logger',
  state: {
    logs: [],
  },
  reducers: {
    addLog(state, { payload }) {
      const log = {
        id: state.logs.length,
        text: payload,
      };

      const logs = state.logs.concat([log]);
      return {
        logs,
      };
    },
  },
  effects: {
  },
};
