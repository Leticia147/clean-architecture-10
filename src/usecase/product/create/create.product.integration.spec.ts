 import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/db/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

 describe("Test create product use case", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {  
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
            
    });

    afterEach(async () => {
        await sequelize.close();
    });

    //teste de integração
    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);
        const input = {
            type: "a",
            name: "Product 1",
            price: 10,
        }
        const output = {
            id: expect.any(String),
            name: "Product 1",
            price: 10,
        }
        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });
});