export interface ServerResponse<T> {
    result: boolean;
    response: T;
    error?: string;
}