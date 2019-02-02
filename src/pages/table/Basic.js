import React,{ Component } from 'react';
import { Table,Card,Tag,Modal,Button,message }  from 'antd'
import axios from './../../axios'
import Util from './../../utils/utils'

export default class basicTable extends Component {

    state = {
        dataSource1: []
    } // 下面的this.setState设置的值用到的时候报错null

    params = {
        page: 1
    }

    request = () => {
        let _this = this
        axios.ajax({
            url: '/table/list',
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
                    selectedRows: null,
                    pagination: Util.pagination(res,(current)=>{
                        //to-do
                        _this.params.page = current;
                        _this.request();
                    })
                })
            }
        })
    }

    handleRowClick = (record,index) => {
        let selectKey = [index];
        Modal.info({
            title: '信息',
            content: `用户名:${record.name},用户爱好:${record.interest}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    handleBtnClick = () => {
        let rows = this.state.selectedRows
        console.log(rows);
        let ids = [];
        rows.map( item => {
            ids.push(item.id)
            return ids
        })
        Modal.confirm({
            title: '提示',
            content: `确定要删除该列数据么？${ids.join(',')}`,
            onOk: ()=>{
                message.success('删除成功');
                this.request();
            }
        })
    }

    componentDidMount () {
        const dataSource = [
            {
                id: 1,
                name: 'Xiaom',
                sex: '男',
                address: '湖南省长沙市',
                state: '乐观向上',
                interest: ['study','dongman'],
                birthdate: '10-24'
            },
            {
                id: 2,
                name: 'Xiaox',
                sex: '女',
                address: '湖南省张家界市',
                state: '乐观向上',
                interest: ['play'],
                birthdate: '10-01'
            }, 
            {
                id: 3,
                name: 'Sangni',
                sex: '男',
                address: '湖南省长沙市',
                state: '贪吃',
                interest: ['Eat'],
                birthdate: '07-19'
            }, 
            {
                id: 4,
                name: 'Paofu',
                sex: '女',
                address: '湖南省长沙市',
                state: '贪吃',
                interest: ['Eat'],
                birthdate: '08-01'
            }                                 
        ]
        this.setState({
            dataSource
        })
        this.request();
    }

    render () {
        const { selectedRowKeys } = this.state
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys,selectedRows) => {
               this.setState({
                   selectedRowKeys,
                   selectedRows
               }) 
            }            
        }
        const columns = [
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

        return(
            <div>
                <Card title="基础表格">
                    <Table 
                        columns={ columns }
                        dataSource={ this.state.dataSource }
                    />
                </Card>
                <Card title="带边框的基础表格">
                    <Table 
                        bordered
                        columns={ columns }
                        dataSource={ this.state.dataSource }
                    />
                </Card>  
                <Card title="隐藏分页带边框的基础表格">
                    <Table 
                        bordered
                        columns={ columns }
                        dataSource={ this.state.dataSource }
                        pagination={ false }
                    />
                </Card> 
                <Card title="动态数据渲染表格">
                    <Table 
                        columns={ columns }
                        dataSource={ this.state.dataSource1 }
                    />
                </Card> 
                <Card title="Mock-单选表格">
                    <Table 
                        columns={ columns }
                        rowSelection={ rowSelection }
                        dataSource={ this.state.dataSource1 }
                        onRow={(record,index) => {
                            return {
                              onClick: () => {
                                  this.handleRowClick(record,index)
                              },       // 点击行
                            };
                          }}                        
                    />
                </Card>  
                <Card title="Mock-复选表格">
                    <Button icon="delete" type="delete" onClick={this.handleBtnClick}>删除</Button>
                    <Table 
                        columns={ columns }
                        rowSelection={ rowCheckSelection }
                        dataSource={ this.state.dataSource1 }
/*                         onRow={(record,index) => {
                            return {
                              onClick: () => {
                                  this.handleRowClick(record,index)
                              },       // 点击行
                            };
                        }}  */                       
                    />
                </Card> 
                <Card title="Mock-表格分页">
                    <Table 
                        bordered
                        columns={ columns }
                        dataSource={ this.state.dataSource1 }
                        pagination={this.state.pagination}
                    />
                </Card>                                                                                           
            </div>
        )
    }
}