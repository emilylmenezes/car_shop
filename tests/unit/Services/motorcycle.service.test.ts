import { Model } from 'mongoose';
import sinon from 'sinon';
import { expect } from 'chai';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Testando o service Motorcycle', function () {
  it('Deve cadastrar uma motocicleta com sucesso', async function () {
    const expectedReturned : IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,  
    };

    const expectedOutput: Motorcycle = new Motorcycle(expectedReturned);

    sinon.stub(Model, 'create').resolves(expectedOutput);
    const service = new MotorcycleService();
    const response = await service.create(expectedReturned);
    expect(response).to.be.deep.equal(expectedOutput);
  });

  it('Deve listar as motos com sucesso', async function () {
    const vehicle: IMotorcycle[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Honda Cb 600f',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];

    sinon.stub(Model, 'find').resolves(vehicle);

    const service = new MotorcycleService();
    const response = await service.allMotorcycles();   

    expect(response).to.be.deep.equal(vehicle);
  });

  it('Deve listar a moto com base no id', async function () {   
    const id = '634852326b35b59438fbea2f';
    const list: IMotorcycle = {
      id,
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'findOne').resolves(list);

    const service = new MotorcycleService();
    const response = await service.motorcycleId(id);   

    expect(response).to.be.deep.equal(list);
  });

  it('Apresenta um erro se o id for inválido', async function () {
    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new MotorcycleService();
      await service.motorcycleId('qualquercoisa');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Apresenta um erro se o id não existe no banco', async function () {
    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new MotorcycleService();
      await service.motorcycleId('not found');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });

  it('Deve atualizar a moto baseando-se no id', async function () {
    const expectedReturned: IMotorcycle = {
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb 600f',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 500,
    };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(expectedReturned);
    const service = new MotorcycleService();
    const response = await service.update('634852326b35b59438fbea2f', expectedReturned);
    expect(response).to.deep.equal(expectedReturned);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});