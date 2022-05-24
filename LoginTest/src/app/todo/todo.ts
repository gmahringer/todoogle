export interface Todo {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    dueDate: Date;
    creationDate: Date;
    recurrence: string;
}
