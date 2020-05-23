export default class UserAccessTypeDto {
    public id: number;
    public name: string;
    public email: string;
    public avatar: string;
    public accessType: number;

    public constructor(
        id: number,
        name: string,
        email: string,
        avatar: string,
        accessType: number
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.accessType = accessType;
    }
}