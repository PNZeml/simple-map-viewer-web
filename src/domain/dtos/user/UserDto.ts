export default class UserDto {
    public id: number;
    public name: string;
    public email: string;
    public avatar: string;

    public constructor(id: number, name: string, email: string, avatar: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = `data:image/jpeg;base64,${avatar}`;
    }
}