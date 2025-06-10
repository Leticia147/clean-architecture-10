import Notification  from "./notification";
describe("Unit tests for Notifications", () =>{
    it("should create erros", () => {
        const notification = new Notification();
        const error = {
            message: "Error message",
            context: "customer", 
        }
        notification.addError(error);
        expect(notification.messages("customer")).toBe("customer: Error message");

         const error2= {
            message: "Error message2",
            context: "customer", 
        }
        notification.addError(error2);

        expect(notification.messages("customer")).toBe("customer: Error message,customer: Error message2");
    });
} );