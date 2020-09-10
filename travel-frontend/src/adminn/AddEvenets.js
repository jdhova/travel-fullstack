import React, { useState } from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const AddEvenets = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  return <div></div>;
};

export default AddEvenets;
