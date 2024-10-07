import * as yup from 'yup';
import Modal from "../shared/Model";
import DynamicForm from '../shared/DynamicForm';

const AddUserModal = ({ isOpen, onClose }) => {
  const validationSchema = yup.object().shape({
    role: yup.string().required('Role is required'),
    email: yup.string().email('Invalid email').required('Email is required')
  });

  const fields = [
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
        { value: 'manager', label: 'Manager' }
      ]
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter email address'
    }
  ];

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add User"
      size="md"
    >
      <DynamicForm
        fields={fields}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        submitText="Submit"
      />
    </Modal>
  );
};

export default AddUserModal;