// src/components/ui/Input.tsx
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`block w-full border border-gray-300 select-none rounded-lg shadow-sm py-2.5 px-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${className}`}
      {...props}
    />
  )
}
