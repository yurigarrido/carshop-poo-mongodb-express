import { Request, Response } from 'express';
import ICar from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(
    req: Request, 
    res: Response<ICar>,
  ) {
    const { material, color } = req.body;
    const frame = { material, color };
    const results = await this._service.create(frame);
    return res.status(201).json(results);
  }

  public async readOne(
    req: Request,
    res: Response<ICar>,
  ) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }
}