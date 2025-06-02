import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/customer.model";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import UpdateCustomerUseCase from "./update.customer.usecase";

describe("Update customer use case", () => {

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
        const useCase = new UpdateCustomerUseCase(customerRepository);

        const custumer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "Zipcode 1");
        custumer.changeAddress(address);
        await customerRepository.create(custumer);

        const custumer2 = new Customer("123", "Customer 2");
        const address2 = new Address("Street 2", 2, "City 2", "Zipcode 2");
        custumer2.changeAddress(address2);
        await customerRepository.update(custumer2);

        const input = 
        {
            id: "123",
            name: "Customer 2",
            address: {
                street: "Street 2",
                number: 2,
                city: "City 2",
                zip: "Zipcode 2"
            },
        };
        const result = await useCase.execute(input);
        expect(result).toEqual(input);    
    });
});