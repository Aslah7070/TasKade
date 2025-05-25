
import { Task } from '@/types/type';
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface TaskListProps {
  task: Task;
  spaceId: string;
}

export const TaskList: React.FC<TaskListProps> = ({ task }) => {
  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: task._id,
  });

  const style:React.CSSProperties  = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: !transform ? 'transform 0.2s ease' : undefined,
    zIndex: transform ? 1000 : 'auto',
    position: transform ? 'absolute' : 'relative', 
  };

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="bg-black rounded p-2 my-2 shadow text-white"
    >
      <h3 className="font-semibold">{task.name}</h3>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <p>Description: {task.description || 'No description'}</p>
      <p>
        Due Date:{' '}
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
      </p>
    </div>
  );
};
