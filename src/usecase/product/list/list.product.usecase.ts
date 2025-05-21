import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interfcace";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;
    constructor(ProductRepository: ProductRepositoryInterface) {
        this.productRepository = ProductRepository;
    }

    async execute(input:InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products);
    }
}

class OutputMapper {
    static toOutput(products: any[]): OutputListProductDto {
        return {
            products: products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        }
    }
}