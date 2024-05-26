import { db } from "../firebase";
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { TodoAddDto, TodoReadDto } from "../models/todoDtos";
import { TodoModel } from "../models/todoModel";
import { mapFromAddDto, mapToReadDto } from "../utils/todoMapper";

export async function firebaseAddTask({ title, deadline, isHighPriority }: TodoAddDto, userId: string) {
    const taskToAdd = mapFromAddDto({ title, deadline: new Date(deadline), isHighPriority });
    const docRef = await addDoc(collection(db, "tasks"), { ...taskToAdd, userId });
    return docRef;
}

export async function firebaseGetAllTasks(userId: string): Promise<TodoReadDto[]> {
    const q = query(collection(db, "tasks"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const listOfTasks: TodoReadDto[] = [];

    querySnapshot.forEach(doc => {
        const task: TodoModel = { ...doc.data() as TodoModel, id: doc.id };
        listOfTasks.push(mapToReadDto(task));
    });
    return listOfTasks;
}

export async function firebaseDeleteTask(taskId: string) {
    await deleteDoc(doc(db, "tasks", taskId));
}

export function firebaseListenAllTask(callback: any, userId: string) {
    const q = query(collection(db, "tasks"), where("userId", "==", userId), orderBy("isHighPriority", "desc"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, callback);
    return unsubscribe;
}

export async function firebaseMarkTaskAsComplete(taskId: string) {
    try {
        await updateDoc(doc(db, "tasks", taskId), {
            isCompleted: true,
            isHighPriority: false,
            completedAt: Timestamp.fromDate(new Date())
        });
        console.log("Updated Successfully");
    } catch (e) {
        console.log("Error while updating: " + e);
    }
}
