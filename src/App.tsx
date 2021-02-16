import React, { useState, useEffect, useCallback } from 'react';

import { Layout, Checkbox, DynamicLineChart } from './components';
import { Chart, ChartDataset } from './models';
import { getCharts, fetchChartData, DEFAULT_SIZE, CHUNK_SIZE, UPDATE_FREQUENCY } from './services';
import './App.css';

function App() {
    const [chartConfig, setChartConfig] = useState<Chart[]>([]);
    const [data, setData] = useState<ChartDataset[]>([]);
    const [selected, setSelected] = useState<{ [name: string]: boolean }>({});

    useEffect(() => {
        const getChartsConfig = async () => {
            const charts: Chart[] = await getCharts();
            const config = charts.map(({ name }) => ([name, true]));

            setChartConfig(charts);
            setSelected(Object.fromEntries(config));
        };

        getChartsConfig();
    }, []);

    useEffect(() => {
        if (chartConfig.length) {
            updateChart();
        }
    }, [chartConfig]);

    useEffect(() => {
        const intervalId = setInterval(() => updateChart(true), UPDATE_FREQUENCY);

        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, [data]);

    const updateChart = async (chunk = false) => {
        const chartData = await getChartData(chunk);

        setData(chartData);
    };

    const fetchData = useCallback(async (count?: number) => {
        const { data } = await fetchChartData(count);

        return data;
    }, []);

    const composeData = useCallback((count: number, config: Chart[], datasets: ChartDataset[]) => {
        const nextData = new Array(count).fill({}).map((_, index) => {
            return ({
                timestamp: Date.now() + index,
                ...config.reduce((res, { name }, chart) => ({
                    ...res,
                    [name]: selected[name] ? datasets[chart * count + index] : null
                }), {})
            });
        });

        const [_, ...prevData] = data;

        return [...prevData, ...nextData];
    }, [data]);

    const getChartData = async (chunk = false) => {
        const count = chunk ? CHUNK_SIZE : DEFAULT_SIZE;
        const datasets = await fetchData(count * chartConfig.length);

        return composeData(count, chartConfig, datasets || []);
    };

    const toggleChart = useCallback(async (e: any) => {
        const name = e.target.name;
        const isSelected =  e.target.checked;

        setSelected((prevState: any) => ({
            ...prevState,
            [name]: isSelected
        }));

        if (isSelected) {
            const dataset = await fetchData(DEFAULT_SIZE);

            setData(prevData => prevData.map((item, index) => ({
                ...item,
                [name]: dataset[index]
            })));
        } else {
            setData(prevData => prevData.map(item => ({ ...item, [name]: null })));
        }
    }, [data]);

    return (
        <Layout.Container className="App">
            <Layout.Flex>
                <DynamicLineChart config={chartConfig} data={data} />
            </Layout.Flex>

            <Layout.FlexColumn>
                {Object.keys(selected).map((key) => {
                    const isSelected = selected[key];

                    return (
                        <Layout.Legend key={key}>
                            <Checkbox name={key} checked={isSelected} onChange={toggleChart}/>
                            <span>{key}</span>
                        </Layout.Legend>
                    );
                })}
            </Layout.FlexColumn>
        </Layout.Container>
    );
}

export default App;
