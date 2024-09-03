import {  useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contactsOps';
import { selectContacts } from './redux/contacts.selectors';


// const dataUsers = [
//     {
//       id: 'id-1',
//       name: 'Rosie Simpson', number: '459-12-56'
//     },
//     {
//       id: 'id-2',
//       name: 'Hermione Kline', number: '443-89-12'
//     },
//     {
//       id: 'id-3',
//       name: 'Eden Clements', number: '645-17-79'
//     },
//     {
//       id: 'id-4',
//       name: 'Annie Copeland', number: '227-91-26'
//     },
// ]
function App() {
  const dispatch = useDispatch();

  
  const contacts = useSelector(selectContacts);
 
  
  useEffect(() => {
    dispatch(fetchContacts());
},[dispatch])


  // useEffect(() => {
   
  //  const savedContacts = localStorage.getItem('contacts');
  //  const parsedContact = JSON.parse(savedContacts)
  //  if (Array.isArray(parsedContact)  && parsedContact.length > 0 ) {
  //     dispatch(setContact(parsedContact));
  //   } else {
      
  //    dispatch(setContact(dataUsers));
  //   }
  // }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  },[contacts]);
  
  return (
    <div className='wrapper'>
     <h1>Phonebook</h1>
    <ContactForm />
    <SearchBox />
      <ContactList  />
</div>
  )
}

export default App
