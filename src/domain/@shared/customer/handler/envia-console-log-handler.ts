import EventHandlerInterface from "../../event/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-created.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerChangedAddressEvent> {
    handle(event: CustomerChangedAddressEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.customer.id}, ${event.eventData.customer.name} alterado para: ${event.eventData.address.street}, ${event.eventData.address.number}, ${event.eventData.address.city}, ${event.eventData.address.zip}`);
    }
}