import styled from 'styled-components';

const Container = styled.div`
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    padding: 20px;
`

const Flex = styled.div`
    display: flex;
`;

const FlexColumn = styled(Flex)`
    flex-direction: column;
`;

const LegendWrapper = styled(FlexColumn)`
   min-width: 250px;
`;

const LegendItem = styled.label`
    align-items: center;
    display: flex;
    justify-content: center;
    margin-left: 40px;
`;

const ChartWrapper = styled(Flex)`
    flex: 1;
    height: 300px;
`

export const Layout = {
    Container,
    Flex,
    FlexColumn
};

export const Chart = {
    Wrapper: ChartWrapper
}

export const Legend = {
    Wrapper: LegendWrapper,
    Item: LegendItem
}
