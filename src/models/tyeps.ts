import { ISuserinfoprops } from './userModels/userTypes';
export interface IStoreProps {
  userinfo: ISuserinfoprops | undefined;
  routersData: Array<[]> | undefined | null;
}
