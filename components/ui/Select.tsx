'use client';

import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  label?: string;
  error?: string;
  options: Array<{ value: string | number; label: string }>;
  name?: string;
  required?: boolean;
  className?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
}

export default function Select({ 
  className, 
  label, 
  error, 
  options, 
  name,
  required,
  value: controlledValue,
  onChange
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(controlledValue || options[0]?.value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === selectedValue);

  const handleSelect = (value: string | number) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange?.(value);
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input type="hidden" name={name} value={selectedValue} />
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left',
            'focus:border-primary focus:ring-2 focus:ring-primary/20',
            'outline-none transition-all',
            'flex items-center justify-between',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
        >
          <span className={selectedValue ? 'text-gray-900' : 'text-gray-400'}>
            {selectedOption?.label || 'Seçiniz'}
          </span>
          <ChevronDown className={cn(
            'w-5 h-5 text-gray-400 transition-transform',
            isOpen && 'rotate-180'
          )} />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors',
                  selectedValue === option.value && 'bg-primary/5 text-primary font-medium'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
