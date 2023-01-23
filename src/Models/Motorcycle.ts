import { Schema } from 'mongoose';
import IMotorcycles from '../Interfaces/IMotorcycle';
import Vehicle from './AbstractODM';
  
class Motorcycle extends Vehicle<IMotorcycles> {
  constructor() {
    const schema = new Schema({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super(schema, 'Motorcycle');
  }
}

export default Motorcycle;
