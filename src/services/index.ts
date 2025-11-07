import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { Platform } from 'react-native';
import { hideLoader, showLoader } from '../redux/slice/screenSlice';
import { store } from '../redux/store';

export const getBaseURL = () => {
  if (__DEV__) {
    // For Android emulator
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000/';
    }
    // For iOS simulator and general development
    return 'http://localhost:3000/';
  }
  // For production
  //   return 'https://your-production-api.com/';
};

const instance = axios.create({
  baseURL: 'https://api.traveloservices.com/',
  // baseURL: 'http://10.0.2.2:3000/',
  // baseURL: getBaseURL(),
  timeout: 10000,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState()?.role?.userAuthToken;
    // const lang = store.getState()?.role.languageSelect
    const lang = store.getState().role.languageSelect;
    // console.log("Language Selected", lang)
    console.log(token);
    store.dispatch(showLoader('loading'));

    config.headers.set('x-app-language', lang);
    if (token) {
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    store.dispatch(hideLoader('idle'));
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    store.dispatch(hideLoader('idle'));
    return response;
  },
  error => {
    store.dispatch(hideLoader('idle'));
    console.log('API Error:', error.response?.data || error.message);
    return Promise.reject(
      error.response?.data?.message ||
        'Something went wrong. Please try again.',
    );
  },
);

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiResponse<T = any> {
  // json(): unknown;
  error: string | null;
  response: AxiosResponse<T> | null;
}

export const apiHelper = async <T = any>(
  method: HttpMethod,
  endPoint: string,
  customHeaders: Record<string, string> = {},
  body: any = null,
): Promise<ApiResponse<T>> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url: endPoint,
      headers: {
        'Content-Type': 'application/json',
        ...customHeaders,
      },
      ...(method !== 'GET' && { data: body }),
    };

    const response = await instance.request<T>(config);

    return {
      error: null,
      response,
    };
  } catch (error: any) {
    return {
      error: error,
      response: null,
    };
  }
};