import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/customer.model";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustumerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {

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
    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new FindCustumerUseCase(customerRepository);

        const custumer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "Zipcode 1");
        custumer.changeAddress(address);
       
        await customerRepository.create(custumer);

        const input = {
            id: "123"
        }
        const output = {
            id: "123",
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