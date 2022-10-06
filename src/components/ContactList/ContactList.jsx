import { List } from './ContactList.styled';
import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';

export const ContactList = ({ visibalFiltr, deleteContact }) => {
  return (
    <List>
      {visibalFiltr
        .sort((firstName, secondName) =>
          firstName.name.localeCompare(secondName.name)
        )
        .map(({ id, name, phone }, index) => (
          <ContactItem
            key={id}
            id={id}
            name={name}
            phone={phone}
            index={index}
            deleteContact={deleteContact}
          />
        ))}
    </List>
  );
};

ContactList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  visibalFiltr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
};
