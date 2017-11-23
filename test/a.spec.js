import expect from 'expect';
import { effects } from 'dva/saga';
import { delay } from '../src/services/delay';
import a from '../src/models/a';

describe('A Model', () => {
  it('loads', () => {
    expect(a).toExist();
  });

  describe('effects', () => {
    it('foo should work', () => {
      const { call, put } = effects;

      const sagas = a.effects;
      const saga = sagas.foo;
      const generator = saga({ type: 'a/foo' }, { call, put });

      let next = generator.next();
      expect(next.value).toEqual(call(delay, 1000));

      next = generator.next();
      expect(next.value).toEqual(put({ type: 'reusable/addMessage', payload: '666' }));
    });
  });
});
