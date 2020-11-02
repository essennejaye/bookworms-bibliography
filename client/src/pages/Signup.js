import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';
import { Button, Form } from 'react-bootstrap';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState }
      });
      Auth.login(data.addUser);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <h4>Signup</h4>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Your Username</Form.Label>
        <Form.Control
          className='form-input'
          name='username'
          id='username'
          type="text"
          placeholder="Your username"
          value={formState.username}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          className='form-input'
          name='email'
          id='email'
          type="email"
          placeholder="Enter email"
          value={formState.email}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
       </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className='form-input'
          name='password'
          id='password'
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
        />
        <Form.Text id="passwordHelpBlock" muted>
          Your password must be 8-20 characters long, contain letters and numbers, and
          must not contain spaces, special characters, or emoji.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      {error && <div>Signup failed</div>}
    </Form>
  );


  // return (
  //   <main className='flex-row justify-center mb-4'>
  //     <div className='col-12 col-md-6'>
  //       <div className='card'>
  //         <h4 className='card-header'>Sign Up</h4>
  //         <div className='card-body'>
  //           <form onSubmit={handleFormSubmit}>
  //             <input
  //               className='form-input'
  //               placeholder='Your username'
  //               name='username'
  //               type='username'
  //               id='username'
  //               value={formState.username}
  //               onChange={handleChange}
  //             />
  //             <input
  //               className='form-input'
  //               placeholder='Your email'
  //               name='email'
  //               type='email'
  //               id='email'
  //               value={formState.email}
  //               onChange={handleChange}
  //             />
  //             <input
  //               className='form-input'
  //               placeholder='******'
  //               name='password'
  //               type='password'
  //               id='password'
  //               value={formState.password}
  //               onChange={handleChange}
  //             />
  //             <button className='btn d-block w-100' type='submit'>
  //               Submit
  //             </button>
  //           </form>
  //           {error && <div>Sign up fialed!</div>}
  //         </div>
  //       </div>
  //     </div>
  //   </main>
  // );
};

export default Signup;
