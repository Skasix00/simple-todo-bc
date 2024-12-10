export type TodoItem = {
    id: number;
    text: string;
    isCompleted: boolean;
    created_at: string;
    completed_at: string | null;
}