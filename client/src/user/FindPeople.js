import React, { Component } from 'react';
import { findPeople, getAllUser} from './apiUser';
import DefaultProfile from '../images/avatar.png';
import { isAuthenticate } from '../auth';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Redirect } from 'react-router-dom';
import { AiFillMail } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      error: '',
      pseudoTable: [],
      emailTable: [],
      researchType: "pseudo",
      redirect: false,
      id_redirect: undefined
    };
  }

  componentDidMount() {
    const userId = isAuthenticate().user._id;
    const token = isAuthenticate().token;
    var pseudoTable = [];
    var emailTable = [];
    getAllUser().then(users => (users.forEach((user) => {
      pseudoTable.push({id: user._id, name: user.about.pseudo});
      emailTable.push({id: user._id, name: user.auth.email})
    }),
    this.setState({pseudoTable: pseudoTable}),
    this.setState({emailTable: emailTable})

    ))


  }

  setSearchToEmail = e => {
    e.preventDefault();
    this.setState({researchType: "email"})
  };

  setSearchToPseudo = e => {
    e.preventDefault();
    this.setState({researchType: "pseudo"})
  };

  render() {

  const {pseudoTable, emailTable}= this.state
  console.log("users vaut " + JSON.stringify(pseudoTable))
  const handleOnSearch = (string, cached) => {
    // onSearch returns the string searched and if
    // the values are cached. If the values are cached
    // "cached" contains the cached values, if not, returns false
    console.log(string, cached)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
    this.setState({id_redirect: item.id})
    this.setState({redirect: true})
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

    const {open, followMessage, redirect, id_redirect, researchType } = this.state;
    if (researchType === "pseudo") var users = pseudoTable
    if (researchType === "email") var users = emailTable
    if (redirect) return <Redirect to={`/user/${id_redirect}`} />;
    return (
      <div>
          <div className='jumbotron'>
            <h2 className='mt-5 mb-5'>Find your friends</h2>
          </div>
          <div>
          <button className='btn btn-raised btn-primary' onClick= {this.setSearchToPseudo}>
          <FaUserCircle />
          </button>
          <button className='btn btn-raised btn-primary' onClick= {this.setSearchToEmail}>
          <AiFillMail />
          </button>
          </div>
          <div className='container'>
            <div style={{ width: 400 }}>
              <ReactSearchAutocomplete
                items={users}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
              />
            </div>

      </div>
      </div>
    );
  }
}

export default Users;
