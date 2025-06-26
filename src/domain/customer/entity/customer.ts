import Address from "../value-object/address";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";

export default class Customer extends Entity {
    private _name: string;
    private _address!: Address; 
    private _active: boolean = false
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validade();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErros());
        }
    }

    validade() {
        CustomerValidatorFactory.create().validate(this);
    }

    changeName(name: string) {
        this._name = name;
        this.validade();
    }

    activate() {
        if(this._address === undefined) {
            throw new Error('Address is required');
        }
        this._active = true;
    }

    deactive() {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    deactivate() {
        this._active = false;
    }
    
    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    set Address(address: Address) {
        this._address = address;
    }
    get name (): string { return this._name; }

    get address (): Address { return this._address; }
    
}