import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction, Express } from 'express';
import AppError from '../../../shared/utils/AppError';
import {IBaseService, IBaseResponse } from '../services/BaseService';

type paramType = 'body' | 'query' | 'headers' | 'user' | '';

class BaseController {
  paramKeys: Array<string>;
  Service: IBaseService;
  paramType: paramType;
  response: Response;
  statusCode: number;
  message: string;

  constructor(
    paramType: paramType,
    paramKeys: Array<string>,
    Service: IBaseService,
    statusCode: number,
    message: string
  ) {
    this.Service = Service;
    this.paramKeys = paramKeys;
    this.paramType = paramType;
    this.statusCode = statusCode;
    this.message = message;
  }

  async exec(req: Request, next: NextFunction) {
    try {
      let serviceArgs: any = null;

      if (this.paramType) {
        serviceArgs = {};
        this.paramKeys.forEach((key: string) => {
          serviceArgs[key] = req.body[key];
        });
      }

      const response = await this.Service.execute(serviceArgs);
      return response;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  pushResponse(response: IBaseResponse, next: NextFunction) {
    try {
      const successResponse = jsonResponse.build(
        this.statusCode,
        this.message,
        response
      );
      next(successResponse);
    } catch (error: any) {
      return next(error);
    }
  }
}

export default BaseController;
