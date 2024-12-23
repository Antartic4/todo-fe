# Todo List App - Frontend

## Overview

This is the frontend application for the Todo List App, built with **Next.js**, **Tailwind CSS**, and **TypeScript**. It provides a clean, responsive UI for managing tasks.

## Features

1. **Home View**:

   - Displays all tasks with:
     - Title.
     - Checkbox to mark as Completed/Not Completed.
     - Delete button.
   - Task summary: "Tasks: X" and "Completed: Y of X".
   - Navigate to the Create Task form.
   - Edit tasks by clicking a task card.

2. **Create/Edit Task Page**:

   - Add or update a task with:
     - Title.
     - Selectable color options.
   - Save and navigate back to Home.

3. **Reusable Components**:
   - Task Cards.
   - Dynamic Forms.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Installation

1. Clone the repository:

   ```bash
   git clone todo-rjs-fe
   cd todo-rjs-fe
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   - Create a `.env.local` file:
     ```env
     NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Navigate to `http://localhost:3000` to access the app.
- Use the "Create Task" button to add new tasks or edit existing ones by clicking on their cards.

## Folder Structure

```
src/
├── components/     # Reusable UI components (e.g., Navbar, TaskCard, TaskForm)
├── pages/          # Application routes
├── styles/         # Global and Tailwind CSS styles
├── utils/          # API interaction helpers
├── types/          # TypeScript type definitions
```

## Future Improvements

- Add user authentication.
- Implement filters (e.g., by color or completion status).
- Support drag-and-drop for task reordering.
