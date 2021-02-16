import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import moment from 'moment';

import { Chart, ChartDataset } from '../../models';

interface DynamicLineChartProps {
    config: Chart[];
    data: Array<ChartDataset>;
}

const defaultChartOptions = {
    width: 500,
    height: 300,
    margin: {
        top: 5,
        right: 50,
        left: 20,
        bottom: 5
    }
};

const formatDate = (unixTime?: number) => unixTime ? moment(unixTime).format('HH:mm:ss') : '';

const DynamicLineChart = (props: DynamicLineChartProps) => {
    const { data, config } = props;

    return (
        <LineChart
            {...defaultChartOptions}
            data={data}
        >
            <XAxis
                dataKey="timestamp"
                domain={['auto', 'auto']}
                tickFormatter={formatDate}
                scale="time"
                type="number" />
            <YAxis />

            {Object.values(config).map(chart => {
                const { name, color } = chart;

                return (
                    <Line key={name} type="monotone" dataKey={name} stroke={color} />
                );
            })}

        </LineChart>
    );
};

export default DynamicLineChart;
