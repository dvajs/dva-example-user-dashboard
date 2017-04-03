import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import Logger from '../components/Logger/Logger';

function Tasks({ dispatch, location }) {
  return (
    <MainLayout location={location}>
      <div>
        <button onClick={() => { dispatch({ type: 'task/sequential' }); }}>Sequential</button>
        <button onClick={() => { dispatch({ type: 'task/parallel' }); }}>Parallel</button>
        <button onClick={() => { dispatch({ type: 'task/race' }); }}>Race</button>
      </div>
      <Logger />
    </MainLayout>
  );
}

Tasks.propTypes = {
};

export default connect()(Tasks);
