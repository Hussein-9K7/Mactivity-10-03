// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/properties';

export const fetchProperties = () => {
  return axios.get(API_URL);
};

export const fetchPropertyById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const addProperty = (propertyData) => {
  return axios.post(API_URL, propertyData);
};

export const updateProperty = (id, propertyData) => {
  return axios.put(`${API_URL}/${id}`, propertyData);
};

export const deleteProperty = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
