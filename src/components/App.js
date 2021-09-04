import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactList from './Contacts/ContactList';
import ContactForm from './Contacts/ContactForm';
import Filter from './Filter/Filter';
import { Title } from './Contacts/Title.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  formSubmitHandler = (name, number) => {
    if (this.state.contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts!`);
      return;
    }
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const normalizedFilter = this.state.filter.toLocaleLowerCase();
    const activeContacts = this.state.contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter),
    );

    return (
      <div>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <Title>Contacts</Title>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList contacts={activeContacts} onDeleteContacts={this.deleteContacts} />
      </div>
    );
  }
}

export default App;
