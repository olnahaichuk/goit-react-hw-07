import css from './Contact.module.css'
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { apiDeleteContact } from '../../redux/contacts/contactsReducer';
import { useDispatch } from 'react-redux';

const Contact = ({ contact}) => {
  const dispatch = useDispatch();

    const handleDeleteClick = () => {
    dispatch(apiDeleteContact(contact.id))
}
  return (
      <div className={css.contactWrapper}>
          <div>
        <FaUser className={ css.icon} />
             <FaPhoneAlt className={ css.icon}  />
          </div>
          <div>
             
              <p>{contact.name}</p>
              <p>{contact.number}</p>
          </div>
          <button className={css.deleteBtn}type="button" onClick ={handleDeleteClick}>Delete</button>
    </div>
  )
}

export default Contact
