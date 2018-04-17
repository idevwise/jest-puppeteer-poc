import faker from "faker";
const testData = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  pass: faker.internet.password(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words()
};

export default testData;