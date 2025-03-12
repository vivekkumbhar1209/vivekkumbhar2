import React from 'react';
import './Css/AdminProfile.css'; // or the path to your CSS file
import avatar8 from './../../assets/images/avatars/8.jpg'; // Import the image

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
  const user = {
    name: "Admin User",
    email: "admin@example.com",
    gender: "Male",
    date_Of_Birth: "1980-01-20",
    address: "789 Admin Avenue, City, Country",
    age: 44,
    mobile: "9876543212",
    role: "Admin",
    profilePhoto: avatar8, // Use the imported image
  };

  return (
    <div className="App">
      <UserView user={user} />
    </div>
  );
};

export default App;