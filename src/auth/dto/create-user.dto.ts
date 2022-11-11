export class CreateUserDto {
    email?: string;
    name?: string;
    picture?: string;

    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
    }
}
