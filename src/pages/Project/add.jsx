import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import {addProjectApiCall} from "../../services/api/project";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  location: yup.string().required('Location is required'),
  description: yup.string().required('Description is required'),
  image: yup
    .mixed()
    .required('Image is required')
    .test('fileCount', 'Only one image is allowed', (value) => {
      console.log(value);

      return value && value.length === 1;
    })
    .test('fileSize', 'The file is too large', (value) => {
      return value && value[0]?.size <= 10 * 1024 * 1024; // 10MB size limit
    })
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value[0]?.type.startsWith('image/');
    }),
});

const AddProjectForm = () => {
  const [selectedFileName, setSelectedFileName] = useState('');
  const [file, fileChange] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  // Watch for file changes
  const imageFile = watch('image');

  // Handle file selection
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFileName(files[0].name);
      fileChange(e.target.files[0]);
    } else {
      setSelectedFileName('');
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    let requestBody = {
      name: data.name,
      description: data.description,
      location: data.location,
      picture: null,
    };

    let urlData;
    try {
      //Request Body To Pass Api
      const formData = new FormData();
      console.log(file);
      //@ts-ignore
      formData.append("file", file);
      formData.append("upload_preset", "publish_page");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dqh3wljk0/image/upload`,
        {
          method: "post",
          body: formData,
        }
      );
      urlData = await response.json();
      urlData = urlData?.url;
      console.log(urlData);

    } catch (err) {
      console.log(err);
    }
    //@ts-ignore
    requestBody.picture = urlData;

    try {
      let data = await addProjectApiCall(requestBody);
      console.log("data : ", data);

      navigate("/");

    } catch (err) {
      console.log("err : ", err);
    }
  };

return (
  <div className="mx-auto mt-8 p-6">
    <div className='font-bold text-2xl'>
      Add Project
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
      <div className="grid grid-cols-2 gap-4">
        {/* Name */}
        <div className="col-span-1">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            {...register('name')}
            className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Location */}
        <div className="col-span-1">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            {...register('location')}
            className={`w-full p-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            placeholder="Enter description"
            {...register('description')}
            className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Image Upload */}
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Image</label>
          <div
            className={`w-full p-6 border-2 border-dashed ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded text-center`}
          >
            <input
              type="file"
              {...register('image', {
                onChange: handleFileChange
              })}
              className="hidden"
              id="imageUpload"
              accept="image/*"
            />
            <label
              htmlFor="imageUpload"
              className="text-blue-600 cursor-pointer"
            >
              {selectedFileName ? (
                <div>
                  <p className="font-medium">Selected file:</p>
                  <p className="text-gray-600">{selectedFileName}</p>
                </div>
              ) : (
                'Drop here or click to upload image'
              )}
            </label>
            <p className="text-gray-500 text-sm mt-1">Max size: 10MB (Only one image allowed)</p>
          </div>
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>
      </div>

      <div className="mt-4 text-right">
        <button
          type="button"
          onClick={() => navigate("/")}
          className='border rounded border-gray-800 py-2 px-4 mr-2'
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[var(--navbar-bg)] text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
);
};

export default AddProjectForm;