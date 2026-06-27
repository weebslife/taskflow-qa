'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
  error?: string;
  placeholder?: string;
}

export default function Select({
  label,
  options,
  value,
  onChange,
  id,
  error,
  placeholder = 'Select...',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, optValue: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(optValue);
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full" ref={containerRef}>
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <button
          id={selectId}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
            error
              ? 'border-rose-400'
              : isOpen
                ? 'border-teal-400 ring-2 ring-teal-100'
                : 'border-gray-300 hover:border-gray-400'
          } bg-white text-gray-900`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={error ? 'true' : 'false'}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
            {displayText}
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <ul
            role="listbox"
            aria-label={label}
            className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-100/50 py-1 max-h-60 overflow-auto animate-fade-in"
            onMouseDown={(e) => e.preventDefault()}
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  onKeyDown={(e) => handleOptionKeyDown(e, opt.value)}
                  className={`flex items-center justify-between px-3 py-2.5 text-sm cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-teal-50 text-teal-700 font-medium'
                      : 'text-gray-700 hover:bg-cream-50 hover:text-gray-900'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5 text-teal-600" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-rose-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
