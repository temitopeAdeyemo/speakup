import { IBaseResponse } from '../../modules/user/services/BaseService';
class JsonResponse {
  statusCode: number;
  data: object | null;

  build(statusCode: number, message: string, data: IBaseResponse = null) {
    this.data = { success: true, message, data };
    this.statusCode = statusCode;
    return this;
  }
}

export default JsonResponse;
export const jsonResponse = new JsonResponse();
