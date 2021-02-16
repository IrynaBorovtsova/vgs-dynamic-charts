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

const Legend = styled.label`
    align-items: center;
    display: flex;
    justify-content: center;
`;

const Chart = styled.div`
    min-width: 400px;
`;

export const Layout = {
    Container,
    Flex,
    FlexColumn,
    Legend
};
