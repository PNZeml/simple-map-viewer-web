export default interface UserDto {
    id: number;
    // User's properties
    name: string;
    email: string;
    avatar: string;
    // Viewport properties
    x: number;
    y: number;
    width: number;
    height: number;
    color: number; // Color in integer representation
}