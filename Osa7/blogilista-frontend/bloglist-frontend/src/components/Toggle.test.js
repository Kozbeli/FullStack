import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    const user = {
      username: 'tester'
    }

    window.localStorage.setItem(
      'loggedBloglistUser', JSON.stringify(user)
    )

    component = render(
      <Togglable buttonLabel="view">
        <div className="testDiv" />
      </Togglable>
    )

  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const closeButton = component.getByText('cancel')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

})