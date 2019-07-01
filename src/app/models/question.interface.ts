export interface QuestionI {
    id ?: string;
    question: string;
    answer: string;
    answered: boolean;
    liked: boolean;
    archived: boolean;
}