import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export const Button = ({ children, className = '', ...props }: ButtonProps) => {
  const defaultStyles =
    'w-full cursor-pointer flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-[#00ABE4] to-[#0096c7] hover:from-[#0096c7] hover:to-[#00ABE4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00ABE4] transition-all duration-300'

  return (
    <button
      type="submit"
      className={`${defaultStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
