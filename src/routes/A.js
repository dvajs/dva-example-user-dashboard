import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import Reusable from '../components/Reusable/Reusable';
import Logger from '../components/Logger/Logger';

function A({ dispatch, location }) {
  const bar = () => {
    new Promise((resolve, reject) => {
      dispatch({ type: 'reusable/addLog', payload: { data: 9527, resolve, reject } });
    })
    .then(() => {
      // console.log(`after a long time, ${data} returns`);
    });
  };

  return (
    <MainLayout location={location}>
      <h1>Component A</h1>
      <div>
        <button onClick={() => { dispatch({ type: 'a/foo' }); }}>add 666</button>
        <button onClick={bar}>do a lot of things</button>
        <Reusable />
        <Logger />
      </div>
    </MainLayout>
  );
}

A.propTypes = {
};

export default connect()(A);
