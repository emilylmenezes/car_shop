import { Model } from 'mongoose';
import { expect } from 'chai';
import Sinon from 'sinon';
import CarDomains from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';

describe('Testando CarService', function () {
  it('Carro sucesso', async function () {
    const carroCadastrado: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const saidaEsperada = new CarDomains(carroCadastrado);
    Sinon.stub(Model, 'create').resolves(saidaEsperada);

    const carService = new CarService();
    const response = await carService.createCar(carroCadastrado);

    expect(response).to.be.deep.equal(saidaEsperada);

    Sinon.restore();
  });

  it('Listando todos os carros', async function () {
    const ids = {
      idOne: '634852326b35b59438fbea2f',
      idTwo: '634852326b35b59438fbea31',
    };

    const listeredCars : ICar[] = [
      {
        id: ids.idOne,
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: ids.idTwo,
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: false,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];

    Sinon.stub(Model, 'find').resolves(listeredCars);

    const carService = new CarService();
    const responseAll = await carService.carsAll();

    expect(responseAll).to.be.deep.equal(listeredCars);

    Sinon.restore();
  });

  it('Listando pelo ID', async function () {
    const idExpected = '634852326b35b59438fbea2f';

    const list = {
      id: idExpected,
      model: 'Marea',
      year: 2002,
      color: 'Red',
      status: false,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    Sinon.stub(Model, 'findById').resolves(list);

    const carService = new CarService();
    const byId = await carService.carOfID(idExpected);

    expect(byId).to.be.deep.equal(list);

    Sinon.restore();
  });

  it('Id Inválido', async function () {
    Sinon.stub(Model, 'findById').resolves();
  
    const carService = new CarService();
    const acc = await carService.carOfID('invalid');
  
    expect(acc).to.be.deep.equal(null);

    Sinon.restore();
  });

  it('Atualizar carro', async function () {
    const ids = {
      oneId: '634852326b35b59438fbea2f',
      twoId: '63c1d1eba786851db0c7862a',
    };
    
    const updated = {
      id: ids.oneId,
      model: 'Marea',
      year: 2002,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };
    
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(updated);

    const carService = new CarService();
    const responseUp = await carService.carsUpdate(ids.twoId, updated);
  
    expect(responseUp).to.be.deep.equal(updated);

    Sinon.restore();
  });
});