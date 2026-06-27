'use client';

import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

interface DatePickerInputProps {
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  id?: string;
  error?: string;
  placeholderText?: string;
  isClearable?: boolean;
  minDate?: Date;
  showMonthDropdown?: boolean;
  showYearDropdown?: boolean;
}

const CustomInput = forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?: () => void; placeholder?: string }
>(({ value, onClick, placeholder }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 text-left text-sm"
  >
    <FontAwesomeIcon icon={faCalendarDays} className="w-4 h-4 text-gray-400 flex-shrink-0" />
    <span className={value ? 'text-gray-900' : 'text-gray-400'}>
      {value || placeholder || 'Select date'}
    </span>
  </button>
));

CustomInput.displayName = 'CustomInput';

export default function DatePickerInput({
  label,
  selected,
  onChange,
  id,
  error,
  placeholderText = 'Select date',
  isClearable = true,
  ...props
}: DatePickerInputProps) {
  const inputId = id || `datepicker-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <DatePicker
        selected={selected}
        onChange={onChange}
        customInput={<CustomInput placeholder={placeholderText} />}
        dateFormat="MMM d, yyyy"
        isClearable={isClearable}
        placeholderText={placeholderText}
        calendarClassName="taskflow-calendar"
        wrapperClassName="w-full"
        popperClassName="taskflow-popper"
        showPopperArrow={false}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-rose-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
