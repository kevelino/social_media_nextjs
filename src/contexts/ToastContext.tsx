'use client';
import { cn } from '@/lib/cn';
import {
  CircleActionsAlertInfo,
  CircleActionsClose,
  CircleActionsSuccess,
  NotificationBell,
} from '@/svg_components';
import { SVGProps, createContext, useState } from 'react';
import { createPortal } from 'react-dom';

interface Toast {
  title: string;
  message?: string;
  duration?: number;
  type?: 'default' | 'success' | 'warning' | 'error';
}
const ToastContext = createContext<{
  toastify: ({ title, message, duration, type }: Toast) => void;
}>({ toastify: () => {} });

const colors = {
  default: {
    bg: 'bg-violet-200',
    text: 'text-violet-700',
    icon: 'stroke-violet-700',
  },
  success: {
    bg: 'bg-green-200',
    text: 'text-green-700',
    icon: 'stroke-green-700',
  },
  warning: {
    bg: 'bg-yellow-200',
    text: 'text-yellow-700',
    icon: 'stroke-yellow-700',
  },
  error: {
    bg: 'bg-pink-200',
    text: 'text-red-700',
    icon: 'stroke-red-700',
  },
};

const icons = {
  default: {
    renderComponent: (props?: SVGProps<SVGSVGElement>) => (
      <NotificationBell {...props} />
    ),
  },
  success: {
    renderComponent: (props?: SVGProps<SVGSVGElement>) => (
      <CircleActionsSuccess {...props} />
    ),
  },
  warning: {
    renderComponent: (props?: SVGProps<SVGSVGElement>) => (
      <CircleActionsAlertInfo {...props} />
    ),
  },
  error: {
    renderComponent: (props?: SVGProps<SVGSVGElement>) => (
      <CircleActionsClose {...props} />
    ),
  },
};

function ToastContextProvider({ children }: { children: React.ReactNode }) {
  const [shown, setShown] = useState(false);
  const [toast, setToast] = useState<{
    title: string;
    message: string;
    duration: number;
    type: 'default' | 'success' | 'warning' | 'error';
  }>({
    title: '',
    message: '',
    duration: 5000,
    type: 'default',
  });
  const [animation, setAnimation] = useState<'from' | 'to'>('from');

  const toastify = ({
    title,
    message = '',
    duration = 5000,
    type = 'default',
  }: Toast) => {
    setToast({ title, message, duration, type });
    setShown(true);
    setTimeout(() => setAnimation('to'), 1);
    setTimeout(() => {
      setAnimation('from');
      setTimeout(() => setShown(false), 500);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ toastify }}>
      {shown &&
        createPortal(
          <div
            className={cn(
              'transition-opacity duration-500 w-80 fixed bottom-20 md:bottom-6 right-6 p-6 rounded-xl',
              colors[toast.type].bg,
              animation === 'from' ? 'opacity-0' : 'opacity-100'
            )}
          >
            <div className="flex items-center gap-4">
              {icons[toast.type].renderComponent({
                width: 24,
                height: 24,
                className: colors[toast.type].icon,
              })}
              <h3
                className={cn('text-lg font-semibold', colors[toast.type].text)}
              >
                {toast.title}
              </h3>
            </div>
            {toast.message && (
              <p className="text-sm text-gray-700 ml-10">{toast.message}</p>
            )}
          </div>,
          document.body
        )}
      {children}
    </ToastContext.Provider>
  );
}

export { ToastContext, ToastContextProvider };