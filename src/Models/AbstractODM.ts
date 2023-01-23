import { Model, Schema, model, models, UpdateQuery } from 'mongoose';
  
export default abstract class Vehicle<T> {
  protected schema: Schema;
  protected model: Model<T>;
  protected nome: string;
  
  constructor(schema: Schema, nome: string) {
    this.schema = schema;
    this.nome = nome;
    this.model = models[this.nome] || model(this.nome, this.schema);
  }
  
  public async create(vehicle: T): Promise<T> {
    const response = await this.model.create({ ...vehicle });
    return response;
  }

  public async vehicleAll(): Promise<T[]> {
    const all = await this.model.find();
    return all;
  }

  public async vehicleID(_id: string): Promise<T | null> {
    const response = this.model.findById({ _id });
    return response;
  }

  public async updateId(_id: string, vehicle: T) {
    const response = this.model.findByIdAndUpdate({ _id }, { ...vehicle } as UpdateQuery<T>, { 
      new: true,
    });

    return response;
  }
}
