import { zodResolver } from '@hookform/resolvers/zod';
import type { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { ZodObject } from 'zod';

interface Props extends PropsWithChildren {
  validationSchema: ZodObject;
  onSubmit?: (data: any) => void;
  className?: string;
  defaultValues?: Record<string, any>;
}

export default function Form(props: Props) {
  const {
    validationSchema,
    onSubmit = () => {},
    className,
    defaultValues,
  } = props;

  const methods = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}
      >
        {props.children}
      </form>
    </FormProvider>
  );
}
