import axios from 'axios';
import {
  Notification,
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_INFO,
  NOTIFICATION_TYPE_SUCCESS,
} from '../components/notifiction/Notification';
import { useNavigate } from 'react-router-dom';


const StatusCode = {
  NoContent: 204,
  InvalidRequest: 400,
  ResourceUnauthorized: 401,
  ClientForbidden: 403,
  ResourceNotFound: 404,
  Conflict: 409,
  BadGateway: 502,
  ServiceUnavailable: 503,
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
};

const defaultSettings = {
  hideSuccessMessage: false,
  hideErrorMessage: false,
  errorMessage: '',
  successMessage: '',
};

const Http = async (apiDataProps) => {
  const http = axios.create({
    baseURL: process.env.REACT_APP_API_BASIC_URL,
    headers,
    withCredentials: true,
  });

  const {
    url: apiUrl,
    config: apiConfig = {},
    messageSettings,
    data: apiData,
    method,
  } = apiDataProps;

  const handleSuccess = (response) => {
    if (messageSettings && !messageSettings.hideSuccessMessage) {
      if (messageSettings.successMessage !== '') {
        Notification({
          type: NOTIFICATION_TYPE_SUCCESS,
          message: messageSettings.successMessage,
        });
      } else if (response?.data?.meta?.message) {
        Notification({
          type: NOTIFICATION_TYPE_SUCCESS,
          message: response?.data?.meta?.message,
        });
      } else if (response?.status === StatusCode.NoContent) {
        Notification({
          type: NOTIFICATION_TYPE_INFO,
          message: 'Nothing Updated.',
        });
      }
    }
  };

  const handleError = async (error) => {
    const { status, data } = error;
    const navigate = useNavigate();
    if (messageSettings && !messageSettings.hideErrorMessage) {
      if (messageSettings.errorMessage !== '') {
        Notification({
          type: NOTIFICATION_TYPE_ERROR,
          message: messageSettings.errorMessage,
        });
      } else if (typeof data === 'string') {
        Notification({
          type: NOTIFICATION_TYPE_ERROR,
          message: data,
        });
      } else {
        switch (status) {
          case StatusCode.ResourceNotFound:
            Notification({
              type: NOTIFICATION_TYPE_ERROR,
              message: 'Resource Not Found.',
            });
            break;
          case StatusCode.ResourceUnauthorized:
            Notification({
              type: NOTIFICATION_TYPE_ERROR,
              message: 'Unauthorized Access.',
            });
            // Navigate to home or login
          navigate('/login'); // or navigate('/home');
            break;
          case StatusCode.ClientForbidden:
            Notification({
              type: NOTIFICATION_TYPE_ERROR,
              message: 'Forbidden Access.',
            });
            break;
          case StatusCode.Conflict:
            Notification({
              type: NOTIFICATION_TYPE_ERROR,
              message: 'Conflict Error.',
            });
            break;
          default:
            Notification({
              type: NOTIFICATION_TYPE_ERROR,
              message: 'Something Wrong.',
            });
            break;
        }
      }
    }
    return Promise.reject(error);
  };

  http.interceptors.request.use((request) => {
    // set ip address
    return request;
  });

  http.interceptors.response.use(
    (response) => {
      handleSuccess(response);
      return response.data;
    },
    (error) => {
      console.log(error);
      
      const { response } = error;
      return handleError(response);
    }
  );

  switch (method) {
    case 'get':
      return http.get(apiUrl, apiConfig);
    case 'post':
      return http.post(apiUrl, apiData, apiConfig);
    case 'put':
      return http.put(apiUrl, apiData, apiConfig);
      case 'patch':
      return http.patch(apiUrl, apiData, apiConfig);
    case 'delete':
      return http.delete(apiUrl, apiConfig);
    default:
      return http.request(apiConfig);
  }
};

Http.get = ({ url, config, messageSettings }) => {
  return Http({
    url,
    config,
    messageSettings: { ...defaultSettings, ...messageSettings },
    method: 'get',
  });
};

Http.post = ({ url, data, config, messageSettings }) =>
  Http({
    url,
    data,
    config,
    messageSettings: { ...defaultSettings, ...messageSettings },
    method: 'post',
  });

Http.put = ({ url, data, config, messageSettings }) =>
  Http({
    url,
    data,
    config,
    messageSettings: { ...defaultSettings, ...messageSettings },
    method: 'put',
  });

  Http.patch = ({ url, data, config, messageSettings }) =>
    Http({
      url,
      data,
      config,
      messageSettings: { ...defaultSettings, ...messageSettings },
      method: 'patch',
    });

Http.delete = ({ url, config, messageSettings }) =>
  Http({
    url,
    config,
    messageSettings: { ...defaultSettings, ...messageSettings },
    method: 'delete',
  });

Http.request = ({ config }) =>
  Http({
    config,
    url: '',
  });

export default Http;
