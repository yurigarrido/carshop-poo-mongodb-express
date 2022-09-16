import ICar from '../../interfaces/ICar';

const carMock:ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  status: true,
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carMockUpdated:ICar & { _id:string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  status: false,
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carMockWithId:ICar & { _id:string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  status: true,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

export { carMock, carMockWithId, carMockUpdated };