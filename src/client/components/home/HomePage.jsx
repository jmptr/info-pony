import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Text from 'material-ui/Text';
import Layout from 'material-ui/Layout';

import PageLayout from '../layout/PageLayout';
import MemoryChart from '../memory-chart/MemoryChart';
import Alerts from '../alerts/Alerts';

const HomePage = ({ chartData, alerts }) => {
  return (
    <PageLayout>
      <Paper>
        <Layout container direction="column" justify="center" align="center">
          <Layout item>
            <Text type="title" colorInherit>Memory Usage</Text>
          </Layout>
          <Layout item>
            <MemoryChart chartData={chartData} />
          </Layout>
          <Layout item>
            <Alerts alerts={alerts} />
          </Layout>
        </Layout>
      </Paper>
    </PageLayout>
  );
};

export const mapStateToProps = (state) => {
  let {
    memoryStats: chartData,
    alerts,
  } = state;

  return {
    chartData,
    alerts,
  };
};

export default connect(mapStateToProps)(HomePage);
