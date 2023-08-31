'use client';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { ErrorMessage } from '@hookform/error-message';

const DevT: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false }
);

type Inputs = {
  name: string;
  age: string;
  age2: string;
};

const page = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: { name: 'defaultValues, errors and ErrorMessage component demonstration' }
  });
  console.log('🚀 ~ errors:', errors);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const onError: SubmitErrorHandler<Inputs> = (err) => console.log({ err });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label>name</label>
        <input {...register('name')} defaultValue="test" />
        <label>age</label>
        <input {...register('age', { required: '這欄位必填', maxLength: 10 })} />
        {errors.age && <p className="error">{errors.age.message}</p>}
        <label>age2</label>
        <input
          {...register('age2', {
            required: '這欄位也必填 render 吃的到 register 中的設定',
            maxLength: 10
          })}
        />
        <ErrorMessage
          errors={errors}
          name="age2"
          render={({ message }) => <p className="error">{message}</p>}
        />

        <button>送出</button>
      </form>
      <div className="isolate">
        <DevT control={control} />
      </div>
    </>
  );
};

export default page;
