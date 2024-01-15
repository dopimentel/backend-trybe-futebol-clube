import { Request, Response } from 'express';
import { Model } from 'sequelize';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import ServiceLogin from '../services/ServiceLogin';

export default class LoginController<T extends Model> {
  constructor(
    private serviceLogin: ServiceLogin<T>,
  ) { }

  public async login(req: Request, res: Response) {
    const serviceResponse = await this.serviceLogin.login(req.body);
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}