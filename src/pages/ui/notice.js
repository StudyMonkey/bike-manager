import React,{ Component } from 'react'
import { Card,Button,notification } from 'antd'

export default class Notice extends Component {

    openNotification = () => {
        notification.open({
            message: 'Notification title',
            description: 'This is content of the notification. this is a test content',
            onClick: () => {
                console.log('notification click')
            }
        })
    }

    openNotificationWithIcon = (type,direction) => {
        if( direction) {
            notification.config({
                placement: direction
            })

        }
        notification[type]({
            message: 'With Icon Notification Title',
            description: 'This is a test info Notification. The type is info and you will see a info Notification'
        })
    }

    render () {
        return (
            <div>

                <Card title="通知提醒框">
                    <Button type="primary" onClick={this.openNotification}>Open the notification box</Button>
                </Card>
                <Card title="带图标的通知提醒框">
                    <Button type="primary" onClick={() =>this.openNotificationWithIcon('info')}>Info notification</Button>
                    <Button type="success" onClick={() =>this.openNotificationWithIcon('success')}>Success notification</Button>
                    <Button type="danger" onClick={() =>this.openNotificationWithIcon('warning')}>Warning notification</Button>
                    <Button type="error" onClick={() =>this.openNotificationWithIcon('error')}>Error notification</Button>
                </Card> 
                <Card title="通知提醒框控制方向">
                    <Button type="primary" onClick={() =>this.openNotificationWithIcon('info','topLeft')}>Info topLeft notification</Button>
                    <Button type="success" onClick={() =>this.openNotificationWithIcon('success','topRight')}>Success topRight notification</Button>
                    <Button type="danger" onClick={() =>this.openNotificationWithIcon('warning','bottomLeft')}>Warning bottomLeft notification</Button>
                    <Button type="error" onClick={() =>this.openNotificationWithIcon('error','bottomRight')}>Error bottomRight notification</Button>
                </Card>                                
            </div>
        )
    }


}