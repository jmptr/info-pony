import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
} from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import Text from 'material-ui/Text';
import { connect } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0b'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]})`
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

const YAxisTick = (props) => {
  const {x, y, stroke, payload} = props;
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fontSize={12}
        fontFamily={'Roboto'}
        fill="#666">{bytesToSize(payload.value)}</text>
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
        fontSize={12}
        fontFamily={'Roboto'}
        fill="#666"
        transform="rotate(-15)">{(new Date(payload.value)).toLocaleTimeString()}</text>
    </g>
  );
};

const CustomTooltip = (props) => {
  const {
    active,
  } = props;
  if (active) {
    const {
      payload: payloads,
    } = props;
    return (
      <Text type="body1">
        <p>{`RSS : ${bytesToSize(payloads[0].value)}`}</p>
        <p>{`Heap Total : ${bytesToSize(payloads[1].value)}`}</p>
        <p>{`Heap Used : ${bytesToSize(payloads[2].value)}`}</p>
      </Text>
    )
  }
  return null;
};

export const MemoryChart = ({ chartData }) => {

  return (
    <div>
      <LineChart
        width={750}
        height={300}
        data={chartData}
        margin={{top: 5, right: 30, left: 20, bottom: 15}}>
        <XAxis minTicks={60} tick={XAxisTick} dataKey="captured" />
        <YAxis tick={YAxisTick} type="number" domain={[0, 'dataMax + 100']} />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip content={CustomTooltip} />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" name="RSS" dataKey={'rss'} stroke={'#0D47A1'} />
        <Line type="monotone" name="Heap Total" dataKey={'heapTotal'} stroke={'#E91E63'} />
        <Line type="monotone" name="Heap Used" dataKey={'heapUsed'} stroke={'#03A9F4'} />
      </LineChart>
    </div>
  );
};

export const mapStateToProps = (state) => {
  let {
    memoryStats: chartData,
  } = state;

  return {
    chartData,
  };
};

export default connect(mapStateToProps)(MemoryChart);
