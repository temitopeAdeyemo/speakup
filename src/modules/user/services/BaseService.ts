import BaseService from '../../../shared/Helpers/BaseService';

export type IBaseResponse = null | void | object;

export interface IBaseService {
  execute: (args: any) => Promise<IBaseResponse>;
}

export default abstract class UserBaseService extends BaseService {}
