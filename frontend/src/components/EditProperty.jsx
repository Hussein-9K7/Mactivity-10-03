import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditProperty() {
  const { id } = useParams(); 
  const navigate = useNavigate();
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

  useEffect(() => {
    axios.get(`http://localhost:4000/api/properties/${id}`)
      .then(response => {
        setPropertyData(response.data);
      })
      .catch(error => {
        console.error("Error fetching property:", error);
      });
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in propertyData.location) {
      setPropertyData(prevData => ({
        ...prevData,
        location: {
          ...prevData.location,
          [name]: value
        }
      }));
    } else {
      setPropertyData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4000/api/properties/${id}`, propertyData)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error("Error updating property:", error);
      });
  };

  return (
    <div>
      <h2>Edit Property</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={propertyData.title}
          onChange={handleChange}
          required
        />
        <br />

        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={propertyData.type}
          onChange={handleChange}
          required
        />
        <br />

        <label>Description:</label>
        <textarea
          name="description"
          value={propertyData.description}
          onChange={handleChange}
          required
        />
        <br />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={propertyData.price}
          onChange={handleChange}
          required
        />
        <br />

        <h3>Location</h3>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={propertyData.location.address}
          onChange={handleChange}
          required
        />
        <br />

        <label>City:</label>
        <input
          type="text"
          name="city"
          value={propertyData.location.city}
          onChange={handleChange}
          required
        />
        <br />

        <label>State:</label>
        <input
          type="text"
          name="state"
          value={propertyData.location.state}
          onChange={handleChange}
          required
        />
        <br />

        <label>Zip Code:</label>
        <input
          type="text"
          name="zipCode"
          value={propertyData.location.zipCode}
          onChange={handleChange}
          required
        />
        <br />

        <label>Square Feet:</label>
        <input
          type="number"
          name="squareFeet"
          value={propertyData.squareFeet}
          onChange={handleChange}
          required
        />
        <br />

        <label>Year Built:</label>
        <input
          type="number"
          name="yearBuilt"
          value={propertyData.yearBuilt}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProperty;
