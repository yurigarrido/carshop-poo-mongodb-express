import { ErrorTypes } from '../errors/catalog';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

class CarService implements IService<ICar> {
  private _carModel:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._carModel = model;
  }

  public async create(obj:ICar):Promise<ICar> {
    console.log(obj);
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    return this._carModel.create(obj);
  }

  public async read(): Promise<ICar[]> {
    return this._carModel.read();
  }

  public async readOne(_id:string):Promise<ICar> {
    const frame = await this._carModel.readOne(_id);
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }

  update(id: string, obj: ICar): Promise<ICar | null> {
    return this._carModel.update(id, obj);
  }

  delete(id: string): Promise<ICar | null> {
    return this._carModel.delete(id);
  }
}

export default CarService;