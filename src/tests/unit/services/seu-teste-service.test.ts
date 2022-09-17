import { expect } from "chai";
import * as sinon from "sinon";
import { ZodError } from "zod";
import CarModel from "../../../models/Car";
import CarService from "../../../services/Car";
import { carMock, carMockUpdated, carMockWithId } from "../../mocks/car";

describe("car Service", () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, "create").resolves(carMockWithId);
    sinon.stub(carModel, "read").resolves([carMockWithId]);
    sinon.stub(carModel, "update").resolves(carMockWithId);
    sinon.stub(carModel, "readOne").resolves(carMockWithId)
    sinon.stub(carModel, "delete").resolves(carMockWithId)
  });

  after(() => {
    sinon.restore();
  });
  describe("Create car", () => {
    it("Success", async () => {
      const carCreated = await carService.create(carMock);

      expect(carCreated).to.be.deep.equal(carMockWithId);
    });

    it("Failure", async () => {
      let error;
      try {
        await carService.create({
          model: "Fe",
          year: 1963,
          color: "re",
          buyValue: 3500000,
          seatsQty: 2,
          doorsQty: 2
        });
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);

    });
  });

  describe("ReadOne car", () => {
    it("Success", async () => {
      const carCreated = await carService.readOne(carMockWithId._id);

      expect(carCreated).to.be.deep.equal(carMockWithId);
    });

    it("Failure", async () => {
      let error;
      try {
        await carService.readOne(carMockWithId._id);
      } catch (err: any) {
        error = err;
      }

      // expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe("Read all cars", () => {
    it("Success", async () => {
      const carCreated = await carService.read();

      expect(carCreated).to.be.deep.equal([carMockWithId]);
    });
  });

  describe("update a car", () => {
    it("Success", async () => {
      const carCreated = await carService.update('4edd40c86762e0fb12000003', carMockUpdated);

      expect(carCreated).to.be.deep.equal(carMockWithId);
    });

    it("Failure", async () => {
      let error;
      try {
        await carService.update('4edd40c86762e0fb10test', carMockUpdated);
      } catch (err: any) {
        error = err;
      }

      // expect(error).to.be.instanceOf(ZodError);

    });
  });

  describe("delete a car", () => {
    it("Success", async () => {
      const carCreated = await carService.delete('4edd40c86762e0fb12000003');

      expect(carCreated).to.be.deep.equal(carMockWithId);
    });

    it("Failure", async () => {
      let error;
      try {
        await carService.delete('4edd40c86762e0fb10test');
      } catch (err: any) {
        error = err;
      }

      // expect(error).to.be.instanceOf(ZodError);
    });
  });
});
