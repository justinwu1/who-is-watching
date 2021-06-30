import React, { Component } from 'react'
import Axios from 'axios'
import './App.css'
export default class App extends Component {
  state = { angieStatus: false, justinStatus: false, greysonStatus: false }
  async componentDidMount() {
    const res = await Axios.get('http://localhost:5000/status')
    const justinStatus = res.data[0].status
    const angieStatus = res.data[1].status
    const greysonStatus = res.data[2].status
    this.setState({ angieStatus, justinStatus, greysonStatus })
  }
  lowerFirstLetter = (string) => {
    return string.charAt(0).toLowerCase() + string.slice(1)
  }
  updateStatus = async (isWatching, name) => {
    if (isWatching === 'Watching') {
      await Axios.post(`http://localhost:5000/status/update/${name}`, {
        status: true,
      })
      // eslint-disable-next-line no-useless-computed-key
      name = this.lowerFirstLetter(name) + 'Status'
      this.setState({ [name]: true })
      return
    }
    await Axios.post(`http://localhost:5000/status/update/${name}`, {
      status: false,
    })
    // eslint-disable-next-line no-useless-computed-key
    name = this.lowerFirstLetter(name) + 'Status'
    this.setState({ [name]: false })
  }
  renderButtons = (name) => {
    return (
      <>
        <button
          onClick={() => {
            this.updateStatus('Watching', name)
          }}
          style={{ marginRight: '0.3rem' }}
          className='btn btn-primary'
        >
          Watching
        </button>
        <button
          style={{ marginRight: '0.3rem' }}
          onClick={() => {
            this.updateStatus('Not Watching', name)
          }}
          className='btn btn-secondary'
        >
          Not Watching
        </button>
      </>
    )
  }
  renderName = (names) => {
    return (
      <>
        <span style={{ marginLeft: '4rem' }} className='navbar-brand'>
          {names}
        </span>
      </>
    )
  }
  renderStatus = (status) => {
    return status ? 'Watching' : 'N/A'
  }
  render() {
    return (
      <div className='container'>
        <nav className='navbar navbar-light '>
          <div className='container'>
            {this.renderName('Justin')}
            {this.renderName('Angie')}
            {this.renderName('Greyson')}
          </div>
        </nav>
        <nav className='navbar navbar-light '>
          <div className='container-fluid'>
            <div>{this.renderButtons('Justin')}</div>
            <div>{this.renderButtons('Angie')}</div>
            <div>{this.renderButtons('Greyson')}</div>
          </div>
        </nav>
        <div className='flex'>
          <div style={{ marginLeft: '6rem' }}>
            {this.renderStatus(this.state.justinStatus)}
          </div>
          <div style={{ marginLeft: '6rem' }}>
            {' '}
            {this.renderStatus(this.state.angieStatus)}
          </div>
          <div style={{ textAlign: 'right' }}>
            {' '}
            {this.renderStatus(this.state.greysonStatus)}
          </div>
        </div>
      </div>
    )
  }
}
