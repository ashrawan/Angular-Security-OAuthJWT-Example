export interface UserDTO {
    id: string;
    fullName: string;
    email: string;
    emailVerified: boolean;
    // password: string;
    imageUrl?: string;
    role?: string;
    phoneNumber?: string;
    registeredProviderName?: string;
    registeredProviderId?: string;
    createdAt: string;
    updatedAt?: string;
}