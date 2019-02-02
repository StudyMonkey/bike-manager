import React,{ Component } from 'react'
import { Card,Button,message } from 'antd'

export default class Message extends Component {

    handleInfo = () => {
        message.info('This is a normal information')
    }

    handleInfoType = (type) => {
        message[type]('This is a prompt message for'+type+'and it will disappear in 5 seconds', 5);
    }

    handleLoadInfo = () => {
        message.loading('Action in progress',2.5)
                    .then(() => message.success('Action is success', 2.5))
                    .then(() => message.info('Loading finished is finished',2.5))
    }

    render () {
        return (
            <div>
                <Card title="全局消息框">
                    <Button type="primary" onClick={this.handleInfo}>Display normal Message</Button>
                </Card>
                <Card title="全局消息框类型加时间">
                    <Button type="primary" onClick={()=>this.handleInfoType('info')}>Display info Message</Button>
                    <Button type="danger" icon="plus" onClick={()=>this.handleInfoType('success')}>Display success Message</Button>
                    <Button type="dashed" icon="download" onClick={()=>this.handleInfoType('warning')}>Display warning Message</Button>
                    <Button onClick={()=>this.handleInfoType('error')}>Display error Message</Button>
                    <Button onClick={()=>this.handleInfoType('loading')}>Display loading Message</Button>
                </Card> 
                <Card title="loading 全局消息框">
                    <Button icon="plus" type="primary" onClick={this.handleLoadInfo}>Display info Message</Button>
                </Card>                                
            </div>
        )
    }
}