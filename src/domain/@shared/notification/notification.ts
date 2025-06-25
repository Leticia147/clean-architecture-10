export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private errors: NotificationErrorProps[] = [];
    
    addError(error: NotificationErrorProps): void {
        this.errors.push(error);
    }

    messages(context?: string): string {
        let message = "";
        this.errors.forEach(error => {
            if (context === undefined || error.context === context) {
                message += `${error.context}: ${error.message},`;
            }
        });
        return message.slice(0, -1); // Remove the trailing comma
    }

    hasErrors(): boolean {
        return this.errors.length > 0;
    }

    
    getErros(): NotificationErrorProps[] {
        return this.errors;
    }
}