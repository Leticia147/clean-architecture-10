import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/customer.model";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "./list.customer.usecase";

describe("Test list customer use case", () => {

    let sequelize: Sequelize;
   
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    //teste de integração
    it("should list all customers", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new ListCustomerUseCase(customerRepository);

        const custumer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "Zipcode 1");
        custumer.changeAddress(address);
        await customerRepository.create(custumer);

        const custumer2 = new Customer("234", "Customer 2");
        const address2 = new Address("Street 2", 2, "City 2", "Zipcode 2");
        custumer2.changeAddress(address2);
        await customerRepository.create(custumer2);

        const output = [{
            id: "123",
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                city: "City 1",
                zip: "Zipcode 1"
            },
        },{
            id: "234",
            name: "Customer 2",
            address: {
                street: "Street 2",
                number: 2,
                city: "City 2",
                zip: "Zipcode 2"
            },
        }]
        const result = await useCase.execute({});
        expect(result.customers).toEqual(output);    
    });
});