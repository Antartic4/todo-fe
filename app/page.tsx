'use client';

import { useEffect, useState } from 'react';
import { getTasks, updateTask, deleteTask } from '@/app/utils/api';
import Navbar from './components/NavBar';
import TaskCard from './components/TaskCard';
import { Task } from '@/app/types/Task';
import Link from 'next/link';

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const taskCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;

  const toggleTaskCompletion = async (task: Task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      const result = await updateTask(task.id, updatedTask);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? result : t)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const sortedTasks = [...tasks].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1a] relative">
      {/* NavBar */}
      <Navbar />

      {/* Create Task Button */}
      <div className="flex justify-center -mt-7">
        <div className="w-3/4 max-w-4xl">
          <Link href="/task/create">
            <button className="w-full py-4 bg-[#1e6f9f] text-white font-bold text-xl rounded-lg shadow-md hover:bg-[#255d7f]">
              <div className="flex gap-2 justify-center">
                <h1>Create Task</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 mt-8">
        {/* Task Summary */}
        <div className="w-3/4 max-w-4xl flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-[#4ea8de]">Tasks</p>
            <div className="px-3 py-1 rounded-full bg-[#333]">
              <p className="text-xs font-bold text-white">{taskCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-[#8284fa]">Completed</p>
            <div className="px-3 py-1 rounded-full bg-[#333]">
              <p className="text-xs font-bold text-white">
                {completedCount}
                {taskCount > 0 ? ` of ${taskCount}` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Task List */}
        {loading ? (
          <p className="text-lg text-white">Loading...</p>
        ) : taskCount === 0 ? (
          <div className="flex flex-col w-3/4 items-center justify-center gap-4 py-16 border-t border-[#333] rounded-lg">
            <p className="text-base text-center pt-1 text-[#808080]">
              You don&apos;t have any tasks registered yet.
            </p>
            <p>Create tasks and organize your to-do items.</p>
          </div>
        ) : (
          <div className="w-3/4 max-w-4xl flex flex-col gap-4 pb-20">
            {sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTaskCompletion}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
