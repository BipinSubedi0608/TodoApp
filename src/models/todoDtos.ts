export interface TodoReadDto {
    id: string,
    title: string,
    createdAt: Date,
    isHighPriority: boolean,
    isCompleted: boolean,
    completedAt?: Date,
    deadline: Date
}

export interface TodoAddDto {
    title: string,
    isHighPriority: boolean,
    deadline: Date
}