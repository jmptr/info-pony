import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Text from 'material-ui/Text';

import PageLayout from '../layout/PageLayout';
import CpuChart from './cpu-chart/CpuChart';

const HomePage = ({ chartData }) => {
  return (
    <PageLayout>
      <Paper>
        <Text type="title" colorInherit>Hi there</Text>
        <CpuChart />
      </Paper>
    </PageLayout>
  );
};

export default HomePage;
