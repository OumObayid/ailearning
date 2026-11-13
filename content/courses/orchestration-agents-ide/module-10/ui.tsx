import React from 'react';

export const Card: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children }) => (
  <div className={`p-5 rounded-xl border border-border bg-card flex flex-col gap-4 w-full min-w-0 max-w-full ${className}`}>
    {children}
  </div>
);

export const CardHeader: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children }) => (
  <div className={`flex flex-col gap-2 w-full min-w-0 max-w-full ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children }) => (
  <h2 className={`text-base sm:text-lg font-bold text-foreground flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full ${className}`}>
    {children}
  </h2>
);

export const CardContent: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children }) => (
  <div className={`flex flex-col gap-4 w-full min-w-0 max-w-full ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
  className?: string;
  children?: React.ReactNode;
}> = ({ variant = 'default', className = '', children }) => {
  const variantStyles = {
    default: 'bg-primary text-primary-foreground',
    outline: 'border border-border/60 text-foreground',
    secondary: 'bg-muted text-foreground',
    destructive: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
  };
  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md inline-flex items-center gap-1 shrink-0 ${variantStyles[variant] || ''} ${className}`}>
      {children}
    </span>
  );
};

export const Button: React.FC<{
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e?: any) => void;
  children: React.ReactNode;
}> = ({
  variant = 'default',
  size = 'default',
  className = '',
  disabled,
  type = 'button',
  onClick,
  children
}) => {
  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
    outline: 'border border-border bg-background hover:bg-muted text-foreground',
    secondary: 'bg-muted hover:bg-muted/80 text-foreground',
    ghost: 'hover:bg-muted text-muted-foreground',
    destructive: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm'
  };
  const sizeStyles = {
    default: 'px-4 py-2 text-sm rounded-lg',
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    lg: 'px-5 py-2.5 text-base rounded-xl'
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant] || ''} ${sizeStyles[size] || ''} ${className}`}
    >
      {children}
    </button>
  );
};
