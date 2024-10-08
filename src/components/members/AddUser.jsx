import * as yup from 'yup';
import Modal from "../shared/Model";
import DynamicForm from '../shared/DynamicForm';
import {sendInviteToUser} from "../../services/api/user";

const AddUserModal = ({ isOpen, onClose , projectId}) => {
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
        { value: 'officer', label: 'Officer' },
        { value: 'dealer', label: 'Dealer' },
        { value: 'contractor', label: 'Contractor' },
        { value: 'worker', label: 'Worker' },
        { value: 'architect', label: 'Architect' }
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

  const handleSubmit = async (data) => {
    console.log('Form submitted:', data);
    try{
      let res = await sendInviteToUser({...data , projectId});
      console.log({res});
    }catch(err){
      console.log(err);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Progress"
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