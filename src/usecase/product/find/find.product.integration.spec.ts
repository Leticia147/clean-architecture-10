 import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

 describe("Test find product use case", () => {
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
    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new FindProductUseCase(productRepository);
        const product = new Product("123", "Product 1", 10); 
        await productRepository.create(product);
        const input = {
            id: "123"
        }
        const output = {
            id: "123",
            name: "Product 1",
            price: 10
        }
        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });
});