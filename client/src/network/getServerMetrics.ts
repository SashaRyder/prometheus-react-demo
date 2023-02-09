import { isAxiosError } from 'axios';
import { axios } from './axios';
import { ServerResponse } from './serverResponse';

export const getServerMetrics = async (): Promise<ServerResponse<string>> => {
  try {
    const { data } = await axios.get<string>(`/metrics`);
    return {
      response: data,
      result: true,
    } as ServerResponse<string>;
  } catch (error) {
    let errorMessage = '';
    if (isAxiosError(error)) {
      if (error.response) {
        errorMessage = `${error.response.status}: ${error.response.data}`;
      } else {
        errorMessage = `${error.code}: ${error.message}`;
      }
    }
    return {
      response: '',
      result: false,
      error: errorMessage,
    } as ServerResponse<string>;
  }
};
