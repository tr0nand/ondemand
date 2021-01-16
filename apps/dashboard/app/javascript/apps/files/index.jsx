import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { Button, Intent } from '@blueprintjs/core'
import { AppToaster } from '../toaster.tsx'

export default class Files extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      files: []
    }
  }

  async componentDidMount() {
    console.log('Files component mounted')

    this.setState({ ...this.state, isLoading: false })

    await this.fetchFiles()
  }

  fileListItem(name) {
    if (!name) {
      name = "Default"
    }

    return (
      <li>
        <a href="">{name}</a>
      </li>
    )
  }

  loading() {
    this.state.isLoading = !this.state.isLoading
  }

  async fetchFiles() {
    this.loading()

    let req = await fetch('/pun/dev/dashboard/files/fs/home/ood', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(r => r.json())
      .then(this.loading())

    let { files } = req

    this.setState({
      files
    })
  }

  render() {
    return (
      <>
        <h2>Files</h2>
        <div>
          <ol>
            {this.state.files.map(x => {
              return (
                <li key={x.id}>
                  <a href="">{x.name}</a>
                </li>
              )
            })}
          </ol>
          <Button onClick={() => this.fetchFiles()} text="Load More"></Button>
        </div>
      </>
    )
  }
}

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
    <Files />,
    document.getElementById('files').appendChild(document.createElement('div')),
  )
})
