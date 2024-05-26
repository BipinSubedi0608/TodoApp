import { User } from "firebase/auth"
import { UserDisplayDto } from "../models/userDtos"

// export function mapToFirebaseUser(userDto: UserSignUpDto): User {
//     return {
//         emailVerified: false,
//         isAnonymous: false,

//     }
// }

export function mapFromFirebaseUser(firebaseUserModel: User): UserDisplayDto {
    return {
        userId: firebaseUserModel.uid ?? "",
        profilePicture: firebaseUserModel.photoURL ?? "",
        displayName: firebaseUserModel.displayName ?? "",
        email: firebaseUserModel.email ?? ""
    }
}