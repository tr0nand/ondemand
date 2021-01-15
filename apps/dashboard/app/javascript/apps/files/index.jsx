import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { Button, Intent } from '@blueprintjs/core'
import { AppToaster } from '../toaster.ts'

const Hello = props => (
  <div>
    <h2>Hello {props.name}!</h2>
    <Button onClick={showToast} text="Click Me" />
  </div>
)

function showToast() {
  AppToaster.show({
    message: 'This is a message',
    intent: Intent.SUCCESS,
  })
}

Hello.defaultProps = {
  name: 'Mario'
}

Hello.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="Mario" />,
    document.getElementById('files').appendChild(document.createElement('div')),
  )
})
