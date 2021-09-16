import { Color } from "@material-ui/lab";

export interface IAuth {
  isAuthenticated: boolean;
  currentUser: {
    username:string;
    uid:string;
    email:string;
  };
  newUser?: any;
  error?: any;
  loading: boolean;
}

export interface ISpacrun {
  loading: boolean;
  spacLoading: boolean;
  date?: string | null;
  updateDate?: string | null;
  spac?: any;
  spacDate: string | null;
  historicalLoading: boolean;
  spacHistory?: any;
  gainers?: any[];
  losers?: any[];
  volumeLeaders?: any[];
  weeklyGainers?: any[];
  weeklyLosers?: any[];
  monthlyGainers?: any[];
  monthlyLosers?: any[];
  averageVolume?: any[];
  volumeSpike?: any[];
  errors?: any;
}

export interface IUserData {
  email: string;
  name?: string;
  firstname: string;
  lastname: string;
  password: string;
}
export interface IUserState {
  loading: boolean;
  subscriptionLoading: boolean;
  profile:any;
  isProfileUpdating: boolean;
  errors?: any;
}
export interface IUserHistoryState{
  loading: boolean;
  updateLoading: boolean;
  follows: any[];
  results: any[];
  errors?: any;
}

export interface INotificationState{
  snackbarNotification: {
    open: boolean,
    status: Color | undefined,
    message: string,
  }
}
