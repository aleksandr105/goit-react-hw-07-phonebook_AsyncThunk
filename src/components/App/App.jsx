import {
  Container,
  TitleLIstContacts,
  Titel,
  NoContactMessage,
} from './App.styled';
import { ContactForm } from '../ContatctForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { writeFilter } from '../../redux/filterSlice';
import { addItem, delContact } from '../../redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';

export const App = () => {
  const filter = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const handleSubmit = ({ name, number }, { resetForm }) => {
    const contact = {
      id: name,
      name: name,
      number: number.match(/\d{3}(?=\d{2,3})|\d+/g).join('-'),
    };

    const contactСheck = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );

    !contactСheck
      ? dispatch(addItem(contact))
      : alert(`${name} is alreadi in contacts`);

    resetForm();
  };

  const deleteContact = id => {
    dispatch(delContact(id));
  };

  const showFiltered = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const changeFilter = e => {
    dispatch(writeFilter(e.target.value));
  };

  const visibalFiltr = showFiltered();
  return (
    <section>
      <Container>
        <Titel>Phonebook</Titel>
        <ContactForm handleSubmit={handleSubmit} />
        <TitleLIstContacts>Contacts</TitleLIstContacts>

        {contacts.length > 0 ? (
          <>
            <Filter changeFilter={changeFilter} />
            <ContactList
              visibalFiltr={visibalFiltr}
              deleteContact={deleteContact}
            />
          </>
        ) : (
          <NoContactMessage>No contact yet</NoContactMessage>
        )}
      </Container>
    </section>
  );
};
