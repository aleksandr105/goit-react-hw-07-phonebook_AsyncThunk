import {
  Container,
  TitleLIstContacts,
  Titel,
  NoContactMessage,
} from './App.styled';
import { useEffect } from 'react';
import { ContactForm } from '../ContatctForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { writeFilter } from '../../redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, addContact, removeContact } from 'redux/operations';
import {
  getContacts,
  getStatusFilter,
  getIsLoading,
  getError,
} from 'redux/selectors';
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const filter = useSelector(getStatusFilter);
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleSubmit = ({ name, number }, { resetForm }) => {
    const contactСheck = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );

    if (!contactСheck) {
      const contact = {
        name: name,
        number: number.match(/\d{3}(?=\d{2,3})|\d+/g).join('-'),
      };

      dispatch(addContact(contact));

      resetForm();
    } else {
      toast.error(`${name} is alreadi in contacts`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const deleteContact = id => {
    dispatch(removeContact(id));
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
        <ToastContainer />
        <Titel>Phonebook</Titel>
        <ContactForm handleSubmit={handleSubmit} />
        <TitleLIstContacts>Contacts</TitleLIstContacts>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ClipLoader
            color={'#d63636'}
            loading={isLoading && contacts.length !== 0}
            size={40}
          />
        </div>

        {contacts.length > 0 ? (
          <>
            <Filter changeFilter={changeFilter} />
            <ContactList
              visibalFiltr={visibalFiltr}
              deleteContact={deleteContact}
            />
          </>
        ) : (
          <NoContactMessage>
            {isLoading && !error ? (
              <ClipLoader
                color={'#d63636'}
                loading={isLoading && !error}
                size={100}
              />
            ) : (
              'No contact yet'
            )}
          </NoContactMessage>
        )}
      </Container>
    </section>
  );
};
