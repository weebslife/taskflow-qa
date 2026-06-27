'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSearch,
  faPenToSquare,
  faTrashCan,
  faChevronLeft,
  faChevronRight,
  faSpinner,
  faListCheck,
  faGripVertical,
  faArrowUpAZ,
} from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import Button from '@/presentation/components/Button';
import Card from '@/presentation/components/Card';
import Badge from '@/presentation/components/Badge';
import Modal from '@/presentation/components/Modal';
import EmptyState from '@/presentation/components/EmptyState';
import DatePickerInput from '@/presentation/components/DatePickerInput';
import Select from '@/presentation/components/Select';
import { Task, TaskStatus, TaskPriority } from '@/core/entities/Task';
import { TaskUseCase } from '@/core/usecases/TaskUseCase';
import { PRIORITY_ORDER } from '@/shared/constants';
import {
  formatDate,
  isOverdue,
  getStatusColor,
  getPriorityColor,
  getStatusText,
  getPriorityText,
} from '@/shared/utils/helpers';
import { MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH, ITEMS_PER_PAGE } from '@/shared/constants';

export default function TasksPage() {
  const taskUseCase = new TaskUseCase();

  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');

  const [currentPage, setCurrentPage] = useState(1);

  const [sortMode, setSortMode] = useState<'default' | 'custom'>('default');
  const [customOrder, setCustomOrder] = useState<Record<string, string[]>>({});

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState<TaskStatus>('todo');
  const [formPriority, setFormPriority] = useState<TaskPriority>('medium');
  const [formDueDate, setFormDueDate] = useState<Date | null>(null);

  const [formErrors, setFormErrors] = useState<{ title?: string }>({});

  const loadTasks = useCallback(() => {
    const tasks = taskUseCase.getAllTasks();
    setAllTasks(tasks);
  }, []);

  useEffect(() => {
    loadTasks();
    setIsLoading(false);
  }, [loadTasks]);

  const filteredByStatus = taskUseCase.filterByStatus(allTasks, statusFilter);
  const filteredByPriority = taskUseCase.filterByPriority(filteredByStatus, priorityFilter);
  const searched = taskUseCase.searchTasks(filteredByPriority, searchQuery);

  const paginatedTasks = taskUseCase.getPaginatedTasks(searched, currentPage, ITEMS_PER_PAGE);
  const totalPages = taskUseCase.getTotalPages(searched, ITEMS_PER_PAGE);

  const pageKey = `${currentPage}-${statusFilter}-${priorityFilter}-${searchQuery}`;
  const currentCustomOrder = customOrder[pageKey] || [];

  let sortedTasks = [...paginatedTasks];

  if (sortMode === 'custom' && currentCustomOrder.length > 0) {
    sortedTasks.sort((a, b) => {
      const idxA = currentCustomOrder.indexOf(a.id);
      const idxB = currentCustomOrder.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      const priorityDiff = PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  } else {
    sortedTasks.sort((a, b) => {
      const priorityDiff = PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }

  const resetForm = () => {
    setFormTitle('');
    setFormDescription('');
    setFormStatus('todo');
    setFormPriority('medium');
    setFormDueDate(null);
    setFormErrors({});
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setFormTitle(task.title);

    setFormDescription(task.description);

    setFormStatus(task.status);
    setFormPriority(task.priority);
    setFormDueDate(task.dueDate ? new Date(task.dueDate) : null);
    setFormErrors({});
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (task: Task) => {
    setDeletingTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleCreateTask = () => {
    if (!formTitle) {
      setFormErrors({ title: 'Title is required' });
      return;
    }

    try {
      taskUseCase.createTask(
        formTitle,
        formDescription,
        formPriority,
        formStatus,
        (formDueDate || new Date()).toISOString()
      );
      loadTasks();
      setIsCreateModalOpen(false);
      resetForm();
    } catch (e: unknown) {
      const error = e as Error;
      setFormErrors({ title: error.message });
    }
  };

  const handleSaveEdit = () => {
    if (!formTitle) {
      setFormErrors({ title: 'Title is required' });
      return;
    }

    if (!editingTask) return;

    try {
      taskUseCase.updateTask(
        editingTask.id,
        formTitle,
        formDescription,
        formPriority,
        formStatus,
        (formDueDate || new Date()).toISOString()
      );
      loadTasks();
      setIsEditModalOpen(false);
      setEditingTask(null);
      resetForm();
    } catch (e: unknown) {
      const error = e as Error;
      setFormErrors({ title: error.message });
    }
  };

  const handleDeleteTask = () => {
    if (!deletingTask) return;
    taskUseCase.deleteTask(deletingTask.id);
    loadTasks();
    setIsDeleteModalOpen(false);
    setDeletingTask(null);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    if (sourceIndex === destIndex) return;

    const taskIds = sortedTasks.map((t) => t.id);
    const [movedId] = taskIds.splice(sourceIndex, 1);
    taskIds.splice(destIndex, 0, movedId);

    setCustomOrder((prev) => ({
      ...prev,
      [pageKey]: taskIds,
    }));

    setSortMode('custom');
  };

  const toggleSortMode = () => {
    if (sortMode === 'custom') {
      setSortMode('default');
      setCustomOrder({});
    } else {
      setSortMode('custom');
    }
  };

  const modalForm = (isEdit: boolean) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        isEdit ? handleSaveEdit() : handleCreateTask();
      }}
      className="space-y-4"
    >
      {/* Title */}
      <div>
        <label htmlFor={`task-title-${isEdit ? 'edit' : 'create'}`} className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-rose-500">*</span>
        </label>
        <input
          id={`task-title-${isEdit ? 'edit' : 'create'}`}
          type="text"
          placeholder="Enter task title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          maxLength={MAX_TITLE_LENGTH + 50}
          className={`w-full px-3 py-2 rounded-lg border ${
            formErrors.title ? 'border-rose-400 focus:ring-rose-500' : 'border-gray-300 focus:ring-teal-500'
          } focus:outline-none focus:ring-2 focus:border-transparent bg-white text-gray-900 placeholder-gray-400`}
          aria-invalid={formErrors.title ? 'true' : 'false'}
        />
        <div className="flex justify-between mt-1">
          {formErrors.title ? (
            <p className="text-sm text-rose-600">{formErrors.title}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-gray-400">
            {formTitle.length}/{MAX_TITLE_LENGTH}
          </span>
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor={`task-desc-${isEdit ? 'edit' : 'create'}`} className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id={`task-desc-${isEdit ? 'edit' : 'create'}`}
          placeholder="Enter task description"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          maxLength={MAX_DESCRIPTION_LENGTH}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 resize-vertical"
        />
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-400">
            {formDescription.length}/{MAX_DESCRIPTION_LENGTH}
          </span>
        </div>
      </div>

      {/* Status and Priority row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Status"
          id={`task-status-${isEdit ? 'edit' : 'create'}`}
          value={formStatus}
          onChange={(v) => setFormStatus(v as TaskStatus)}
          options={[
            { value: 'todo', label: 'To Do' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'done', label: 'Done' },
          ]}
        />
        <Select
          label="Priority"
          id={`task-priority-${isEdit ? 'edit' : 'create'}`}
          value={formPriority}
          onChange={(v) => setFormPriority(v as TaskPriority)}
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
        />
      </div>

      {/* Due Date - DatePicker */}
      <DatePickerInput
        label="Due Date"
        selected={formDueDate}
        onChange={(date) => setFormDueDate(date)}
        placeholderText="Select due date"
        isClearable={true}
      />

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2 border-t border-gray-100">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => {
            if (isEdit) {
              setIsEditModalOpen(false);
              setEditingTask(null);
            } else {
              setIsCreateModalOpen(false);
            }
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" className="w-full sm:w-auto">
          {isEdit ? 'Save Changes' : 'Create Task'}
        </Button>
      </div>
    </form>
  );

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-500 mt-1">Manage and track your QA tasks.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSortMode}
            aria-label={sortMode === 'custom' ? 'Switch to default sort' : 'Enable drag-and-drop sorting'}
            title={sortMode === 'custom' ? 'Default sort' : 'Drag to reorder'}
          >
            <FontAwesomeIcon
              icon={faArrowUpAZ}
              className={`w-4 h-4 ${sortMode === 'custom' ? 'text-teal-600' : 'text-gray-400'}`}
            />
            <span className="hidden sm:inline text-xs">
              {sortMode === 'custom' ? 'Custom' : 'Auto'}
            </span>
          </Button>
          <Button variant="primary" size="md" onClick={handleOpenCreate}>
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            <span className="hidden sm:inline">Add Task</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="w-4 h-4 text-gray-400" />
            </div>
            <input
              id="search-tasks"
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
              aria-label="Search tasks"
            />
          </div>

          {/* Status filter */}
          <div className="sm:w-44">
            <Select
              label=""
              id="filter-status"
              value={statusFilter}
              onChange={(v) => setStatusFilter(v as TaskStatus | 'all')}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'todo', label: 'To Do' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'done', label: 'Done' },
              ]}
            />
          </div>

          {/* Priority filter */}
          <div className="sm:w-44">
            <Select
              label=""
              id="filter-priority"
              value={priorityFilter}
              onChange={(v) => setPriorityFilter(v as TaskPriority | 'all')}
              options={[
                { value: 'all', label: 'All Priority' },
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Tasks count & sort mode indicator */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {sortedTasks.length} of {searched.length} tasks
        </p>
        {sortMode === 'custom' && (
          <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-full">
            Drag to reorder
          </span>
        )}
      </div>

      {/* Tasks List with Drag and Drop */}
      {sortedTasks.length === 0 ? (
        <Card>
          <EmptyState
            icon={faListCheck}
            title="No tasks found"
            description={
              searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
                ? 'No tasks match your current filters. Try adjusting your search criteria.'
                : "You haven't created any tasks yet. Get started by adding your first task!"
            }
            action={
              !searchQuery && statusFilter === 'all' && priorityFilter === 'all' ? (
                <Button variant="primary" size="sm" onClick={handleOpenCreate}>
                  <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                  Create First Task
                </Button>
              ) : undefined
            }
          />
        </Card>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="task-list">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-3"
              >
                {sortedTasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                    isDragDisabled={sortMode !== 'custom'}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`draggable-task-card bg-white rounded-xl border transition-all ${
                          snapshot.isDragging
                            ? 'border-teal-300 shadow-lg shadow-teal-100/50 scale-[1.02]'
                            : 'border-gray-100 shadow-sm'
                        }`}
                      >
                        <div className="p-4 task-card-content">
                          {/* Top row: drag handle + content + actions */}
                          <div className="flex items-start gap-3">
                            {/* Drag handle (only visible in custom mode) */}
                            {sortMode === 'custom' && (
                              <div
                                {...provided.dragHandleProps}
                                className="drag-handle mt-1"
                                aria-label="Drag to reorder"
                              >
                                <FontAwesomeIcon icon={faGripVertical} className="w-4 h-4" />
                              </div>
                            )}

                            {/* Task content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-sm font-semibold text-gray-900">
                                  {task.title}
                                </h3>
                                {isOverdue(task) && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700 border border-rose-200">
                                    Overdue
                                  </span>
                                )}
                              </div>
                              {task.description && (
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                  {task.description}
                                </p>
                              )}
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <Badge className={getStatusColor(task.status)}>
                                  {getStatusText(task.status)}
                                </Badge>
                                <Badge className={getPriorityColor(task.priority)}>
                                  {getPriorityText(task.priority)}
                                </Badge>
                                <span className="text-xs text-gray-400">
                                  Due: {formatDate(task.dueDate)}
                                </span>
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-1 flex-shrink-0 task-card-actions">
                              <button
                                onClick={() => handleOpenEdit(task)}
                                className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                                title="Edit task"
                              >
                                <FontAwesomeIcon icon={faPenToSquare} className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleOpenDelete(task)}
                                className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
                                aria-label={`Delete task: ${task.title}`}
                              >
                                <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Previous page"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  currentPage === page
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50 border border-gray-300'
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Next page"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => { setIsCreateModalOpen(false); resetForm(); }}
        title="Create New Task"
        size="lg"
      >
        {modalForm(false)}
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setEditingTask(null); resetForm(); }}
        title="Edit Task"
        size="lg"
      >
        {modalForm(true)}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setDeletingTask(null); }}
        title="Delete Task"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-gray-900">{deletingTask?.title}</span>?
            This action cannot be undone.
          </p>
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => { setIsDeleteModalOpen(false); setDeletingTask(null); }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="w-full sm:w-auto"
              onClick={handleDeleteTask}
            >
              <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
