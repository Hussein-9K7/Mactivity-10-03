import React, { useState } from 'react';
import { addProperty } from '../api';
import { useNavigate } from 'react-router-dom';

const PropertyForm = () => {
  const [propertyData, setPropertyData] = useState({
    title: '',
    type: '',
    description: '',
    price: '',
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    squareFeet: '',
    yearBuilt: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty(propertyData)
      .then((response) => {
        console.log('Property added:', response.data);
        navigate('/');  
      })
      .catch((error) => {
        console.error('Error adding property:', error);
      });
  };

  return (
    <div className="form-container">
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={propertyData.title}
          onChange={handleChange}
          required
        />

        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={propertyData.type}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={propertyData.description}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={propertyData.price}
          onChange={handleChange}
          required
        />

        <h3>Location</h3>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={propertyData.location.address}
          onChange={handleLocationChange}
          required
        />

        <label>City:</label>
        <input
          type="text"
          name="city"
          value={propertyData.location.city}
          onChange={handleLocationChange}
          required
        />

        <label>State:</label>
        <input
          type="text"
          name="state"
          value={propertyData.location.state}
          onChange={handleLocationChange}
          required
        />

        <label>Zip Code:</label>
        <input
          type="text"
          name="zipCode"
          value={propertyData.location.zipCode}
          onChange={handleLocationChange}
          required
        />

        <label>Square Feet:</label>
        <input
          type="number"
          name="squareFeet"
          value={propertyData.squareFeet}
          onChange={handleChange}
          required
        />

        <label>Year Built:</label>
        <input
          type="number"
          name="yearBuilt"
          value={propertyData.yearBuilt}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default PropertyForm;
