'use client';

import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export default function TextArea({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}: TextAreaProps) {
  const inputId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <textarea
        id={inputId}
        className={`w-full px-3 py-2 rounded-lg border ${
          error
            ? 'border-rose-400 focus:ring-rose-500'
            : 'border-gray-300 focus:ring-teal-500'
        } focus:outline-none focus:ring-2 focus:border-transparent transition-colors bg-white text-gray-900 placeholder-gray-400 resize-vertical min-h-[80px]`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-rose-600" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
