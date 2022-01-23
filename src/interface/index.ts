import { Color } from "@material-ui/lab";

export interface IAuth {
  isAuthenticated: boolean;
  currentUser: {
    username?: string;
    uid?: string;
    email?: string;
    contact?:any;
  };
  newUser?: any;
  error?: any;
  loading: boolean;
}
