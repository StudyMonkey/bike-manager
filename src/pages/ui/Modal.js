import React, { Component } from 'react'
import { Card,Modal,Button } from 'antd'

export default class Modals extends Component {

    componentWillMount () {
        this.setState( () =>({
            visible1: false,
            visible2: false,
            visible3: false,
            visible4: false,
            visible5: false,
            visible6: false,
            visible7: false,
            visible8: false,            
        }))
    }

    handleOk = (obj) => {
        this.setState ( () => ({
            [obj]: false
        }))
    }

    handleCancle = (obj) => {
        this.setState ( () => ({
            [obj]: false
        }))
    }
    
    handleShow = (obj) => {
        this.setState ( () => ({
            [obj]: true
        }))        
    }

    handleConfirm = (type) => {
        Modal[type]({
            title: '确认?',
            content: '你确定你有学会东西么?',
            onOk (){
                console.log('点击OK')
            },
            onCancel (){
                console.log('点击cancle')
            }
        })
    }

    render () {
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible1}
                    onOk={() =>this.handleOk('visible1')}
                    onCancel={() => this.handleCancle('visible1')}                
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible2}
                    okText="好的"
                    cancelText="算了"
                    onOk={() =>this.handleOk('visible2')}
                    onCancel={() => this.handleCancle('visible2')}                
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal> 
                <Modal
                    title="Basic Modal"
                    style={{top: 20}}
                    visible={this.state.visible3}
                    onOk={() =>this.handleOk('visible3')}
                    onCancel={() => this.handleCancle('visible3')}                
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>  
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible4}
                    centered
                    onOk={() =>this.handleOk('visible4')}
                    onCancel={() => this.handleCancle('visible4')}                
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>                                             
                <Card title="基础模态框">
                    <Button onClick={() => {this.handleShow('visible1')}}>Open</Button>
                    <Button onClick={() => {this.handleShow('visible2')}} type="primary">自定义页脚</Button>
                    <Button onClick={() => {this.handleShow('visible3')}} icon="plus">顶部20px弹窗</Button>
                    <Button onClick={() => {this.handleShow('visible4')}} type="danger">水平垂直居中</Button>
                </Card>  
                <Card title="信息模态框">
                    <Button onClick={() => {this.handleConfirm('confirm')}}>Confirm</Button>
                    <Button onClick={() => {this.handleConfirm('info')}} type="primary">Info</Button>
                    <Button onClick={() => {this.handleConfirm('success')}} icon="plus">Success</Button>
                    <Button onClick={() => {this.handleConfirm('warning')}} type="danger">Warning</Button>
                </Card>                 
            </div>
        )
    }
}