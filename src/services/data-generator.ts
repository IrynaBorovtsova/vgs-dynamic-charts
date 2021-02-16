import { Chart } from '../models';

const CHARTS: Array<Chart> = [
    { name: 'Dataset 1', color: '#009688', values: [10, 100] },
    { name: 'Dataset 2', color: '#2196f3', values: [0, 10] },
    { name: 'Dataset 3', color: '#8a4af3', values: [50, 100] }
]

const API_URL = 'https://qrng.anu.edu.au/API/jsonI.php?type=uint8';

export const DEFAULT_SIZE = 10;
export const CHUNK_SIZE = 1;

export const UPDATE_FREQUENCY = 5 * 1000;

export const getCharts = () => {
    return Promise.resolve(CHARTS);
};

export const fetchChartData = (size = DEFAULT_SIZE) => {
    return fetch(`${API_URL}&length=${size}`).then(resp => resp.json());
}
