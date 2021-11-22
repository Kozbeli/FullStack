describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('log in to application')
  })

  it('login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('log in').click()
  })

  describe('Login', function () {
    it('suceeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.red')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })


  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.yle.fi')
      cy.get('#create').click()
      cy.contains('test title test author')
    })

    describe('and when one blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first title',
          author: 'first author',
          url: 'www.yle.fi'
        })
      })

      it('it can be viewed in more detail', function () {
        cy.contains('first title').parent().find('button').contains('view').as('theButton')
        cy.get('@theButton').click()
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('it can be hidden', function () {
        cy.contains('first title').parent().find('button').contains('view').as('view')
        cy.get('@view').click()
        cy.contains('first title').parent().find('button').contains('cancel').as('cancel')
        cy.get('@cancel').click()
      })

      it('it can be removed', function () {
        cy.contains('first title').parent().find('button').contains('view').as('view')
        cy.get('@view').click()
        cy.contains('first title').parent().find('button').contains('remove').as('remove')
        cy.get('@remove').click()
        cy.should('not.contain', 'first title')
      })
    })

    describe('and when multiple blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first title',
          author: 'first author',
          url: 'www.yle.fi',
          likes: 4
        })
        cy.createBlog({
          title: 'second title',
          author: 'second author',
          url: 'www.iltalehti.fi',
          likes: 7
        })
        cy.createBlog({
          title: 'third title',
          author: 'third author',
          url: 'www.iltasanaomat.fi',
          likes: 11
        })
        cy.contains('first title').parent().find('button').contains('view').as('theButton')
        cy.get('@theButton').click()
        cy.contains('second title').parent().find('button').contains('view').as('theButton')
        cy.get('@theButton').click()
        cy.contains('third title').parent().find('button').contains('view').as('theButton')
        cy.get('@theButton').click()
      })

      it('they are sorted by most likes', function () {
        // cy.contains('title').should((items) => {
        //   expect(items[0].to.contain('likes 11'))
        //   expect(items[1].to.contain('likes 7'))
        //   expect(items[2].to.contains('likes 4'))
        // })
      })
    })
  })
})