export interface IAuth {
  isAuthenticated: boolean;
  currentUser?: any;
  newUser?: any;
  error?: any;
  loading: boolean;
}

export interface ISpacrun {
  loading: boolean;
  spacLoading: boolean;
  date?: string;
  updateDate?: string;
  spac?: any;
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

