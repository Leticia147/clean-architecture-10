import { app, sequelize } from "../api/express";
import request from "supertest";

describe("E2E Product Tests", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                id: 1,
                name: "Product A",
                price: 100,
            })
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product A");
        expect(response.body.price).toBe(100);
    });

    it("should not create a product with invalid data", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "a",
        });
        expect(response.status).toBe(500);
    });

    it("should list all product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                id: "1",
                name: "Product A",
                price: 100,
               
            })
        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/product")
            .send({
                id: "2",
                name: "Product B",
                price: 200,
            })
        expect(response2.status).toBe(200);
        expect(response2.body.name).toBe("Product B");
        expect(response2.body.price).toBe(200);
        
        const listResponse = await request(app)
            .get("/product")
            .send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        expect(listResponse.body.products[0].name).toBe("Product A");
        expect(listResponse.body.products[1].name).toBe("Product B");
        expect(listResponse.body.products[0].price).toBe(100);
        expect(listResponse.body.products[1].price).toBe(200);
       
    });
})
