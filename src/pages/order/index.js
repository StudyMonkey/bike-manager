import React,{ Component } from 'react'
import { Card,Button, Table, Modal, message } from 'antd'
import BaseForm from './../../components/BaseForm'
import axios from './../../axios'
import Utils from './../../utils/utils'


export default class OrderIndex extends Component {

    state = {
        orderConfirmVisivle: false
    }

    params = {
        page: 1
    }

    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city_id',
            placeholder: '全部',
            list: [
                {id: 0, name: '全部'},
                {id: 1, name: '北京市'},
                {id: 2, name: '天津市'},
                {id: 3, name: '上海市'}
            ],
            initialValue: 1,
            width: 100
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            list: [
                {id: 0, name: '全部'},
                {id: 1, name: '进行中'},
                {id: 2, name: '进行中(临时锁车)'},
                {id: 3, name: '行程结束'}
            ],
            initialValue: 1,
            width: 100
        }        
    ]

    componentDidMount () {
        this.requestList()
    }

    // 处理BaseForm传递过来的参数
    handleFilter = (params) => {
        console.log('baseform传值'+params);
        this.params = params;
        this.requestList();
    }

    requestList = () => {
        // axios.requestList(this, '/order/list', this.params)
        axios.ajax({
            url: '/order/list',
            data: {
                params: {
                    page: this.params
                }
            }
        }).then( (res) => {
            if ( res.code === 200 ) {
                res.result.list.map((item,index) => {
                    item.key = index
                    return item
                })
                this.setState({
                    dataSource: res.result.list,
                    selectedRowKeys: [],
                    pagination: Utils.pagination(res,(current) => {
                        this.params.page = current
                        this.requestList();
                    })
                })
            }
        })
    }

    handleRowClick = (record,index) => {
        let selectKey = [ index ];
        console.log(selectKey);
        Modal.info({
            title:'信息',
            content: `用户名: ${record.userName}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    // 结束订单确认
    handleEndComfirm = () => {
        let item = this.state.selectedItem;
        message.success('操作成功');
        this.setState({
            orderConfirmVisivle: false
        })
        this.requestList();
    }

    // 结束订单
    handleEndOrder = () => {
        let item = this.state.selectedItem;
        console.log(item);
        if ( !item ){
            Modal.info({
                title: '提示',
                content: '请选中任一条订单'
            })
            return;
        }
        axios.ajax({
            url: '/finish_order',
            data: {
                params: {
                    order_id: item.order_num
                }
            }
        }).then(res => {
            if( res.code === 200 ) {
                this.setState({
                    orderConfirmVisivle: true
                })
            }
        })
    }

    // 订单详情
    handleOrderDetail = () => {
        let item = this.state.selectedItem
        if( !item ) {
            Modal.info({
                title: '提示',
                content: '请先选择任意订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.order_num}`,'_blank');
    }

    render () {
        const { selectedRowKeys } = this.state
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_num',
                key: 'order_num'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_num',
                key: 'bike_num'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName'
            },
            {
                title: '手机号码',
                dataIndex: 'phoneNum',
                key: 'phoneNum'
            },
            {
                title: '里程',
                dataIndex: 'miles',
                key: 'miles',
                render: (miles) => {
                    return miles+'km'
                }
            },
            {
                title: '行程时长',
                dataIndex: 'take_hours',
                key: 'take_hours'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (status) => {
                    let config = {
                        "1": "进行中",
                        "2": "进行中(临时锁车)",
                        "3": "行程结束"
                    }
                    return config[status]
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'order_money',
                key: 'order_money'
            },
            {
                title: '实付金额',
                dataIndex: 'pay_money',
                key: 'pay_money'
            }            
        ]
        
        return (
            <div>
                <Card>
                    <BaseForm formList= { this.formList } filterSubmit={ this.handleFilter } />
                </Card>
                <Card>
                    <Button type="primary" onClick={ this.handleOrderDetail }>订单详情</Button>
                    <Button type="primary" onClick={ this.handleEndOrder }>结束订单</Button>
                    <Modal
                        title="确认"
                        visible={ this.state.orderConfirmVisivle }
                        onCancel={ () => {
                            this.setState({
                                orderConfirmVisivle: false
                            })
                        }}
                        onOk={  this.handleEndComfirm }
                    >确认结束改订单么？</Modal>
                </Card>
                <Card>
                    <Table
                        bordered
                        columns={ columns }
                        dataSource={ this.state.dataSource }
                        pagination={ this.state.pagination }
                        rowSelection={ rowSelection }
                        onRow={ (record,index) => {
                            return {
                                onClick: () => {
                                    this.handleRowClick(record,index)
                                }
                            }
                        }}
                    />
                </Card>
            </div>
        )
    }
}