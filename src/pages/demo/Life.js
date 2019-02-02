import React, { Component } from 'react'
import Child from './Child'
import './index.less'
import { Button,Input } from 'antd'

export default class Life extends Component {

    constructor (props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    handleBtnClick = () => {
        this.setState({
            count: this.state.count+1
        })
    }

    render () {
        return (
            <div className="content">
                <p>React 生命周期介绍</p>
                <Input />
                <Button onClick={this.handleBtnClick}>Antd 点击一下</Button>
                <button onClick={this.handleBtnClick}>点击一下</button>
                <Child count={this.state.count} />
            </div>
        )
    }
}