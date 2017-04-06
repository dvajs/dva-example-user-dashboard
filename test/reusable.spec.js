import expect from 'expect';
import { effects } from 'dva/saga';
import { delay } from '../src/services/delay';
import reusable from '../src/models/reusable';

describe('Reusable Model', () => {
  it('loads', () => {
    expect(reusable).toExist();
  });

  describe('reducers', () => {
    it('addMessageSuccess should work', () => {
      const reducers = reusable.reducers;
      const reducer = reducers.addMessageSuccess;
      const state = {
        messages: [],
      };
      expect(reducer(state, { payload: 'message' })).toEqual({ messages: [{ id: 0, text: 'message' }] });
    });
  });

  describe('effects', () => {
    it('addMessage should work', () => {
      const { call, put } = effects;

      const sagas = reusable.effects;
      const saga = sagas.addMessage;
      const generator = saga({ type: 'reusable/addMessage', payload: '666' }, { call, put });

      let next = generator.next();
      expect(next.value).toEqual(call(delay, 1000));

      next = generator.next();
      expect(next.value).toEqual(put({ type: 'addMessageSuccess', payload: '666' }));
    });
  });
});
