import React from 'react';
import './Css/AdminProfile.css'; // or the path to your CSS file
import avatar8 from './../../assets/images/avatars/8.jpg'; // Import the default image

const UserView = ({ user }) => {
  return (
    <div className="user-view">
      {/* Circular Profile Photo */}
      <div className="profile-photo">
        <img src={user.profilePhoto} alt="Profile" />
      </div>
      <h1>User Details</h1>
      <div className="user-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Date of Birth:</strong> {user.date_Of_Birth}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
};

const App = () => {

  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));

  // Default user object in case localStorage data is not available
  const defaultUser = {
  
    name: `${JSON.parse(localStorage.getItem('userData'))}.name`,
    email: `${JSON.parse(localStorage.getItem('userData'))}.email`,
    gender: `${JSON.parse(localStorage.getItem('userData'))}.gender`,
    date_Of_Birth: `${JSON.parse(localStorage.getItem('userData'))}.date_of_Birth`,
    address: `${JSON.parse(localStorage.getItem('userData'))}.address`,
    age: `${JSON.parse(localStorage.getItem('userData'))}.age`,
    mobile: `${JSON.parse(localStorage.getItem('userData'))}.mobile`,
    role: `${JSON.parse(localStorage.getItem('userData'))}.profile`,
    profilePhoto:`http://127.0.0.1:8000/storage/${JSON.parse(localStorage.getItem('userData'))}.profilePhoto`, // profilePhoto is null in the default data

  };

  // Use the user data from localStorage or fallback to the default user
  const user = userData || defaultUser;

  // If profilePhoto is null, use the default avatar8 image
  user.profilePhoto = user.profilePhoto || avatar8;

  return (
    <div className="App">
      <UserView user={user} />
    </div>
  );
};

export default App;