import { Component } from 'react'

export default class LogOut extends Component {
    componentDidMount() {
        localStorage.removeItem('auth')
        window.location = '/login'
    }
    render() {
        return null
    }
}
