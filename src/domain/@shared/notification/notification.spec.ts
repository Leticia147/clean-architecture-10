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

         const error3= {
            message: "Error message3",
            context: "order", 
        }
        notification.addError(error3);
        expect(notification.messages()).toBe("customer: Error message,customer: Error message2,order: Error message3");
    });

    it("should check if notification has one error", () => {
        const notification = new Notification();
        const error = {
            message: "Error message",
            context: "customer", 
        }
        notification.addError(error);
        expect(notification.hasErrors()).toBeTruthy();
    })

    it("should get all errros props", () => {
          const notification = new Notification();
        const error = {
            message: "Error message",
            context: "customer", 
        }
        notification.addError(error);
        expect(notification.getErros()).toEqual([error]);
    })
} );