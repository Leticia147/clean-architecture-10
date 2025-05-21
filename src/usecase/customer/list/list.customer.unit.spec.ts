import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "John Doe",
     new Address("123 Main St", 123, "zip", "City"),
);

const customer2 = CustomerFactory.createWithAddress(
    "Jane Doe",
    new Address("456 Main St", 456, "zip", "City"),
);

const mockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        update: jest.fn(),
        create: jest.fn(),
        find: jest.fn(),
    }
}

describe("Unit test for customer list use case", () => {
    it("should list a customer", async () => {
        const customerRepository = mockRepository();
        const useCase = new ListCustomerUseCase(customerRepository);

        const output = await useCase.execute({});
        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
        
    });
});