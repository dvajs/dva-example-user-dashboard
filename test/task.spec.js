import expect from 'expect';
import { effects } from 'dva/saga';

import { delay } from '../src/services/delay';
import { makeService } from '../src/services/makeService';

import task from '../src/models/task';

describe('Task Model', () => {
  it('loads', () => {
    expect(task).toExist();
  });

  describe('effects', () => {
    it('sequential should work', () => {
      const { call, put } = effects;

      const sagas = task.effects;
      const saga = sagas.sequential;
      const generator = saga({ type: 'task/sequential' }, { call, put });

      let next = generator.next();
      expect(next.value).toEqual(call(delay, 3000));

      next = generator.next();
      expect(next.value).toEqual(put({ type: 'logger/addLog', payload: 'step1' }));

      next = generator.next();
      expect(next.value).toEqual(call(delay, 5000));

      next = generator.next();
      expect(next.value).toEqual(put({ type: 'logger/addLog', payload: 'step2' }));
    });

    it('parallel should work', () => {
      const { call, put } = effects;

      const sagas = task.effects;
      const saga = sagas.parallel;
      const generator = saga({ type: 'task/parallel' }, { call, put });

      let next = generator.next();
      expect(next.value).toEqual(put({ type: 'logger/addLog', payload: 'all started' }));

      next = generator.next();
      expect(next.value).toEqual([
        call(makeService(3000), 'service 1'),
        call(makeService(5000), 'service 2'),
        call(makeService(7000), 'service 3'),
      ]);

      next = generator.next();
      expect(next.value).toEqual(put({ type: 'logger/addLog', payload: 'all completed' }));
    });

    it('race shold work', () => {
      const { call, put, race } = effects;

      const sagas = task.effects;
      const saga = sagas.race;
      const generator = saga({ type: 'task/race' }, { call, put, race });

      let next = generator.next();
      expect(next.value).toEqual(put({ type: 'logger/addLog', payload: 'start race' }));

      next = generator.next();
      expect(next.value).toEqual(race({
        data: call(makeService(2000), 'some data'),
        timeout: call(delay, 3000),
      }));

      // 因为在单元测试里，跑不了被测逻辑的那个if
      // 那个if是依赖于实际执行逻辑的，但saga的单元测试只是测action的序列化结果是否一致，并不跑真实逻辑
      // 所以要手动注入一个结果进去
      const data = 'some data';
      next = generator.next({ data });
      expect(next.value).toEqual(put({ type: 'logger/addLog', payload: data }));
    });
  });
});
