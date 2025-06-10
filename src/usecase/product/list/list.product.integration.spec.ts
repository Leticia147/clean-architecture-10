 import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

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
        const useCase = new ListProductUseCase(productRepository);

        const product = new Product("123", "Product 1", 10);  
        await productRepository.create(product);
        const product2 = new Product("234", "Product 2", 10);  
        await productRepository.create(product2);
        
        const output = [{
            id: "123",
            name: "Product 1",
            price: 10
        },{
            id: "234",
            name: "Product 2",
            price: 10
        }
        ]
        const result = await useCase.execute({});

        expect(result.products).toEqual(output);
    });
});