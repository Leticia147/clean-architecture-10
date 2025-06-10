export type NotificationError = {
    message: string;
    context: string;
}

export default class Notification {
    private errors: NotificationError[] = [];
    
    addError(error: NotificationError): void {
        this.errors.push(error);
    }

    messages(context: string): string {
        let message = "";
        this.errors.forEach(error => {
            if (error.context === context) {
                message += `${error.context}: ${error.message},`;
            }
            
        });
        return message.slice(0, -1); // Remove the trailing comma
    }
}