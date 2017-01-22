import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import './index.html';
import './index.css';

// 1. Initialize
const app = dva({
  history: browserHistory,
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// Moved to router.js

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
