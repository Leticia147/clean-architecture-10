import e from "express";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as Yup from "yup";

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {
            Yup
            .object()
            .shape({
                id: Yup.string().required("Id is required"),
                name: Yup.string().required("Name is required"),
            })
            .validateSync(
                {
                    id: entity.id,
                    name: entity.name
                }, {
                    abortEarly: false, // Collect all validation errors
                }
            );
        }catch (errors) {
            const e = errors as Yup.ValidationError;
            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: "customer",
                    message: error,
                }); 
            }
            );
        }
    }
}