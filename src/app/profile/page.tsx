'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faListCheck,
  faClockRotateLeft,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import Card from '@/presentation/components/Card';
import Badge from '@/presentation/components/Badge';
import { useAuthContext } from '@/presentation/layouts/AuthProvider';
import { TaskUseCase } from '@/core/usecases/TaskUseCase';
import { Task } from '@/core/entities/Task';
import { isOverdue } from '@/shared/utils/helpers';

export default function ProfilePage() {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const taskUseCase = new TaskUseCase();
    const allTasks = taskUseCase.getAllTasks();
    setTasks(allTasks);
    setIsLoading(false);
  }, []);

  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
    overdue: tasks.filter((t) => isOverdue(t)).length,
  };

  const completionRate = tasks.length > 0 ? Math.round((stats.done / tasks.length) * 100) : 0;

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 text-teal-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-teal-200">
            <Image
              src="/qa-icon.webp"
              alt="Profile avatar"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500 mt-1">QA Engineer</p>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mt-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-gray-400" />
                {user.email}
              </div>
              <Badge className="bg-teal-100 text-teal-700 border-teal-200">
                Active
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FontAwesomeIcon icon={faListCheck} className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-500 mt-0.5">Total Tasks</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FontAwesomeIcon icon={faClockRotateLeft} className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600">{stats.todo}</p>
          <p className="text-xs text-gray-500 mt-0.5">To Do</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
          <p className="text-xs text-gray-500 mt-0.5">In Progress</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-600">{stats.done}</p>
          <p className="text-xs text-gray-500 mt-0.5">Done</p>
        </Card>
      </div>

      {/* Completion Rate */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Completion Rate</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-teal-500 rounded-full h-3 transition-all duration-500"
                style={{ width: `${completionRate}%` }}
                role="progressbar"
                aria-valuenow={completionRate}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${completionRate}% completion rate`}
              />
            </div>
          </div>
          <span className="text-2xl font-bold text-teal-600">{completionRate}%</span>
        </div>
        {stats.overdue > 0 && (
          <div className="mt-4 p-3 bg-rose-50 rounded-lg border border-rose-200 flex items-center gap-2">
            <FontAwesomeIcon icon={faExclamationTriangle} className="w-4 h-4 text-rose-500" />
            <span className="text-sm text-rose-700">
              {stats.overdue} task{stats.overdue > 1 ? 's' : ''} overdue
            </span>
          </div>
        )}
      </Card>

      {/* Account Info */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Name</span>
            <span className="text-sm font-medium text-gray-900">{user.name}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm font-medium text-gray-900">{user.email}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Role</span>
            <span className="text-sm font-medium text-gray-900">QA Engineer</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-500">Account Status</span>
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Active</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
