import { app, sequelize } from "../api/express";
import request from "supertest";

describe("E2E Customer Tests", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "123 Main St",
                    city: "Anytown",
                    number: "1",
                    zip: "12345"
                }
            })
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("123 Main St");
        expect(response.body.address.city).toBe("Anytown");
        expect(response.body.address.number).toBe("1"); 
        expect(response.body.address.zip).toBe("12345");
    });

    it("should not create a customer with invalid data", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "",
        });
        expect(response.status).toBe(500);
    });

    it("should list all customers", async () => {
          const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "123 Main St",
                    city: "Anytown",
                    number: 1,
                    zip: "12345"
                }
            })
        expect(response.status).toBe(200);
        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Carlos",
                address: {
                    street: " Main St",
                    city: "Anytown",
                    number: 2,
                    zip: "12345"
                }
            })
        expect(response2.status).toBe(200);
        const listResponse = await request(app)
            .get("/customer")
            .send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customer1 = listResponse.body.customers[0];
        expect(customer1.name).toBe("John");
        expect(customer1.address.street).toBe("123 Main St");
        expect(customer1.address.city).toBe("Anytown");
        expect(customer1.address.number).toBe(1);
        expect(customer1.address.zip).toBe("12345");
        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("Carlos");
        expect(customer2.address.street).toBe(" Main St");
        expect(customer2.address.city).toBe("Anytown");
        expect(customer2.address.number).toBe(2);
        expect(customer2.address.zip).toBe("12345");
    });
})
