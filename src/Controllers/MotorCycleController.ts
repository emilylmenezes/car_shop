import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  protected req: Request;
  protected res: Response;
  protected next: NextFunction;
  protected service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const createVehicle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const results = await this.service.create(createVehicle);

      return this.res.status(201).json(results);
    } catch (error) {
      this.next(error);
    }
  }

  public async allMotorcycles() {
    const response = await this.service.allMotorcycles();
    return this.res.status(200).json(response);
  }

  public async motorcycleId() {
    const getId = this.req.params.id;
    
    if (!isValidObjectId(getId)) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
    
    try {
      const response = await this.service.motorcycleId(getId);
  
      if (response === null) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }
      
      return this.res.status(200).json(response);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const getId = this.req.params.id;
    const acc: IMotorcycle = this.req.body;

    if (!isValidObjectId(getId)) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }

    try {
      const updated = await this.service.update(getId, acc);
  
      if (updated === null) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }
      
      return this.res.status(200).json(updated);
    } catch (error) {
      this.next(error);
    }
  }
}
