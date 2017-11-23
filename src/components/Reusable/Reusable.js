import React from 'react';
import { connect } from 'dva';

function Reusable({ messages }) {
  return (
    <div>
      <hr />
      <h2>Messages</h2>
      <ul>
        { messages.map(message => (<li key={message.id}>{message.text}</li>)) }
      </ul>
    </div>
  );
}

Reusable.propTypes = {
};

function mapStateToProps(state) {
  const { messages } = state.reusable;
  return {
    messages,
  };
}
export default connect(mapStateToProps)(Reusable);
