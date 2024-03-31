import { useSnackbar, SnackbarKey } from 'notistack';

let useSnackbarRef: {
  enqueueSnackbar: (message: string, options?: { variant?: SnackbarKey; autoHideDuration?: number }) => void;
};

export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export const Snack = {
  success(msg: string) {
    this.toast(msg, 'success');
  },
  warning(msg: string) {
    this.toast(msg, 'warning');
  },
  info(msg: string) {
    this.toast(msg, 'info');
  },
  error(msg: string) {
    this.toast(msg, 'error');
  },
  toast(msg: string, variant: SnackbarKey = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant, autoHideDuration: 3000 });
  },
};

export default Snack;
