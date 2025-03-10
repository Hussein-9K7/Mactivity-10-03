import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PropertyView() {
  const { id } = useParams(); 
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/properties/${id}`)
      .then(response => {
        setProperty(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("There was an error fetching property details.");
        setLoading(false);
        console.error(error);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!property) {
    return <div>Property not found.</div>;
  }

  return (
    <div>
      <h2>Property Details</h2>
      <div>
        <h3>{property.title}</h3>
        <p><strong>Type:</strong> {property.type}</p>
        <p><strong>Description:</strong> {property.description}</p>
        <p><strong>Price:</strong> {property.price}</p>
        <h4>Location:</h4>
        <p>{property.location.address}, {property.location.city}, {property.location.state}, {property.location.zipCode}</p>
        <p><strong>Square Feet:</strong> {property.squareFeet}</p>
        <p><strong>Year Built:</strong> {property.yearBuilt}</p>
      </div>
    </div>
  );
}

export default PropertyView;
