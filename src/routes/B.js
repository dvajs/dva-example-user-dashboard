import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import Reusable from '../components/Reusable/Reusable';
import Logger from '../components/Logger/Logger';

function B({ dispatch, location }) {
  return (
    <MainLayout location={location}>
      <h1>Component B</h1>
      <div>
        <button onClick={() => { dispatch({ type: 'b/foo' }); }}>add 233</button>
        <Reusable />
        <Logger />
      </div>
    </MainLayout>
  );
}

B.propTypes = {
};

export default connect()(B);
