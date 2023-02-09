import React, { useEffect, useState } from 'react';
import { AppContainer, AppLeft, AppLeftText, AppRight, AppRightText, AppRightMessage } from './App.styled';
import { getServerMetrics, getServerTime } from './network';
import { ServerResponse } from './network/serverResponse';

interface ResponseState<T> extends ServerResponse<T> {
  loading: boolean;
}

const App = (): JSX.Element => {
  const [serverTime, setServerTime] = useState<ResponseState<number>>({ loading: true, result: true, response: 0 });
  const [serverMetrics, setServerMetrics] = useState<ResponseState<string>>({
    loading: true,
    result: true,
    response: '',
  });
  const [timeDifference, setTimeDifference] = useState<string>();

  useEffect(() => {
    const handleServerTimeRetrieval = async (): Promise<void> => {
      setServerTime((value) => ({ ...value, loading: true }));
      const serverTimeResponse = await getServerTime();
      setServerTime({ loading: false, ...serverTimeResponse });
    };

    const handleServerMetricsRetrieval = async (): Promise<void> => {
      setServerMetrics((value) => ({ ...value, loading: true }));
      const serverMetricsResponse = await getServerMetrics();
      setServerMetrics({ loading: false, ...serverMetricsResponse });
    };

    handleServerTimeRetrieval();
    handleServerMetricsRetrieval();

    const serverTimeInterval = setInterval(handleServerTimeRetrieval, 30000);
    const serverMetricsInterval = setInterval(handleServerMetricsRetrieval, 30000);

    return () => {
      clearInterval(serverTimeInterval);
      clearInterval(serverMetricsInterval);
    };
  }, []);

  useEffect(() => {
    const calculateTimeDifference = (): void => {
      const nowTimeSeconds = Math.round(new Date().getTime() / 1000);
      if (serverTime.loading) {
        return;
      }
      const timeDiff = new Date((nowTimeSeconds - serverTime.response) * 1000).toTimeString().split(' ')[0];
      const timeDiffArr = timeDiff.split(':');
      setTimeDifference(`${(+timeDiffArr[0] - 1).toString().padStart(2, '0')}:${timeDiffArr[1]}:${timeDiffArr[2]}`);
    };
    calculateTimeDifference();
    const timeDiffInterval = setInterval(calculateTimeDifference, 1000);
    return () => {
      clearInterval(timeDiffInterval);
    };
  }, [serverTime]);

  return (
    <AppContainer>
      <AppLeft hasError={!serverTime.result}>
        {!serverTime.loading && serverTime.result && (
          <>
            <AppLeftText>Server Epoch Time: {serverTime.response}</AppLeftText>
            <AppLeftText>Server/Client Time Difference: {timeDifference}</AppLeftText>
          </>
        )}
        {serverTime.loading && <AppLeftText>Loading latest epoch from server!</AppLeftText>}
        {!serverTime.result && !serverTime.loading && (
          <>
            <AppLeftText>An unexpected error occurred:</AppLeftText>
            <AppLeftText>{serverTime.error}</AppLeftText>
          </>
        )}
      </AppLeft>
      <AppRight hasError={!serverMetrics.result}>
        {!serverMetrics.loading && serverMetrics.result && <AppRightText>{serverMetrics.response}</AppRightText>}
        {serverMetrics.loading && <AppRightMessage>Loading latest metrics from server!</AppRightMessage>}
        {!serverMetrics.result && !serverMetrics.loading && (
          <>
            <AppRightMessage>An unexpected error occurred:</AppRightMessage>
            <AppRightMessage>{serverMetrics.error}</AppRightMessage>
          </>
        )}
      </AppRight>
    </AppContainer>
  );
};

export default App;
