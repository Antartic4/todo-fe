import axios from 'axios';
import { Task } from '../types/Task';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle API Errors
const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
  throw error;
};

// Get All Tasks
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

// Get Task by Id
export const getTaskById = async (id: number): Promise<Task | undefined> => {
  try {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
  return undefined;
};

// Create a New Task
export const createTask = async (data: {
  title: string;
  color: string;
}): Promise<Task> => {
  try {
    const response = await api.post<Task>('/tasks', data);
    return response.data;
  } catch (error) {
    handleError(error);
    return null as unknown as Task;
  }
};

// Update an Existing Task
export const updateTask = async (
  id: number,
  data: { title: string; color: string; completed: boolean }
): Promise<Task> => {
  try {
    const response = await api.put<Task>(`/tasks/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
    return null as unknown as Task;
  }
};

// Delete a Task
export const deleteTask = async (id: number): Promise<void> => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    handleError(error);
  }
};
