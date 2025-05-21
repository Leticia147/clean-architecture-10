import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John Doe",
    new Address("123 Main St",123,"zip","City")
);

const input = {
    id: customer.id,
    name: "John Doe",
    address: {
        street: "123 Main St",
        city: "City",
        number: 123,
        zip: "zip"
    }
}

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Unit test for customer update use case", () => {
    it("should update a customer", async () => {
        const customerRepository = mockRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);
        const output = await useCase.execute(input);
        expect(output).toEqual(input);
    });
})