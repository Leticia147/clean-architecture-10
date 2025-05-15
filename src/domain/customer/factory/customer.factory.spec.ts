import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
    it("should create a customer", () => {
        let customer = CustomerFactory.create("Customer 1");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer 1");
        expect(customer.address).toBeUndefined();

    });

    it("should create a customer with an address", () => {
        const addres = new Address("Street 1", 1, "City", "Zipcode 1");
        let customer = CustomerFactory.createWithAddress("Customer 1", addres);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer 1");
        expect(customer.address).toBeDefined();
        expect(customer.address.street).toBe("Street 1");
        expect(customer.address.number).toBe(1);
        expect(customer.address.zip).toBe("Zipcode 1");
        expect(customer.address.city).toBe("City");
    });

});