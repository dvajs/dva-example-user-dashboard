import expect from 'expect';
import { effects } from 'dva/saga';

import * as usersService from '../src/services/users';

import user, { pageSelector } from '../src/models/users';

describe('User Model', () => {
  it('loads', () => {
    expect(user).toExist();
  });

  describe('reducers', () => {
    it('save should work', () => {
      const reducers = user.reducers;
      const reducer = reducers.save;
      const state = {
        list: [],
        total: null,
        page: null,
      };

      const action = {
        type: 'save',
        payload: {
          data: [{ id: '01' }, { id: '02' }],
          total: 111,
          page: 1,
        },
      };

      expect(reducer(state, action)).toEqual({
        list: [{ id: '01' }, { id: '02' }],
        total: 111,
        page: 1,
      });
    });
  });

  describe('effects', () => {
    it('fetch should work', () => {
      const { call, put } = effects;

      const sagas = user.effects;
      const saga = sagas.fetch;

      const generator = saga({ type: 'fetch', payload: { page: 1 } }, { call, put });

      let next = generator.next();
      const page = 1;
      expect(next.value).toEqual(call(usersService.fetch, { page }));

      next = generator.next({ data: [],
        headers: {
          'x-total-count': '111',
        },
      });

      expect(next.value).toEqual(put({
        type: 'save',
        payload: {
          data: [],
          total: 111,
          page: 1,
        },
      }));
    });

    it('remove should work', () => {
      const { call, put } = effects;

      const sagas = user.effects;
      const saga = sagas.remove;

      const id = 'id111';

      const generator = saga({ type: 'remove', payload: id }, { call, put });

      let next = generator.next();
      expect(next.value).toEqual(call(usersService.remove, id));

      next = generator.next();
      expect(next.value).toEqual(put({ type: 'reload' }));
    });

    it('patch should work', () => {
      const { call, put } = effects;

      const sagas = user.effects;
      const saga = sagas.patch;

      const id = 'id111';
      const values = [];

      const generator = saga({ type: 'patch', payload: { id, values } }, { call, put });

      let next = generator.next();
      expect(next.value).toEqual(call(usersService.patch, id, values));

      next = generator.next();
      expect(next.value).toEqual(put({ type: 'reload' }));
    });

    it('create should work', () => {
      const { call, put } = effects;

      const sagas = user.effects;
      const saga = sagas.create;

      const values = [];

      const generator = saga({ type: 'create', payload: values }, { call, put });

      let next = generator.next();
      expect(next.value).toEqual(call(usersService.create, values));

      next = generator.next();
      expect(next.value).toEqual(put({ type: 'reload' }));
    });

    it('reload should work', () => {
      const { select, put } = effects;

      const sagas = user.effects;
      const saga = sagas.reload;

      const generator = saga({ type: 'reload' }, { select, put });

      const fakeState = {
        users: {
          page: 1,
        },
      };
      let next = generator.next(fakeState);
      // 下面这句的select，源码和测试两边需要是同一个selector函数才可以……
      // 然而，如果源model里面不把这个selector命名并且export出来，这里肯定过不了
      expect(next.value).toEqual(select(pageSelector));

      next = generator.next(2);
      expect(next.value).toEqual(put({ type: 'fetch', payload: { page: 2 } }));
    });
  });
});
