import { isAxiosError } from 'axios';
import { axios } from './axios';
import { ServerResponse } from './serverResponse';

export const getServerTime = async (): Promise<ServerResponse<number>> => {
  try {
    const { data } = await axios.get<{ epoch: number }>(`/time`);
    return {
      response: data.epoch,
      result: true,
    } as ServerResponse<number>;
  } catch (error) {
    let errorMessage = '';
    if (isAxiosError(error)) {
      if(error.response) {
        errorMessage = `${error.response.status}: ${error.response.data}`;
      }
      else {
        errorMessage = `${error.code}: ${error.message}`;
      }
    }
    return {
      response: 0,
      result: false,
      error: errorMessage,
    } as ServerResponse<number>;
  }
};
