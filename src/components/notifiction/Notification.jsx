/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationCloseIcon from '../../assets/icons/notification-close-icon';
import SuccessIcon from '../../assets/icons/success-icon';
import ErrorIcon from '../../assets/icons/error-icon';
import InfoIcon from '../../assets/icons/info-icon';
import WarningIcon from '../../assets/icons/warning-icon';
import { DEFAULT_NOTIFICATION_DISPLAY_TIME } from '../../utils/constants';

export const NOTIFICATION_TYPE_SUCCESS = 'success';
export const NOTIFICATION_TYPE_ERROR = 'error';
export const NOTIFICATION_TYPE_INFO = 'info';
export const NOTIFICATION_TYPE_WARN = 'warn';

export function Notification({
  type,
  message,
  timeout = DEFAULT_NOTIFICATION_DISPLAY_TIME,
}) {
  const toastOptions = {
    position: 'top-center',
    autoClose: timeout,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  };

  switch (type) {
    case NOTIFICATION_TYPE_SUCCESS:
      toast.success(message, { ...toastOptions, icon: <SuccessIcon /> });
      break;
    case NOTIFICATION_TYPE_ERROR:
      toast.error(message, { ...toastOptions, icon: <ErrorIcon /> });
      break;
    case NOTIFICATION_TYPE_INFO:
      toast.info(message, { ...toastOptions, icon: <InfoIcon /> });
      break;
    case NOTIFICATION_TYPE_WARN:
      toast.warn(message, { ...toastOptions, icon: <WarningIcon /> });
      break;
    default:
      break;
  }
  return null;
}

function NotificationWrapper() {
  return (
    <ToastContainer
      role="alert"
      transition={Slide}
      closeButton={
        <button className={'Toastify__close-button'}>
          <NotificationCloseIcon />
        </button>
      }
    />
  );
}

export default NotificationWrapper;
