import React from 'react';
import { LineChart, Legend, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Chart, ChartDataset } from '../../models';

interface DynamicLineChartProps {
    config: Chart[];
    data: Array<ChartDataset>;
}

const defaultChartOptions = {
    width: '100%',
    height: '100%'
};

const formatDate = (unixTime: number) => new Date(unixTime).toLocaleTimeString();

const DynamicLineChart = (props: DynamicLineChartProps) => {
    const { data, config } = props;

    return (
        <ResponsiveContainer {...defaultChartOptions}>
            <LineChart data={data}>
                <XAxis
                    dataKey="timestamp"
                    domain={['auto', 'auto']}
                    tickFormatter={formatDate}
                    scale="time"
                    type="number" />
                <YAxis />
                <Legend verticalAlign="top" />

                {Object.values(config).map(chart => {
                    const { name, color } = chart;

                    return (
                        <Line
                            key={name}
                            type="monotone"
                            dataKey={name}
                            dot={false}
                            stroke={color}
                            strokeWidth={2}
                        />
                    );
                })}

            </LineChart>
        </ResponsiveContainer>
    );
};

export default DynamicLineChart;
