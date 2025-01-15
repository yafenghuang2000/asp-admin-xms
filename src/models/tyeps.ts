import { ISuserinfoprops } from './userModels/userTypes';
export interface IStoreProps {
  userinfo: ISuserinfoprops | undefined;
  routersData: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routers: Array<any>;
  };
}
