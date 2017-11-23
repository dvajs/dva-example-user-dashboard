import { delay } from '../services/delay';
import { makeService } from '../services/makeService';

export default {
  namespace: 'task',
  state: {
  },
  reducers: {
  },
  effects: {
    *sequential(action, { call, put }) {
      yield call(delay, 3000);
      yield put({ type: 'logger/addLog', payload: 'step1' });
      yield call(delay, 5000);
      yield put({ type: 'logger/addLog', payload: 'step2' });
    },
    *parallel(action, { call, put }) {
      yield put({ type: 'logger/addLog', payload: 'all started' });

      // 注意这里不要写yield*，不然会顺序执行的
      yield [
        call(makeService(3000), 'service 1'),
        call(makeService(5000), 'service 2'),
        call(makeService(7000), 'service 3'),
      ];

      yield put({ type: 'logger/addLog', payload: 'all completed' });
    },
    *race(action, { call, put, race }) {
      yield put({ type: 'logger/addLog', payload: 'start race' });

      const { data, timeout } = yield race({
        data: call(makeService(2000), 'some data'),
        timeout: call(delay, 3000),
      });

      if (data) {
        yield put({ type: 'logger/addLog', payload: data });
      } else {
        yield put({ type: 'logger/addLog', payload: `timeout: ${timeout}` });
      }
    },
  },
};
