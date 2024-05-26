import { Timestamp } from "firebase/firestore";
import { TodoAddDto, TodoReadDto } from "../models/todoDtos";
import { TodoModel } from "../models/todoModel";

export function mapToReadDto(todoModel: TodoModel): TodoReadDto {
    return {
        id: todoModel.id,
        title: todoModel.title,
        createdAt: todoModel.createdAt.toDate(),
        isHighPriority: todoModel.isHighPriority,
        isCompleted: todoModel.isCompleted,
        completedAt: todoModel.completedAt?.toDate() ?? undefined,
        deadline: todoModel.deadline.toDate()
    }
}

export function mapFromAddDto(todoAddDto: TodoAddDto) {
    return {
        title: todoAddDto.title,
        createdAt: new Date(),
        isHighPriority: todoAddDto.isHighPriority,
        isCompleted: false,
        completedAt: null,
        deadline: Timestamp.fromDate(todoAddDto.deadline)
    }
}