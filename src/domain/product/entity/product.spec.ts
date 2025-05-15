import Product from "./product";

describe('Product unit tests', () => {

    it('should throw error when id is empty', () => {
        expect(() => {
            const product = new Product('', 'Product 1', 10);
        }).toThrowError('Id is required'); 
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            const product = new Product('1', '', 10);
        }).toThrowError('Name is required'); 
    });

    it('should throw error when price is less than 0', () => {
        expect(() => {
            const product = new Product('1', 'Product 1', -10);
        }).toThrowError('Price must be greater than 0'); 
    });

    it('should change name', () => {    
        const product = new Product('1', 'Product 1', 10);
        product.name = 'Product 2';
        expect(product.name).toBe('Product 2');
    });

    it('should chage price', () => {    
        const product = new Product('1', 'Product 1', 10);
        product.changePrice(20);
        expect(product.price).toBe(20);
    });

});