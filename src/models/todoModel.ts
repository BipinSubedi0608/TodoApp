import { Timestamp } from "firebase/firestore";

export interface TodoModel {
    id: string,
    title: string,
    createdAt: Timestamp,
    isHighPriority: boolean,
    isCompleted: boolean,
    completedAt?: Timestamp,
    deadline: Timestamp
}