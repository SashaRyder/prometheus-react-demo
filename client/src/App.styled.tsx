import styled from 'styled-components';

const bgLight = '#f56218';
const bgDark = '#383230';

export const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  width: 100vw;
  height: 100vh;
`;

const AppSideBase = styled.div<{ hasError: boolean }>`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  padding: 24px;
  box-sizing: border-box;
  flex-direction: ${(props): string => (props.hasError ? 'column' : 'row')};
`;

export const AppLeft = styled(AppSideBase)`
  background-color: ${bgLight};
`;

export const AppRight = styled(AppSideBase)`
  background-color: ${bgDark};
`;

export const AppLeftText = styled.h1`
  color: ${bgDark};
`;

export const AppRightMessage = styled.h1`
  color: ${bgLight};
`;

export const AppRightText = styled.pre`
  color: ${bgLight};
  width: 100%;
  height: 100%;
`;
