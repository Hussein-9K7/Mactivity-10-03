import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/properties')
      .then(response => {
        setProperties(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("There was an error fetching properties.");
        setLoading(false);
        console.error(error);
      });
  }, []);

  const handleDelete = (propertyId) => {
    axios.delete(`http://localhost:4000/api/properties/${propertyId}`)
      .then(() => {
        setProperties(properties.filter(property => property._id !== propertyId));
      })
      .catch(error => {
        console.error("There was an error deleting the property:", error);
      });
  };

  const handleEdit = (propertyId) => {
    navigate(`/edit/${propertyId}`);
  };

  const handleView = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (properties.length === 0) {
    return <div>No properties available.</div>;
  }

  return (
    <div>
      <h2>Property List</h2>
      <ul>
        {properties.map(property => (
          <li key={property._id}>
            <div>
              <h3>{property.title}</h3>
              <p>{property.description}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(property._id)}>Edit</button>
              <button onClick={() => handleDelete(property._id)}>Delete</button>
              <button onClick={() => handleView(property._id)}>View</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;
