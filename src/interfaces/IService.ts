interface IService<T> {
  create(obj:unknown):Promise<T>,
  read():Promise<T[]>,
  readOne(_id:string):Promise<T>,
  update(id: string, body: T): Promise<T | null>
  delete(id: string): Promise<T | null>
}

export default IService;