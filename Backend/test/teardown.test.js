const mongoose = require('mongoose');

afterAll(() => {
  if (mongoose.connection.readyState === 1) {
    console.log('Closing MongoDB connection...');
    mongoose.connection.close();
  }
  console.log('Tests are finished, cleanup completed!');
});

it('should not run any tests here, just perform cleanup', () => {});
