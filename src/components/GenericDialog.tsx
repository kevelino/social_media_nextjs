import { useRef } from 'react';
import { AriaDialogProps, useDialog } from 'react-aria';
import { ResponsiveContainer } from './ui/ResponsiveContainer';
import Button from './ui/Button';
import SvgClose from '@/svg_components/Close';

interface GenericDialogProps extends AriaDialogProps {
  title: string;
  handleClose: () => void;
  children: React.ReactNode;
}

export function GenericDialog({
  title,
  handleClose,
  children,
  ...props
}: GenericDialogProps) {
  const dialogRef = useRef(null);
  const { dialogProps, titleProps } = useDialog(props, dialogRef);

  return (
    <div
      {...dialogProps}
      ref={dialogRef}
      className="grid h-full w-full place-items-center overflow-y-auto py-8"
    >
      <ResponsiveContainer>
        <div className="mb-6 rounded-xl bg-white">
          <div className="relative mb-4 rounded-t-xl bg-gray-100 py-4">
            <h3 {...titleProps} className="text-center text-lg font-semibold">
              {title}
            </h3>
            <div className="absolute right-3 top-[50%] translate-y-[-50%]">
              <Button
                onPress={handleClose}
                Icon={SvgClose}
                mode="ghost"
                size="small"
                className="bg-gray-200/70"
              />
            </div>
          </div>
          {children}
        </div>
      </ResponsiveContainer>
    </div>
  );
}