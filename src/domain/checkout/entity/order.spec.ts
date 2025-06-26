import Address from "../../customer/value-object/address";
import Customer from "../../customer/entity/customer";
import Order from "../../checkout/entity/order";
import OrderItem from "../../checkout/entity/orderItem";

describe('Order unit tests', () => {

    it('should throw error when id is empty', () => {
        expect(() => {
            let order = new Order('', '123', []);
        }).toThrow('Id is required'); 
    });

    it('should throw error when customer id is empty', () => {
        expect(() => {
            let order = new Order('123', '', []);
        }).toThrow('customerId is required'); 
    });

    it('should throw error when customer id is empty', () => {
        expect(() => {
            let order = new Order('123', '123', []);
        }).toThrow('Itens are required'); 
    });

    it('should calculate total', () => {
        const item =  new OrderItem('1', 'item 1', 10, 'p1', 2);
        const item2 =  new OrderItem('2', 'item 2', 20, 'p2', 2);

        const order = new Order('o1', 'c1', [item]);

        expect(order.total()).toBe(20);

        const order2 = new Order('o1', 'c1', [item, item2]);
        expect(order2.total()).toBe(60);
    });

    it('should throw error if the item quantity is less or equal 0', () => {
       expect(() => {
            const item =  new OrderItem('1', 'item 1', 10, 'p1', 0);
            const order = new Order('o1', 'c1', [item]);
        }).toThrow('Quantity must be greater than 0');
    });

});