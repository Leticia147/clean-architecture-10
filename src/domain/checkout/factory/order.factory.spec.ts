import {v4 as uuid} from "uuid";
import OrderFactory from "./order.factory";

describe("Order factory unit test", () =>{

    it("Should create an order", () => {
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(), 
                    name: "Item 1",
                    price: 10,
                    productId: uuid(),
                    quantity: 1,
                },
            ]
        };

        const order = OrderFactory.create(orderProps);
        expect(order.id).toBeDefined();
        expect(order.customerId).toBe(orderProps.customerId);
        expect(order.items.length).toBe(1);
        expect(order.items[0].id).toBeDefined();
        expect(order.items[0].name).toBe(orderProps.items[0].name);
        expect(order.items[0].price).toBe(orderProps.items[0].price);
    })
});
