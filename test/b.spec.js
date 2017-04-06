import expect from 'expect';
import { effects } from 'dva/saga';
import { delay } from '../src/services/delay';
import b from '../src/models/b';

describe('B Model', () => {
  it('loads', () => {
    expect(b).toExist();
  });

  describe('effects', () => {
    it('foo should work', () => {
      const { call, put } = effects;

      const sagas = b.effects;
      const saga = sagas.foo;
      const generator = saga({ type: 'b/foo' }, { call, put });

      let next = generator.next();
      expect(next.value).toEqual(call(delay, 3000));

      next = generator.next();
      expect(next.value).toEqual(put({ type: 'reusable/addMessage', payload: '233' }));
    });
  });
});
