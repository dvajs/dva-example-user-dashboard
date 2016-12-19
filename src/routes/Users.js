import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';

function Users(props) {
  return (
    <div className={styles.normal}>
      Route Component: 'Users'
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Users);
