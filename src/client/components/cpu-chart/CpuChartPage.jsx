import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Text from 'material-ui/Text';

import PageLayout from '../layout/PageLayout';
import CpuChart from './CpuChart';

const CpuChartPage = ({ chartData }) => {
  return (
    <PageLayout>
      <Paper>
        <Text type="title" colorInherit>CPU Idle Time</Text>
        <CpuChart />
      </Paper>
    </PageLayout>
  );
};

export default CpuChartPage;
