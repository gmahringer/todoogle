/**
 * Interface for adding new Todos to the user's Google Calendar
 */
export interface Todo {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    dueDate: Date;
    creationDate: Date;
    recurrence: string;
}
