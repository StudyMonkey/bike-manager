import React, { Component, Fragment } from 'react'

export default class Child extends Component {

    render () {
        return (
            <Fragment>
                <p>父组件传递数据</p>
                <p>{this.props.count}</p>
            </Fragment>
        )
    }

    componentWillMount () {
        console.log('will mount')
    }

    componentDidMount () {
        console.log('did mount')
    }

    componentWillReceiveProps (newProps) {
        console.log('receive props'+ newProps.count)
    }

    shouldComponentUpdate () {
        console.log('should update')
        return true
    }

    componentWillUpdate () {
        console.log('will update')
    }

    componentDidUpdate () {
        console.log('did update')
    }
}