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
    const car = await this._carModel.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(id: string, obj: ICar): Promise<ICar | null> {
    console.log(id);
    await this._carModel.readOne(id);

    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    return this._carModel.update(id, obj);
  }

  public async delete(id: string): Promise<ICar | null> {
    await this._carModel.readOne(id);
    return this._carModel.delete(id);
  }
}

export default CarService;