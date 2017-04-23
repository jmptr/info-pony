import React from 'react';
import { connect } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const CustomizedAxisTick = (props) => {
  const {x, y, stroke, payload} = props;
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)">{payload.value} (ms)</text>
    </g>
  );
}

const CpuChart = ({ tempChart }) => {
  return (
    <div>
      <LineChart
        width={600}
        height={300}
        data={tempChart}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="captured"/>
        <YAxis tick={CustomizedAxisTick} />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="cpu_0_idle" stroke="#8884d8" activeDot={{r: 8}}/>
        <Line type="monotone" dataKey="cpu_1_idle" stroke="#82ca9d" />
        <Line type="monotone" dataKey="cpu_2_idle" stroke="#82ca9d" />
        <Line type="monotone" dataKey="cpu_3_idle" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

const mapStateToProps = (state) => {
  const tempChart = state.cpuStats.map((cpuStat) => {
    const {
      captured,
      stat,
    } = cpuStat;
    return {
      captured,
      cpu_0_idle: stat[0].times.idle,
      cpu_1_idle: stat[1].times.idle,
      cpu_2_idle: stat[2].times.idle,
      cpu_3_idle: stat[3].times.idle,
    };
  });

  return {
    tempChart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CpuChart);
