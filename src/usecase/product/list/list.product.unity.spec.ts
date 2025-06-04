import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product(
    "123",
    "Product 1",
    100,
);
const product2 = new Product(
    "456",
    "Product 2",
    200,
);

const mockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        update: jest.fn(),
        create: jest.fn(),
        find: jest.fn(),
    }
}
describe("Unit test for product list use case", () => {
    it("should list a product", async () => {
        const productRepository = mockRepository();
        const useCase = new ListProductUseCase(productRepository);
        const output = await useCase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    });

    
});