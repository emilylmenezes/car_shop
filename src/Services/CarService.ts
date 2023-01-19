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
}

export default CarService;