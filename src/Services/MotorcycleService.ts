import Motorcycles from '../Domains/Motorcycle';
import IMotorcycles from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/Motorcycle';

export default class MotorcycleService {
  private createDomain(acc: IMotorcycles | null): Motorcycles | null {
    if (acc) {
      return new Motorcycles(acc);
    }
    
    return null;
  }
    
  public async create(vehicles: IMotorcycles) {
    const response = new MotorcycleODM();
    const results = await response.create(vehicles);
    return this.createDomain(results);
  }

  public async allMotorcycles() {
    const response = new MotorcycleODM();
    const results = await response.vehicleAll();
    return results.map((flag) => this.createDomain(flag));
  }

  public async motorcycleId(id: string) {
    const response = new MotorcycleODM();
    const results = await response.vehicleID(id);
    return this.createDomain(results);
  }

  public async update(id: string, interfaceVehicle: IMotorcycles) {
    const response = new MotorcycleODM();
    const results = await response.updateId(id, interfaceVehicle);
    return this.createDomain(results);
  }
}
