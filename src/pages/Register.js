import { useState, useEffect, useContext } from 'react';
import { Pane, TextInputField, Button } from 'evergreen-ui';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Register() {

  const { user } = useContext(UserContext);

  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ email, setEmail] = useState("");
  const [ mobileNo, setMobileNo ] = useState("");
  const [ address, setAddress ] = useState("");
  
  const [ isActive, setIsActive ] = useState(false);

  function registerUser(e) {

    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        address: address
      })
    })
    .then(res => res.json())
    .then(data => {
      
      console.log(data)

      if (data) {
        setUsername("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobileNo("");
        setAddress("");

        Swal.fire({
          title: "Registration Successful",
          icon: "success",
          text: "Welcome to Zuitt"
        });

      } else {

        Swal.fire({
          title: "Registration failed",
          icon: "error",
          text: "Check your registration details and try again"
        });
      }
    })
  }


  useEffect(() => {
    if((
      username !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      address !== "" &&
      mobileNo !== "") &&
      (mobileNo.length === 11)) {

      setIsActive(true)

    } else {
      setIsActive(false)
    }
    // dependencies
  }, [username, password, firstName, lastName, email, mobileNo, address])

  return (
    (user.id !== null) ?
    <Navigate to='/' />
    :
    <Pane display="flex" flexDirection="column" alignItems="center" padding={16}>
      <h1 className="my-5">Register</h1>

      <TextInputField
        label="Username"
        placeholder="Enter Username"
        required
        value={username}
        onChange={e => setUsername(e.target.value)}
        marginBottom={16}
        width={400}
      />

      <TextInputField
        label="Password"
        type="password"
        placeholder="Enter Password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        marginBottom={16}
        width={400}
      />

      <TextInputField
        label="First Name"
        placeholder="Enter First Name"
        required
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        marginBottom={16}
        width={400}
      />

      <TextInputField
        label="Last Name"
        placeholder="Enter Last Name"
        required
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        marginBottom={16}
        width={400}
      />

      <TextInputField
        label="Email"
        type="email"
        placeholder="Enter Your Email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        marginBottom={16}
        width={400}
      />

      <TextInputField
        label="Mobile No"
        type="number"
        placeholder="Enter 11 Digit No."
        required
        value={mobileNo}
        onChange={e => setMobileNo(e.target.value)}
        marginBottom={16}
        width={400}
      />

      <TextInputField
        label="Address"
        placeholder="Enter Address"
        required
        value={address}
        onChange={e => setAddress(e.target.value)}
        marginBottom={16}
        width={400}
      />

      {isActive ? (
        <Button appearance="primary" onClick={registerUser} marginRight={2}>
          Submit
        </Button>
      ) : (
        <Button appearance="danger" disabled>
          Submit
        </Button>
      )}

    </Pane>
  )
}