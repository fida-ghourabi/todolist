import React from 'react';
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  MinusCircleIcon,
  TagIcon,
  CalendarIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
} from '@heroicons/react/24/solid';
import { isAfter, parseISO, format } from 'date-fns';

const TaskCard = ({ task, onDelete, onEdit, onStart, onComplete }) => {
  const isRunning = task.status === 'started';
  const isOverdue = isAfter(new Date(), parseISO(task.deadline));

  const getPriorityConfig = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return {
          icon: ExclamationCircleIcon,
          text: 'text-danger',
          bg: 'bg-danger bg-opacity-10',
        };
      case 'medium':
        return {
          icon: ExclamationTriangleIcon,
          text: 'text-warning',
          bg: 'bg-warning bg-opacity-10',
        };
      case 'low':
        return {
          icon: MinusCircleIcon,
          text: 'text-success',
          bg: 'bg-success bg-opacity-10',
        };
      default:
        return {
          icon: MinusCircleIcon,
          text: 'text-secondary',
          bg: 'bg-light',
        };
    }
  };

  const priorityConfig = getPriorityConfig(task.priority);
  const PriorityIcon = priorityConfig.icon;

  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-body d-flex flex-column gap-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-center gap-3">
            <input
              type="checkbox"
              checked={task.status === 'completed'}
              onChange={() => onComplete(task.id)}
              className="form-check-input"
            />
            <h5
              className={`mb-0 ${task.status === 'completed' ? 'text-decoration-line-through text-muted' : ''}`}
            >
              {task.description}
            </h5>
          </div>

          <div className="d-flex gap-2">
            {task.status !== 'completed' && (
              <button
                onClick={() => onStart(task.id)}
                className="btn btn-icon btn-outline-primary"
                title={isRunning ? 'Pause task' : 'Start task'}
              >
                {isRunning ? <PauseIcon width={20} height={20} /> : <PlayIcon width={20} height={20} />}
              </button>
            )}
            <button
              onClick={() => onEdit(task.id)}
              className="btn btn-icon btn-outline-secondary"
              title="Edit task"
            >
              <PencilIcon width={20} height={20} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="btn btn-icon btn-outline-danger"
              title="Delete task"
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="d-flex flex-wrap gap-2">
          {/* Priority Badge */}
          <span className={`badge ${priorityConfig.bg} ${priorityConfig.text} d-flex align-items-center gap-1`}>
            <PriorityIcon width={16} height={16} />
            {task.priority}
          </span>

          {/* Tag Badge */}
          <span className="badge bg-primary text-white d-flex align-items-center gap-1">
            <TagIcon width={16} height={16} />
            {task.tag}
          </span>

          {/* Deadline Badge */}
          <span
            className={`badge d-flex align-items-center gap-1 ${
              isOverdue ? 'bg-danger text-white' : 'bg-light text-dark border'
            }`}
          >
            <CalendarIcon width={16} height={16} />
            {format(parseISO(task.deadline), 'MMM d, yyyy')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
