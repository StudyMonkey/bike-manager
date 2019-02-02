import React,{ Component } from 'react'
import { Card,Table,Tag, Badge,Button, Modal, message } from 'antd'
import axios from './../../axios'

export default class High extends Component {
    state = {}

    params = {
        page: 1
    }

    request = () => {
        axios.ajax({
            url: '/table/high/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then( (res) => {
            if( res.code === 200 ){
                res.result.list.map( (item,index) => {
                    item.key = index
                    return item
                })
                this.setState({
                    dataSource1: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: null
                })
            }
        })
    }

    componentDidMount () {
        this.request()
    }

    handleChange = (pagination, filters, sorter) => {
        console.log(sorter.order)
        this.setState({
            sortOrder: sorter.order
        })
    }

    handleBtnDelete = (item) => {
        // let id = item.id;
        Modal.confirm({
            title: '确认',
            content: '确认删除该条数据？',
            onOk: ()=>{
                message.success('删除成功');
                this.request();
            }
        })
    }

    render () {

        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                width: 80
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: 80
            },
            {
                title: 'Sex',
                dataIndex: 'sex',
                key: 'sex',
                render: (sex => {
                    return sex === 1 ? '男' : '女'
                }),
                width: 80
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                width: 120
            },
            {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
                render: (state => {
                    let config = {
                        "1": '好好学习',
                        "2": "天天向上",
                        "3": "积极乐观",
                        "4": "爱好运动",
                        "5": "沉迷游戏",
                        "6": "热爱动漫",
                        "7": "自怨自艾",
                        "8": "不知所云"
                    }
                    return config[state]
                }),
                width: 80
            },
            {
                title: 'Interest',
                dataIndex: 'interest',
                key: 'interest',
                render: (interest => {
                    let config = {
                        "1": '动漫',
                        "2": "网球",
                        "3": "跑步",
                        "4": "遛狗",
                        "5": "足球",
                        "6": "手游",
                        "7": "听音乐",
                        "8": "台球"
                    }
                    return (
                        <span>
                            { <Tag color="blue" key={config[interest]}>{config[interest]}</Tag> }
                        </span>
                    )                  

                }),
                width: 80

            },            
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                width: 120
            }                        
        ]

        const columns2 = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                fixed: 'left',
                width: 80
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                width: 80
            },
            {
                title: 'Sex',
                dataIndex: 'sex',
                key: 'sex',
                render: (sex => {
                    return sex === 1 ? '男' : '女'
                }),
                width: 80
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                width: 120
            },
            {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
                render: (state => {
                    let config = {
                        "1": '好好学习',
                        "2": "天天向上",
                        "3": "积极乐观",
                        "4": "爱好运动",
                        "5": "沉迷游戏",
                        "6": "热爱动漫",
                        "7": "自怨自艾",
                        "8": "不知所云"
                    }
                    return config[state]
                }),
                width: 80
            },
            {
                title: 'Interest',
                dataIndex: 'interest',
                key: 'interest',
                render: (interest => {
                    let config = {
                        "1": '动漫',
                        "2": "网球",
                        "3": "跑步",
                        "4": "遛狗",
                        "5": "足球",
                        "6": "手游",
                        "7": "听音乐",
                        "8": "台球"
                    }
                    return (
                        <span>
                            { <Tag color="blue" key={config[interest]}>{config[interest]}</Tag> }
                        </span>
                    )                  

                }),
                width: 80

            },            
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                width: 120
            },
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                width: 120
            },
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                width: 120
            },
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                width: 120
            },
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                width: 120
            },
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                width: 120
            },
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                width: 120
            },
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                width: 120
            },
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                width: 120
            },
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                width: 120
            },
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                width: 120
            },
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                width: 120
            },
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                width: 120
            },
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate',
                fixed: 'right',
                width: 120
            }
        ]        

        const columns3 = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                sorter: (a,b) => {
                    return a.age - b.age
                },
                sortOrder: this.state.sortOrder
            },            
            {
                title: 'Sex',
                dataIndex: 'sex',
                key: 'sex',
                render: (sex => {
                    return sex === 1 ? '男' : '女'
                })
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
                render: (state => {
                    let config = {
                        "1": '好好学习',
                        "2": "天天向上",
                        "3": "积极乐观",
                        "4": "爱好运动",
                        "5": "沉迷游戏",
                        "6": "热爱动漫",
                        "7": "自怨自艾",
                        "8": "不知所云"
                    }
                    return config[state]
                })
            },
            {
                title: 'Interest',
                dataIndex: 'interest',
                key: 'interest',
                render: (interest => {
                    let config = {
                        "1": '动漫',
                        "2": "网球",
                        "3": "跑步",
                        "4": "遛狗",
                        "5": "足球",
                        "6": "手游",
                        "7": "听音乐",
                        "8": "台球"
                    }
                    return (
                        <span>
                            { <Tag color="blue" key={config[interest]}>{config[interest]}</Tag> }
                        </span>
                    )                  

                })

            },            
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
                key: 'birthdate'
            }                        
        ]  
        const columns4 = [
            {
                title: 'Id',
                dataIndex: 'id'
            },
            {
                title: 'Name',
                dataIndex: 'name'
            },
            {
                title: 'Age',
                dataIndex: 'age'
            },            
            {
                title: 'Sex',
                dataIndex: 'sex',
                render: (sex => {
                    return sex === 1 ? '男' : '女'
                })
            },
            {
                title: 'Address',
                dataIndex: 'address'
            },
            {
                title: 'State',
                dataIndex: 'state',
                render: (state => {
                    let config = {
                        "1": '好好学习',
                        "2": "天天向上",
                        "3": "积极乐观",
                        "4": "爱好运动",
                        "5": "沉迷游戏",
                        "6": "热爱动漫",
                        "7": "自怨自艾",
                        "8": "不知所云"
                    }
                    return (
                        <span><Badge status="success"/>{config[state]}</span>
                    )
                })
            },
            {
                title: 'Interest',
                dataIndex: 'interest',
                render: (interest => {
                    let config = {
                        "1": '动漫',
                        "2": "网球",
                        "3": "跑步",
                        "4": "遛狗",
                        "5": "足球",
                        "6": "手游",
                        "7": "听音乐",
                        "8": "台球"
                    }
                    return (
                        <span>
                            { <Tag color="blue" key={config[interest]}>{config[interest]}</Tag> }
                        </span>
                    )                  

                })

            },            
            {
                title: 'Birthdate',
                dataIndex: 'birthdate',
            },
            {
                title: '操作',
                render: (text,item) => {
                    return <Button size="small" type="danger" onClick={item => { this.handleBtnDelete(item) }}>删除</Button>
                }
            }                                      
        ]               
        return (
            <div>
                <Card title="高级表格-表头固定">
                    <Table 
                        bordered
                        columns={ columns }
                        dataSource={ this.state.dataSource1 }
                        pagination={ false }
                        scroll={ {y: 200} }
                    />
                </Card>
                <Card title="高级表格-左侧固定">
                    <Table 
                        columns={ columns2 }
                        dataSource={ this.state.dataSource1 }
                        pagination={ false }
                        scroll={ {x:2000} }
                    />
                </Card>
                <Card title="高级表格-排序">
                    <Table 
                        columns={ columns3 }
                        dataSource={ this.state.dataSource1 }
                        pagination={ false }
                        sortOrder={this.state.sortOrder}
                        onChange={this.handleChange}
                    />
                </Card>  
                <Card title="高级表格-操作按钮">
                    <Table 
                        columns={ columns4 }
                        dataSource={ this.state.dataSource1 }
                        pagination={ false }
                    />
                </Card>                                               
            </div>
        )
    }
}