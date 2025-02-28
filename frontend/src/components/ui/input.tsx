import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <div className="relative flex">
        <input
          type={isPasswordVisible ? 'text' : type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background py-2 pl-5 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <button
            className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
            type="button"
            onClick={togglePasswordVisibility}
            aria-label="Toggle Password Visibility"
          >
            {isPasswordVisible ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
