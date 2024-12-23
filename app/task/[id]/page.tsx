'use client';

import Navbar from '@/app/components/NavBar';
import TaskForm from '@/app/components/TaskForm';
import { getTaskById, updateTask } from '@/app/utils/api';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Task } from '@/app/types/Task';

export default function EditTask() {
  const { id } = useParams();
  const router = useRouter();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await getTaskById(Number(id));
        if (fetchedTask) {
          setTask(fetchedTask);
        } else {
          setError('Task not found.');
        }
      } catch (err) {
        console.error('Error fetching task:', err);
        setError('Failed to load task. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTask();
    } else {
      setError('Task ID is missing from the URL.');
      setLoading(false);
    }
  }, [id]);

  const handleUpdate = async (data: { title: string; color: string }) => {
    if (!id) {
      setError('Task ID is missing.');
      return;
    }

    try {
      await updateTask(Number(id), {
        ...data,
        completed: task?.completed || false,
      });
      router.push('/');
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!task) {
    return <div className="text-white">Task not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1a] relative">
      {/* NavBar */}
      <Navbar />

      {/* Form Container */}
      <div className="flex-1 flex flex-col items-center px-4 mt-16">
        {/* Back Button */}
        <div className="w-3/4 max-w-4xl flex justify-start mb-6">
          <Link href="/">
            <button className="flex items-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                />
              </svg>
            </button>
          </Link>
        </div>

        {/* Task Form */}
        <TaskForm
          initialTitle={task.title}
          initialColor={task.color}
          onSubmit={handleUpdate}
          submitButtonText="Save"
        />
      </div>
    </div>
  );
}
