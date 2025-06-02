import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/customer.model";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";

describe("Test create customer use case", () => {

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
    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);

        const input = {
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                city: "City 1",
                zip: "Zipcode 1"
            }
        }

        const output = {
            id: expect.any(String),
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                city: "City 1",
                zip: "Zipcode 1"
            }
        }
        const result = await useCase.execute(input);
        expect(result).toEqual(output);    
    });
});