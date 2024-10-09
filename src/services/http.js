import {
  Notification,
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_INFO,
  NOTIFICATION_TYPE_SUCCESS,
} from '../components/notifiction/Notification';

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
  'referrerPolicy': "unsafe-url"
};

const defaultSettings = {
  hideSuccessMessage: false,
  hideErrorMessage: false,
  errorMessage: '',
  successMessage: '',
};

const Http = async (apiDataProps) => {
  const {
    url: apiUrl,
    config: apiConfig = {},
    messageSettings,
    data: apiData,
    method,
  } = apiDataProps;

  const handleSuccess = (response, data) => {
    if (messageSettings && !messageSettings.hideSuccessMessage) {
      if (messageSettings.successMessage !== '') {
        Notification({
          type: NOTIFICATION_TYPE_SUCCESS,
          message: messageSettings.successMessage,
        });
      } else if (data?.meta?.message) {
        Notification({
          type: NOTIFICATION_TYPE_SUCCESS,
          message: data.meta.message,
        });
      } else if (response.status === StatusCode.NoContent) {
        Notification({
          type: NOTIFICATION_TYPE_INFO,
          message: 'Nothing Updated.',
        });
      }
    }
  };

  const handleError = async (response) => {
    const { status } = response;

    if (messageSettings && !messageSettings.hideErrorMessage) {
      if (messageSettings.errorMessage !== '') {
        Notification({
          type: NOTIFICATION_TYPE_ERROR,
          message: messageSettings.errorMessage,
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
            window.location.href = "/login";
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
              message: 'Something went wrong.',
            });
            break;
        }
      }
    }
    return Promise.reject(response);
  };

  const fetchOptions = {
    method,
    headers: { ...headers, ...apiConfig.headers },
    body: method !== 'get' ? JSON.stringify(apiData) : undefined,
    ...apiConfig,
  };

  try {
    const response = await fetch(`${apiUrl}`, fetchOptions);

    if (!response.ok) {
      await handleError(response);
    } else {
      const responseData = await response.json();
      handleSuccess(response, responseData);
      return responseData;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    Notification({
      type: NOTIFICATION_TYPE_ERROR,
      message: 'Network error occurred.',
    });
    throw error;
  }
};

// Helper methods for different HTTP verbs
Http.get = ({ url, config, messageSettings }) =>
  Http({
    url,
    config,
    messageSettings: { ...defaultSettings, ...messageSettings },
    method: 'get',
  });

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
