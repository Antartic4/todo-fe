'use client';

import { useState } from 'react';

interface TaskFormProps {
  initialTitle?: string;
  initialColor?: string;
  onSubmit: (data: { title: string; color: string }) => Promise<void>;
  submitButtonText: string;
}

export default function TaskForm({
  initialTitle = '',
  initialColor = '#FF3B30',
  onSubmit,
  submitButtonText,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit({ title, color });
  };

  return (
    <form
      className="w-3/4 max-w-4xl flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      {/* Title Field */}
      <div className="flex flex-col gap-3 w-full">
        <label htmlFor="title" className="text-sm font-bold text-[#4ea8de]">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex. Brush your teeth"
          className="w-full p-4 bg-neutral-800 border border-[#333] rounded-lg text-white text-sm"
        />
      </div>

      {/* Color Picker */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-sm font-bold text-[#4ea8de]">Color</label>
        <div className="flex gap-4">
          {[
            '#FF3B30',
            '#FF9500',
            '#FFCC00',
            '#34C759',
            '#007AFF',
            '#5856D6',
            '#AF52DE',
            '#FF2D55',
            '#A2845E',
          ].map((colorOption) => (
            <button
              key={colorOption}
              type="button"
              className="w-12 h-12 rounded-full"
              style={{
                backgroundColor: colorOption,
                border: color === colorOption ? '3px solid white' : 'none',
              }}
              onClick={() => setColor(colorOption)}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-[#1e6f9f] text-white font-bold rounded-lg hover:bg-[#255d7f] flex items-center justify-center gap-2"
      >
        {submitButtonText === 'Add Task' ? (
          <>
            Add Task
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
          </>
        ) : (
          <>
            Save
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
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
