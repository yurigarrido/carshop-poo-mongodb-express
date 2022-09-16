import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarModel from '../../../models/Car';
import { carMock, carMockUpdated, carMockWithId } from '../../mocks/car';

describe('Car Model', () => {
  const carModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
		sinon.stub(Model, 'find').resolves([carMockWithId]);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
		sinon.stub(Model, 'findOneAndUpdate').resolves(carMockWithId);
		sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
	});

	after(() => {
		sinon.restore();
	});

  describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

  describe('searching all cars', () => {
		it('successfully found', async () => {
			const carsFound = await carModel.read();
			expect(carsFound.length).to.be.deep.equal(1);
		});
	});

	describe('searching a car', () => {
		it('successfully found', async () => {
			const carsFound = await carModel.readOne('4edd40c86762e0fb12000003');
			expect(carsFound).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

  describe('updating a car', () => {
		it('successfully found', async () => {
			const carsFound = await carModel.update('4edd40c86762e0fb12000003', {...carMockUpdated});
			expect(carsFound).to.be.deep.equal(carMockUpdated);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

  describe('deleting a car', () => {
		it('successfully found', async () => {
			const carsFound = await carModel.readOne('4edd40c86762e0fb12000003');
			expect(carsFound).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});


});