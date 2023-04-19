
export interface User {
    _id: string,
    username: string;
    password?: string;
    role: string;
    link: string;
}

export interface UserSchema {
    isLoading: boolean;
    error?: string;
    data?: User;
}