import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(cars: ICar | null): Car | null {
    if (cars) {
      return new Car(cars);
    }

    return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarODM();
    const cars = await carODM.create(car);
    return this.createCarDomain(cars);
  }

  public async carsAll() {
    const odm = new CarODM();
    const list = await odm.carsAll();
    return list.map((acc) => this.createCarDomain(acc));
  }

  public async carOfID(id: string) {
    const odm = new CarODM();
    const list = await odm.carsID(id);
    return this.createCarDomain(list);
  }

  public async carsUpdate(id: string, car: ICar) {
    const odm = new CarODM();
    const response = await odm.updateId(id, car);
    return this.createCarDomain(response);
  }
}

export default CarService;