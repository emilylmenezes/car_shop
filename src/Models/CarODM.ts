import { Model, Schema, model, models } from 'mongoose';
import ICar from '../Interfaces/ICar';
  
class CarODM {
  private schema: Schema;
  private model: Model<ICar>;
  
  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
  }
  
  public async create(car: ICar): Promise<ICar> {
    const response = await this.model.create({ ...car });
    return response;
  }

  public async carsAll(): Promise<ICar[]> {
    const allCars = await this.model.find();
    return allCars;
  }

  public async carsID(_id: string): Promise<ICar | null> {
    return this.model.findById({ _id });
  }
}

export default CarODM;
