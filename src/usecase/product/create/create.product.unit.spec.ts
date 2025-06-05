import CreateProductUsecase from './create.product.usecase';

const input = {
    id: "1",
    name: "Product 1",
    price: 10,
}

const mockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = mockRepository();
        const createProductUseCase = new CreateProductUsecase(productRepository);

        const output = await createProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = mockRepository();
        const createProductUseCase = new CreateProductUsecase(productRepository);

        input.name = "";

        await expect(createProductUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when price is missing", async () => {
        const productRepository = mockRepository();
        const createProductUseCase = new CreateProductUsecase(productRepository);
 
        input.name = "Product 1";
        input.price = 0.0;

        await expect(createProductUseCase.execute(input)).rejects.toThrow("Price must be greater than 0");
    });
})
    

