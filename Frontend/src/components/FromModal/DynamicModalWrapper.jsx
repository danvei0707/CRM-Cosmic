import { useState } from 'react';
import { DynamicFormModal } from './DynamicFormModal';
import { EditButton } from '../buttons/EditButton.jsx';
import { StyleButtonCreate } from '../buttons/StyleButtonCreate.jsx';

export const DynamicModalWrapper = ({ title, fields, schema, onSubmit, buttonText, dynamicIdModal, StyleButton, customModalSize }) => {
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const handleClickOpen = () => {
    const initialFormValues = {};
    fields.forEach(field => {
      initialFormValues[field.name] = field.defaultValue || '';
    });
    setInitialValues(initialFormValues);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {StyleButton.action === 'create' ? 
      <StyleButtonCreate StyleButton={StyleButton} onClick={handleClickOpen} />
      : <EditButton onClick={handleClickOpen} />
      }
      <DynamicFormModal
        show={showModal}
        onClose={handleCloseModal}
        title={title}
        fields={fields}
        schema={schema}
        onSubmit={onSubmit} 
        buttonText={buttonText}
        dynamicIdModal={dynamicIdModal}
        initialValues={initialValues}
        resetFormValues={() => setInitialValues({})}
        customModalSize={customModalSize} 
      />
    </>
  );
};
