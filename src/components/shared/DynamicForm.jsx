import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const DynamicForm = ({ 
  fields, 
  validationSchema, 
  onSubmit, 
  submitText = 'Submit',
  className = ''
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const renderField = (field) => {
    const commonClasses = `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field.name] ? 'border-red-500' : 'border-gray-300'
    }`;

    switch (field.type) {
      case 'select':
        return (
          <select
            {...register(field.name)}
            className={commonClasses}
          >
            <option value="">{field.placeholder || `Select ${field.label}`}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            {...register(field.name)}
            placeholder={field.placeholder}
            className={`${commonClasses} min-h-[100px]`}
          />
        );

      default:
        return (
          <input
            type={field.type || 'text'}
            {...register(field.name)}
            placeholder={field.placeholder}
            className={commonClasses}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className={field.containerClassName}>
            {field.label && (
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            {renderField(field)}
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-500">
                {errors[field.name].message}
              </p>
            )}
          </div>
        ))}

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {submitText}
          </button>
        </div>
      </div>
    </form>
  );
};

export default DynamicForm;