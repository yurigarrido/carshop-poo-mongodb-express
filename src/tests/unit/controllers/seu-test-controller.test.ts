import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import CarController from '../../../controllers/Car';
import { carMock, carMockWithId } from '../../mocks/car';


describe('Car Controller', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMock);
    sinon.stub(carService, 'readOne').resolves(carMock);
    sinon.stub(carService, 'read').resolves([carMock]);
    sinon.stub(carService, 'update').resolves(carMock);
    sinon.stub(carService, 'delete').resolves(carMock);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create car', () => {
    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('ReadOne car', () => {
    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('Read all cars', () => {
    it('Success', async () => {
      req.params = {};
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true;
    });
  });

  describe('update a car', () => {
    it('Success', async () => {
      req.body = carMockWithId;
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });
  });

  describe('delete a car', () => {
    it('Success', async () => {
      req.body = {
        _id: "4edd40c86762e0fb12000003",
      };
      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
});