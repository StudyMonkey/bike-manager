import React,{ Component } from 'react'
import { Card,Spin,Icon,Alert } from 'antd'

export default class Loading extends Component {
    render () {
        const icon = <Icon type="loading" />
        return (
            <div>
                <Card title="Spin用法">
                    <Spin size="small" />
                    <Spin />
                    <Spin size="large" />
                    <Spin indicator={icon} size="large" />
                </Card>
                <Card title="内容遮罩">
                    <Alert 
                        message="React"
                        description="React + antd"
                        type="info"
                    />
                    <Alert 
                        message="React"
                        description="React + antd"
                        type="warning"
                    /> 
                    <Spin>
                        <Alert 
                            message="React"
                            description="React + antd"
                            type="warning"
                        />                        
                    </Spin> 
                    <Spin tip="加载中..." indicator={icon}>
                        <Alert 
                            message="React"
                            description="React + antd"
                            type="success"
                        />                        
                    </Spin>                                      
                </Card>
            </div>
        )
    }
}