export default class LocalStorageUtils {
    public static getUser(): User | null {
        let user: User | null = null;
        try {
            const userJson = localStorage.getItem("user");
            user = JSON.parse(userJson!);
        } catch (error) {
            console.log("No saved user")
        }
        return user;
    }
}