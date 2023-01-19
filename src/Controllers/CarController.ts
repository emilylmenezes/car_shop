import { NextFunction, Request, Response } from 'express';
// Ref: https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-isValidObjectId
import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async createCar() {
    const carNew: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const cars = await this.service.createCar(carNew);
      return this.res.status(201).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async carsAll() {
    const cars = await this.service.carsAll();
    const response = this.res.status(200).json(cars);
    return response;
  }

  public async CarOfID() {
    const getID = this.req.params.id;
    if (!isValidObjectId(getID)) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }

    try {
      const returnCar = await this.service.carOfID(getID);

      if (returnCar === null) {
        return this.res.status(404).json(
          { message: 'Car not found' },
        );
      }

      return this.res.status(200).json(returnCar);
    } catch (error) {
      this.next(error);
    }
  }
}
