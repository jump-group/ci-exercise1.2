const express = require('express');
const { expect } = require('chai');
const request = require('supertest');
const { app } = require('../src/app'); 

describe('Testing User Management System', () => {
  it('GET / responds with status 200', (done) => {
    console.log('GET / route triggered');
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });

  it('POST / adds a new user', (done) => {
    request(app)
      .post('/')
      .send({
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userAge: '30',
        userUniqueId: '4',
      })
      .expect(200)
      .end(done);
  });

  it('POST /delete deletes a user', (done) => {
    request(app)
      .post('/delete')
      .send({ userUniqueId: '1' }) // assuming userUniqueId exists in your test data
      .expect(200)
      .end(done);
  });

  it('POST /update updates a user', (done) => {
    request(app)
      .post('/update')
      .send({
        userUniqueId: '2',
        userName: 'Updated Name',
        userEmail: 'updated@example.com',
        userAge: '35',
      })
      .expect(200)
      .end(done);
  });
});

var server;

// Start the server only for testing
before((done) => {
  server = app.listen(3002, () => {
    done();
  });
});

after(() => {
  // Close server after testing
  server.close();
});
