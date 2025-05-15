import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";

export default class CustomerFactory {
    public static create(name: string): Customer {
        return new Customer(uuid(), name);
    }

    public static createWithAddress(name:string, addres: Address): Customer {
        const customer = new Customer(uuid(), name);
        customer.changeAddress(addres);
        return customer;
    }
}