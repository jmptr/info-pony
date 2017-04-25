import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Text from 'material-ui/Text';
import Layout from 'material-ui/Layout';

import PageLayout from '../layout/PageLayout';
import MemoryChart from '../memory-chart/MemoryChart';

const HomePage = ({ chartData }) => {
  return (
    <PageLayout>
      <Paper>
        <Layout container direction="column" justify="center" align="center">
          <Layout item>
            <Text type="title" colorInherit>Memory Usage</Text>
          </Layout>
          <Layout item>
            <MemoryChart />
          </Layout>
        </Layout>
      </Paper>
    </PageLayout>
  );
};

export default HomePage;
