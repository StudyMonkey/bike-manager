import React,{ Component } from 'react'
import { Button,Card,Radio } from 'antd'
import './ui.less'
const ButtonGroup = Button.Group

export default class Buttons extends Component {

    componentWillMount () {
        this.setState( () => ({
            loading: true,
            size: 'default'
        }))       
    }


    handleCloseLoading = () => {
        this.setState( ()=> ({
            loading: !this.state.loading
        }))
    }

    handleChangeRadio = (e) => {
        this.setState ( () => ({
            size: e.target.value
        }))
    }

    render () {
        return (
            <div>
                <Card title="基础按钮">
                    <Button type="primary">Xiaom</Button>
                    <Button>Xiaom</Button>
                    <Button type="dashed">Xiaom</Button>
                    <Button type="danger">Xiaom</Button>
                    <Button disabled>Xiaom</Button>
                </Card>
                <Card title="图形按钮">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                    <Button icon="apple" shape="circle"></Button>
                </Card>  
                <Card title="loading按钮">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button loading={this.state.loading}>确定</Button>
                    <Button type="primary" loading={this.state.loading}>点击加载</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>  
                <Card title="按钮组">
                    <ButtonGroup>
                        <Button icon="left">返回</Button>
                        <Button icon="right">前进</Button>
                    </ButtonGroup>
                </Card> 
                <Card title="按钮尺寸">
                    <Radio.Group  value={this.state.size} onChange={this.handleChangeRadio}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Xiaom</Button>
                    <Button type="dashed" size={this.state.size}>Xiaom</Button>
                    <Button type="danger" size={this.state.size}>Xiaom</Button>
                    <Button size={this.state.size}>Xiaom</Button>
                </Card>                                                             
            </div>
        )
    }
}