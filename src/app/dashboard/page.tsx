'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListCheck,
  faClockRotateLeft,
  faExclamationTriangle,
  faCheckCircle,
  faArrowRight,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import Card from '@/presentation/components/Card';
import Badge from '@/presentation/components/Badge';
import { TaskUseCase } from '@/core/usecases/TaskUseCase';
import { Task } from '@/core/entities/Task';
import { DashboardStats } from '@/shared/types';
import { formatDate, isOverdue, getStatusColor, getPriorityColor } from '@/shared/utils/helpers';
import { useAuthContext } from '@/presentation/layouts/AuthProvider';

export default function DashboardPage() {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const taskUseCase = new TaskUseCase();
    const allTasks = taskUseCase.getAllTasks();
    setTasks(allTasks);
    setIsLoading(false);
  }, []);

  const stats: DashboardStats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
    overdue: tasks.filter((t) => isOverdue(t)).length,
  };

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 text-teal-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name || 'QA Tester'}
        </h1>
        <p className="text-gray-500 mt-1">Here's your task overview today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faListCheck} className="w-5 h-5 text-teal-600" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">To Do</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{stats.todo}</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faClockRotateLeft} className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.inProgress}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Done</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.done}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Overdue Alert */}
      {stats.overdue > 0 && (
        <Card className="p-4 border-rose-200 bg-rose-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-rose-200 rounded-full flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faExclamationTriangle} className="w-4 h-4 text-rose-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-rose-800">
                {stats.overdue} task{stats.overdue > 1 ? 's' : ''} {stats.overdue > 1 ? 'are' : 'is'} overdue
              </p>
              <p className="text-xs text-rose-600 mt-0.5">
                Please review and update these tasks as soon as possible.
              </p>
            </div>
            <Link
              href="/dashboard/tasks"
              className="text-sm font-medium text-rose-700 hover:text-rose-800 underline"
            >
              View tasks
            </Link>
          </div>
        </Card>
      )}

      {/* Recent Tasks */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
          <Link
            href="/dashboard/tasks"
            className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1"
          >
            View all
            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
          </Link>
        </div>

        {recentTasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No tasks yet. Create your first task!</p>
            <Link
              href="/dashboard/tasks"
              className="inline-block mt-2 text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              Go to Tasks
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Due: {formatDate(task.dueDate)}
                    {isOverdue(task) && (
                      <span className="text-rose-500 ml-1 font-medium">(Overdue)</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge className={getStatusColor(task.status)}>
                    {task.status === 'in_progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
