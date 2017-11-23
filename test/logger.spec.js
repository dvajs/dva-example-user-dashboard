import expect from 'expect';
import logger from '../src/models/logger';

describe('Logger Model', () => {
  it('loads', () => {
    expect(logger).toExist();
  });

  describe('reducers', () => {
    it('addLog should work', () => {
      const reducers = logger.reducers;
      const reducer = reducers.addLog;
      const state = {
        logs: [],
      };
      expect(reducer(state, { payload: 'log' })).toEqual({ logs: [{ id: 0, text: 'log' }] });
    });
  });
});
