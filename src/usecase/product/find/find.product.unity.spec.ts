import Product from "../../../domain/product/entity/product"
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 100);

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test find product use case", () => {
    it("should find a product", async () => {
        const productRepository = mockRepository();
        productRepository.find.mockReturnValue(Promise.resolve(product));
        const useCase = new FindProductUseCase(productRepository);
        const input = {
            id: "123"
        }
        const output = {
            id: "123",
            name: "Product 1",
            price: 100
        }
        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });

    it("should not find a product", async () => {
        const productRepository = mockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const useCase = new FindProductUseCase(productRepository);
        const input = {
            id: "123"
        }
        expect(()=>{
            return useCase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});