import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { createAlbumRequest } from 'src/services/album/action';
import { IAlbum } from 'src/services/album/types';
import { Loading } from 'src/components';
import { useHistory } from 'react-router';

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  isBest: yup.bool(),
}).required();


const FormCreate: React.FC<{}> = () => {
  const { register, handleSubmit, formState:{ errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();
  
  const onSubmit = (data: IAlbum) => {
    if (data.title) {
      setLoading(true);
      dispatch(createAlbumRequest(data, () => {
        setLoading(false);
        history.push('/');
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="h-screen">
        <div className="grid grid-cols-1 gap-6 shadow-lg rounded p-8 relative">
          <div className="block">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an album</h2>
          </div>
          <div className="block">
            <span className="text-gray-700">Title</span>
            <input
              {...register("title")}
              type="text"
              className={`mt-1 block w-full rounded-md bg-gray-100 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-gray-500'} focus:bg-white focus:ring-0`}
              placeholder="Title"
            />
            <p className="text-red-500 capitalize mt-2">{errors.title?.message}</p>
          </div>
          <div className="block">
            <span className="text-gray-700">Description</span>
            <textarea {...register("description")} placeholder="Description" className={`mt-1 block w-full rounded-md bg-gray-100 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-gray-500'} focus:bg-white focus:ring-0`} />
          </div>
          <div className="block">
            <span className="text-gray-700">Best</span>
            <label className="flex items-center mt-3">
              <input {...register('isBest')} type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
            </label>
          </div>
          <div className="block">
            <button type="submit" className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 hover:bg-gray-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
              Add to List
            </button>
          </div>
          {
            loading && <Loading />
          }
        </div>
      </div>
    </form>
  )
}

export default FormCreate;
