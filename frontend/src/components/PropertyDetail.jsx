import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/properties/${id}`)
      .then((response) => {
        setProperty(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("There was an error fetching the property details.");
        setLoading(false);
        console.error('Error fetching property details:', error);
      });
  }, [id]);

  if (loading) {
    return <p>Loading details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!property) {
    return <p>Property not found.</p>;
  }

  return (
    <div>
      <h1>{property.title}</h1>
      <p><strong>Description:</strong> {property.description}</p>
      <p><strong>Price:</strong> ${property.price}</p>
      <p><strong>Location:</strong> {property.location.address}, {property.location.city}, {property.location.state}, {property.location.zipCode}</p>
      <p><strong>Size:</strong> {property.squareFeet} square feet</p>
      <p><strong>Year Built:</strong> {property.yearBuilt}</p>
    </div>
  );
};

export default PropertyDetail;
