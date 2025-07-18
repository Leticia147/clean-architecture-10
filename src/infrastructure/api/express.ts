import express, { Express } from 'express';
import { Sequelize } from "sequelize-typescript";
import CustomerModel from '../customer/repository/customer.model';
import { customerRoute } from './routes/customer.route';
import { productRoute } from './routes/product.route';
import ProductModel from '../product/repository/sequelize/product.model';

export const app: Express = express();
app.use(express.json());
app.use('/customer', customerRoute);
app.use('/product', productRoute);

export let sequelize: Sequelize;

async function setupDatabase() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
};

setupDatabase();