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
            .post("/customers")
            .send({
                name: "John",
                address: {
                    street: "123 Main St",
                    city: "Anytown",
                    state: "CA",
                    zip: "12345"
                }
            })
        }
    )
})
