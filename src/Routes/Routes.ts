import { Router } from 'express';
import CarController from '../Controllers/CarController';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).createCar(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).carsAll(),
);
routes.get(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).CarOfID(),
);

export default routes;