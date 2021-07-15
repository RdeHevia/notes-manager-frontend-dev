/* eslint-disable no-undef */

describe('Note app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021');
  });

  it('login form can be opened', function() {
    cy.contains('login').click();
  });

  it('user can log in', function() {
    cy.contains('login').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('salainen');
    cy.get('#login-button').click();

    cy.contains('Matti Luukkainen logged-in');
  });

  it('login fails with wrong password', function() {
    cy.contains('login').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'border-style', 'solid');
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' });
    });

    it('a new note can be created', function() {
      setTimeout(function () {
        cy.get('button').contains('new note').click();
        cy.get('#new_note').type('a note created by cypress');
        cy.contains('save').click();
        cy.contains('a note created by cypress');
      }, 2000);
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'another note cypress', important: false });
      });

      it('it can be made important', function () {
        // ...
      });
    });
  });
});