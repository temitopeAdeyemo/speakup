import IUserModel from "../../../modules/users/models/entities/User";
// export default class JsonResponse {
//   public readonly message: string;
//   public readonly data: object;
// }
// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      user: string;
      // response: JsonResponse;
    }
  }
}
