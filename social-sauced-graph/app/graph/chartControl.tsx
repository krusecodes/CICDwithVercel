import { useState } from 'react';

import type { RadioChangeEvent } from 'antd';
import { Input, Space, Radio, Typography, Switch } from 'antd'

const { Search } = Input;
const { Title, Text } = Typography;

// interface IChartControl {
//   onMetricChange: e
// }

interface ChartControlProps {
  onMetricChange: (metric: string) => void;
}

export default function ChartControl({ onMetricChange }: ChartControlProps) {
  const [value, setValue] = useState(1);

  const onBubbleSizeChange = (e: RadioChangeEvent) => {
    onMetricChange(e.target.value);
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const onSwitchChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <>
      <Space direction='vertical' size="middle">
      <Title level={5}>Chart Controls</Title>
        <Search placeholder='Search for contributors' />
        <Text>Highlight you on the chart</Text>
        <Switch onChange={onSwitchChange} />
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Text>Highlight on chart</Text>
            <Radio value={1}>Nothing</Radio>
            <Radio value={2}>Maintainers</Radio>
            <Radio value={3}>Top 5 contributors</Radio>
            <Radio value={4}>Top 5 Most connected</Radio>
            <Radio value={5}>My connections</Radio>
          </Space>
        </Radio.Group>
        <Text>Bubble Size Metric</Text>
        <Radio.Group defaultValue="a" buttonStyle="solid" onChange={onBubbleSizeChange}>
          <Radio.Button value="a">Connections</Radio.Button>
          <Radio.Button value="b">Contributions</Radio.Button>
        </Radio.Group>
      </Space>
    </>
  )
}