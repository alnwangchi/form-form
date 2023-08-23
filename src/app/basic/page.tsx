'use client';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import dynamic from 'next/dynamic';

const DevT: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false }
);

type Inputs = {
  example: string;
  exampleRequired: string;
  array: string[];
  name: {
    first: string;
    last: string;
  };
};

const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isDirty, isValid }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const onError: SubmitErrorHandler<Inputs> = (err) => console.log({ err });

  // console.log(watch(['example', 'exampleRequired']));

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label>Example</label>
        <input {...register('example')} defaultValue="test" />
        <label>ExampleRequired</label>
        <input {...register('exampleRequired', { required: true, maxLength: 10 })} />
        {errors.exampleRequired && <p className="error">This field is required</p>}
        <label>name 1</label>
        <input {...register('name.first')} defaultValue="Allen" />
        <label>name 1</label>
        <input {...register('name.last')} defaultValue="Wang" />
        <label>array 1</label>
        <input {...register('array.0')} defaultValue="123" />
        <label>array 2</label>
        <input {...register('array.1')} defaultValue="456" />
        {/* <input type="submit" /> */}

        <button disabled={!isDirty || !isValid}>送出</button>
        <button onClick={() => reset()}>reset</button>
      </form>
      <div className="isolate">
        <DevT control={control} />
      </div>
    </>
  );
};

export default page;
