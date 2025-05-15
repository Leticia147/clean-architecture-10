import Address from "../value-object/address";
import Customer from "./customer";

describe('Customer unit tests', () => {

    it('should throw error when id is empty', () => {
        
        expect(() => {
            let customer = new Customer('', 'Doe');
        }).toThrowError('Id is required'); 

    });

    it('should throw error when namw is empty', () => {
        
        expect(() => {
            let customer = new Customer('123', '');
        }).toThrowError('Name is required'); 

    });

    it('should change name', () => {
        let customer = new Customer('123', 'let');
        customer.changeName('John');
        expect(customer.name).toBe('John'); 
    });

    it('should activate a customer', () => {
        const customer = new Customer('1', 'customer 1');
        const address = new Address('rua', 3, '123+-000', 'PF');
        customer.Address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true); 
    });

    it('should deactivate a customer', () => {
        const customer = new Customer('1', 'customer 1');
        customer.deactivate();
        expect(customer.isActive()).toBe(false); 
    });

    it('should trow error when addres is undefined and you activate a customer', () => {

        expect(() => {
            const customer = new Customer('1', 'customer 1');
            customer.activate();
        }).toThrowError('Address is required');

    });

    it('should add reward points', () => {
        const customer = new Customer('1', 'customer 1');
        expect(customer.rewardPoints).toBe(0); 

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10); 

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20); 
    });

});