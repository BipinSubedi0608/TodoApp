export interface UserSignInDto {
    email: string,
    password: string
}

export interface UserSignUpDto {
    displayName: string,
    email: string,
    password: string,
}

export interface UserDisplayDto {
    userId: string
    profilePicture: string,
    displayName: string,
    email: string,
}