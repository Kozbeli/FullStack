import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('content rendering', () => {
  let component
  let blog
  let mockHandler
  let user

  beforeEach(() => {
    blog = {
      title: 'This is a Test Title',
      author: 'Test Author',
      url: 'www.yle.fi',
      likes: 0,
      user: {
        username: 'tester'
      }
    }

    user = {
      username: 'tester'
    }

    mockHandler = jest.fn()

    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    component = render(
      <Blog blog={blog} user={user} toggleImportance={mockHandler} />
    )
  })


  // tehtävä 5.13
  test('renders content', () => {

    // const button = component.container.querySelector('button')
    // console.log(prettyDOM(button))

    // tapa 1
    expect(component.container).toHaveTextContent(
      'Test Author'
    )

    // tapa 2
    const element = component.getByText(
      'This is a Test Title Test Author'
    )
    expect(element).toBeDefined()
    expect(element).not.toHaveTextContent(
      'www.yle.fi'
    )
    expect(element).not.toHaveTextContent(
      'likes'
    )

    // tapa 3
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'This is a Test Title'
    )
  })

  // tehtävä 5.14 & 5.15
  test('clicking the view reveals more information', async () => {

    const button = component.container.querySelector('.view')
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(0)

    // component.debug()

    expect(component.container).toHaveTextContent(
      'www.yle.fi'
    )

    expect(component.container).toHaveTextContent(
      'likes'
    )

    // console.log(prettyDOM(button))

    // expect(mockHandler.mock.calls).toHaveLength(1)
  })

  // tehtävä 5.15
  test('ammount of clicks can be tracked', () => {

    const component = render(
      <Blog blog={blog} user={user} updateBlog={mockHandler} />
    )

    const button = component.container.querySelector('.view')
    fireEvent.click(button)

    const likeButton = component.container.querySelector('.like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})