import { notification } from 'antd';

export const showError = (error: Error) => {
  notification.error({
    message: error.message,
    placement: 'bottomRight',
  });
};
