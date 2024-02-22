import { toast } from 'react-toastify';

/**
 * Success Toast
 * @param message - Success message
 * @returns Shows Success toast
 *
 */

export const throwSuccessToast = (message) => {
  if (!message) return;
  toast.success(`🍜 ${message}`, {
    position: 'top-right',
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

/**
 * Error Toast
 * @param message - Error message
 * @returns Show Error toast
 *
 */

export const throwErrorToast = (message) => {
  if (!message) return;

  toast.error(`⚠ ${message}`, {
    position: 'top-right',
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};
