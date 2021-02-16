export interface Chart {
    name: string;
    color: string;
    values: [number, number];
}

export interface ChartDataset {
    timestamp: number;
    [key: string]: number;
}
