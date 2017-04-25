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

const YAxisTick = (props) => {
  const {x, y, stroke, payload} = props;
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)">{Math.floor(payload.value / 1000 / 60)} (m)</text>
    </g>
  );
}

const XAxisTick = (props) => {
  const {x, y, payload} = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666">{(new Date(payload.value)).toLocaleTimeString()}</text>
    </g>
  );
}

const CpuChart = ({ chartData, lineSettings }) => {
  const lines = lineSettings.map((item, idx) => <Line key={item.key} type="monotone" dataKey={item.key} stroke={item.color} />);

  return (
    <LineChart
      width={750}
      height={300}
      data={chartData}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis tick={XAxisTick} dataKey="captured" domain={['dataMin', 'dataMax']} />
      <YAxis tick={YAxisTick} />
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      {lines}
    </LineChart>
  );
};

const mapStateToProps = (state) => {
  const cpuCount = state.cpuStats[0] && state.cpuStats[0].stat.length;
  let lineSettings = [];

  if (cpuCount) {
    lineSettings = [...Array(cpuCount)].map((item, idx) => ({
      key: `cpu_${idx}_idle`,
      color: "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}),
    }));
  }
  const chartData = state.cpuStats.map((cpuStat) => {
    const {
      captured,
      stat,
    } = cpuStat;

    // since stat is an array of { times: { user, idle, ...etc }}
    // reduce it to a literal with the key of each CPUs
    const keyedStats = stat.reduce((accum, item, idx) => {
      const key = `cpu_${idx}_idle`
      accum[key] = item.times.idle;
      return accum;
    }, {});
    return Object.assign(keyedStats, { captured });
  });

  return {
    chartData,
    lineSettings,
  };
};

export default connect(mapStateToProps)(CpuChart);