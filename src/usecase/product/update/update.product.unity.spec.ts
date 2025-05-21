import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product 1", 100);

const input = {
    id: "123",
    name: "Product 1",
    price: 100
}

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test find product use case", () => {
    it("should update a product", async () => {
        const productRepository = mockRepository();
        productRepository.find.mockReturnValue(Promise.resolve(product));
        const useCase = new UpdateProductUseCase(productRepository);

        const output = await useCase.execute(input);
        expect(output).toEqual(input);
    }
    );
})