import * as auth from '../_reducers/auth.reducers';


export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
};
