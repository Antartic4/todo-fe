'use client';

import Navbar from '@/app/components/NavBar';
import TaskForm from '@/app/components/TaskForm';
import { createTask } from '@/app/utils/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateTask() {
  const router = useRouter();

  const handleCreate = async (data: { title: string; color: string }) => {
    try {
      await createTask(data);
      router.push('/');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

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

        <TaskForm onSubmit={handleCreate} submitButtonText="Add Task" />
      </div>
    </div>
  );
}
