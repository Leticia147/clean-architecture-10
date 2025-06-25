import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test update product use case", () => {
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
    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);
        const product2 = new Product("123", "Product 2", 30);
        await productRepository.update(product2);
        const output = {
            id: "123",
            name: "Product 2",
            price: 30
        }
        const result = await useCase.execute(output);
        expect(result).toEqual(output);
    });
});