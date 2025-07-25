import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer.model";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../../../domain/customer/value-object/address";
import EventDispatcher from "../../../../domain/@shared/event/event-dispatcher";
import EnviaConsoleLogHandler from "../../../../domain/@shared/customer/handler/envia-console-log-handler";
import EnviaConsoleLog1Handler from "../../../../domain/@shared/customer/handler/envia-console-log1-handler";
import EnviaConsoleLog2Handler from "../../../../domain/@shared/customer/handler/envia-console-log2-handler";
import CustomerCreatedEvent from "../../../../domain/@shared/customer/customer-created.event";
import CustomerChangedAddressEvent from "../../../../domain/@shared/customer/customer-changed-address.event";

describe("customer repository teste", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {  
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
           
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Deve criar um cliente", async () => {
        const customerRepository = new CustomerRepository();
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');
        const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
        const spyEventHandler2= jest.spyOn(eventHandler2, 'handle');

        eventDispatcher.register('CustomerChangedAddressEvent', eventHandler);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
        
        const customer = new Customer("123", "Customer 1");
        const customerCreatedEvent = new CustomerCreatedEvent({customer});
        eventDispatcher.notify(customerCreatedEvent);
        const address = new Address("Street 1", 1, "City 1", "Zipcode 1");
        
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();

        customer.changeAddress(address);
        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: 123 } });
        
        const customerChangedAddressEvent = new CustomerChangedAddressEvent({
            customer,
            address: address,
        });
        eventDispatcher.notify(customerChangedAddressEvent);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeDefined();

        expect(customerModel.toJSON()).toStrictEqual(
            {
                id: "123",
                name: customer.name,
                active: customer.isActive(),
                rewardPoints: customer.rewardPoints,
                street: address.street,
                number: address.number,
                zipcode: address.zip,
                city: address.city,
        });

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("Deve atualizar um customer", async () => {
        const customerRepository = new CustomerRepository();
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler = jest.spyOn(eventHandler1, 'handle');
        const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');
        eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
        
        const customer = new Customer("123", "Customer 1");
        const customerCreatedEvent = new CustomerCreatedEvent({customer});
        eventDispatcher.notify(customerCreatedEvent);
        const address = new Address("Street 1", 1,"City 1", "Zipcode 1");
        customer.Address = address;
        await customerRepository.create(customer);

        customer.changeName("Customer 2");

        await customerRepository.update(customer);
        const customerModel2 = await CustomerModel.findOne({ where: { id: '123' } });

        expect(customerModel2.toJSON()).toStrictEqual(
            {
                id: "123",
                name: customer.name,
                active: customer.isActive(),
                rewardPoints: customer.rewardPoints,
                street: address.street,
                number: address.number,
                zipcode: address.zip,
                city: address.city,
        });

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("Deve buscar um customer", async () => {
        const customerRepository = new CustomerRepository();
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler = jest.spyOn(eventHandler1, 'handle');
        const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');
        eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

        const customer = new Customer("123", "Customer 1");
        const customerCreatedEvent = new CustomerCreatedEvent({customer});
        eventDispatcher.notify(customerCreatedEvent);
        const address = new Address("Street 1", 1,"Zipcode 1", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);
        
        const customerResult = await customerRepository.find(customer.id);
        expect(customer).toStrictEqual(customerResult);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });


    it("should throw error when customer not found", async () => {
        const customerRepository = new CustomerRepository();
        expect(async () => {
            await customerRepository.find("12fdg3");
        }).rejects.toThrow("Customer not found");
    });

    it("Deve buscar todos os produtos", async () => {     
        const customerRepository = new CustomerRepository();
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler = jest.spyOn(eventHandler1, 'handle');
        const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');
        eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

        const customer1 = new Customer("123", "Customer 1",);
        const customerCreatedEvent = new CustomerCreatedEvent({customer1});
        eventDispatcher.notify(customerCreatedEvent);

        const address1 = new Address("Street 1", 1,"Zipcode 1", "City 1");
        customer1.Address = address1;
        customer1.addRewardPoints(10);
        customer1.activate();

        
        const customer2 = new Customer("2", "Customer 2");
        const customerCreatedEvent2 = new CustomerCreatedEvent({customer2});
        eventDispatcher.notify(customerCreatedEvent2);
        const address2 = new Address("Street 2", 2,"Zipcode 2", "City 2");
        customer2.Address = address2;
        customer2.addRewardPoints(20);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);
        
        const foundCustomers = await customerRepository.findAll();
        
        expect(foundCustomers).toHaveLength(2);
        expect(foundCustomers).toContainEqual(customer1);
        expect(foundCustomers).toContainEqual(customer2);
        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });
});