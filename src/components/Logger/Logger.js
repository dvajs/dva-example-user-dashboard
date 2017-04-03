import React from 'react';
import { connect } from 'dva';

function Logger({ logs }) {
  return (
    <div>
      <hr />
      <h2>Logger</h2>
      <ul>
        { logs.map(log => (<li key={log.id}>{log.text}</li>)) }
      </ul>
    </div>
  );
}

Logger.propTypes = {
};

function mapStateToProps(state) {
  const { logs } = state.logger;
  return {
    logs,
  };
}
export default connect(mapStateToProps)(Logger);
