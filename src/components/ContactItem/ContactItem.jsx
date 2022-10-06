import { ButtonDelete, Item, ItemText, Number } from './ContactItem.styled';
import PropTypes from 'prop-types';
import { getIsLoading } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const ContactItem = ({ id, index, name, phone, deleteContact }) => {
  const isLoading = useSelector(getIsLoading);
  const number = phone.replaceAll('-', '');
  const [disabledButton, setDisabledButton] = useState(null);

  return (
    <>
      <Item>
        {index + 1}.<ItemText>{name}:</ItemText>
        <Number href={`tel:${number}`}>{phone}</Number>
        <ButtonDelete
          type="button"
          disabled={isLoading && id === disabledButton}
          onClick={() => {
            setDisabledButton(id);
            return deleteContact(id);
          }}
        >
          Delete
        </ButtonDelete>
      </Item>
    </>
  );
};

ContactItem.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
