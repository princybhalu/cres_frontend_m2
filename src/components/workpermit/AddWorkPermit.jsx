import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";
import {addProgessOfProject} from "../../services/api/project";
import { useSelector } from "react-redux";

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  image: yup
    .mixed()
    .required('At least one image is required')
    .test('fileCount', 'You can upload up to 5 images', (value) => {
      return value && value.length > 0 && value.length <= 5;
    })
    // .test('fileSize', 'Each file must be less than 10MB', (value) => {
    //   // return value && value.every(file => file.size <= 10 * 1024 * 1024); // 10MB size limit
    // })
    // .test('fileType', 'Only image files are allowed', (value) => {
    //   // return value && value.every(file => file.type.startsWith('image/'));
    // }),
});

const AddProgressForm = ({onClose}) => {
  const {projectId} = useParams();
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [files, setFiles] = useState([]);
  const user1 = useSelector((state) => state.user.user);
  const user = {...user1};

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
  const imageFiles = watch('image');

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files && files.length > 0) {
      setSelectedFileNames(files.map(file => file.name));
      setFiles(files);
    } else {
      setSelectedFileNames([]);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    let requestBody = {
      title: data.title,
      description: data.description,
      due_date: data.dueDate,
      media: [],
      type: "workpermit",
      user_id: user.id
    };

    let urls = [];
    try {
      // Request Body To Pass Api
      for (const file of files) {
        const formData = new FormData();
        console.log(file);
        formData.append("file", file);
        formData.append("upload_preset", "publish_page");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dqh3wljk0/image/upload`,
          {
            method: "post",
            body: formData,
          }
        );
        const urlData = await response.json();
        urls.push(urlData?.url);
      }
      console.log(urls);

    } catch (err) {
      console.log(err);
    }

    requestBody.media = urls;

    try {
      let data = await addProgessOfProject(requestBody , projectId);
      console.log("data : ", data);

      navigate("/project/"+ projectId + "/workpermit");
      onClose();

    } catch (err) {
      console.log("err : ", err);
    }
  };

  return (
    <div className="mx-auto px-6 pb-6">
      <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
        <div className="grid grid-cols-2 gap-4">
          {/* Title */}
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              {...register('title')}
              className={`w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
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
            <label className="block text-gray-700 mb-2">Images</label>
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
                multiple
              />
              <label
                htmlFor="imageUpload"
                className="text-blue-600 cursor-pointer"
              >
                {selectedFileNames.length > 0 ? (
                  <div>
                    <p className="font-medium">Selected files:</p>
                    <ul className="text-gray-600">
                      {selectedFileNames.map((fileName, idx) => (
                        <li key={idx}>{fileName}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  'Drop here or click to upload images'
                )}
              </label>
              <p className="text-gray-500 text-sm mt-1">Max size: 10MB per file (Up to 5 images allowed)</p>
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

export default AddProgressForm;
