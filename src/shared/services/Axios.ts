import AppError from '../utils/AppError';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

class Axios {
  private axios: AxiosInstance = axios;
  public AxiosRequestConfig: AxiosRequestConfig;
  public AxiosResponse: AxiosResponse;

  async get(url: string, authorization?: string): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      url,
      method: 'get',
      headers: {
        Authorization: authorization,
        'content-type': 'application/json',
      },
    };
    console.log('url', url);
    const response: AxiosResponse = await axios(config);

    return response.data;
  }

  async post(
    url: string | undefined,
    payload: object | string,
    authorization?: string,
    token?: string
  ): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      url,
      method: 'post',
      headers: {
        token,
        Authorization: authorization,
        'content-type': 'application/json',
      },
      data: payload,
    };

    const response = await axios(config);

    return response.data;
  }
}

export default Axios;
