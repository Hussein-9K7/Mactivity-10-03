const request = require('supertest');
const app = require('../app'); 

describe('Property API', () => {
  it('should create a new property', async () => {
    const response = await request(app)
      .post('/api/properties')
      .send({
        title: 'Test Property',
        type: 'House',
        description: 'A beautiful house',
        price: 200000,
        location: {
          address: '123 Test St',
          city: 'Test City',
          state: 'Test State',
          zipCode: '12345'
        },
        squareFeet: 1500,
        yearBuilt: 2020
      });
    
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Property');
  });

  it('should retrieve all properties', async () => {
    const response = await request(app).get('/api/properties');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a property by ID', async () => {
    const newPropertyResponse = await request(app)
      .post('/api/properties')
      .send({
        title: 'Another Property',
        type: 'Apartment',
        description: 'A nice apartment',
        price: 120000,
        location: {
          address: '456 Another St',
          city: 'Test City',
          state: 'Test State',
          zipCode: '67890'
        },
        squareFeet: 1000,
        yearBuilt: 2019
      });

    const propertyId = newPropertyResponse.body._id;
    const response = await request(app).get(`/api/properties/${propertyId}`);
    
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(propertyId);
  });

  it('should update a property', async () => {
    const newPropertyResponse = await request(app)
      .post('/api/properties')
      .send({
        title: 'Property to Update',
        type: 'Apartment',
        description: 'Update this property',
        price: 150000,
        location: {
          address: '789 Update St',
          city: 'Test City',
          state: 'Test State',
          zipCode: '54321'
        },
        squareFeet: 1200,
        yearBuilt: 2018
      });

    const propertyId = newPropertyResponse.body._id;
    const response = await request(app)
      .put(`/api/properties/${propertyId}`)
      .send({ price: 160000 });

    expect(response.status).toBe(200);
    expect(response.body.price).toBe(160000);
  });

  it('should delete a property', async () => {
    const newPropertyResponse = await request(app)
      .post('/api/properties')
      .send({
        title: 'Property to Delete',
        type: 'House',
        description: 'Delete this property',
        price: 250000,
        location: {
          address: '101 Delete St',
          city: 'Test City',
          state: 'Test State',
          zipCode: '67890'
        },
        squareFeet: 1800,
        yearBuilt: 2021
      });

    const propertyId = newPropertyResponse.body._id;
    const response = await request(app).delete(`/api/properties/${propertyId}`);
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Property deleted successfully');
  });
});
