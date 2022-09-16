import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(
    req: Request, 
    res: Response<ICar>,
  ) {
    // const { model, year, color, buyValue, seatsQty, doorsQty } = req.body;
    // const newCar = { model, year, color, buyValue, seatsQty, doorsQty };
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }

  public async read(
    req: Request,
    res: Response<ICar[]>,
  ) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(
    req: Request,
    res: Response<ICar>,
  ) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }

  public async update(
    req: Request,
    res: Response<ICar | null>,
  ) {
    const { model, year, color, buyValue, seatsQty, doorsQty } = req.body;
    const payload = { model, year, color, buyValue, seatsQty, doorsQty };
    const result = await this._service.update(req.params.id, payload);
    return res.status(200).json(result);
  }

  public async delete(
    req: Request,
    res: Response<ICar | null>,
  ) {
    const result = await this._service.delete(req.params.id);
    return res.status(204).json(result);
  }
}