import React,{ Component } from 'react'
import { Card, Button, Table, Modal, Form, Select, message } from 'antd';
import BaseForm from './../../components/BaseForm'
import axios from './../../axios'
import Utils from './../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option

export default class CityIndex extends Component{

    state = {
        list: [],
        isShowOpenCity: false
    }

    params = {
        page: 1
    }

    formList = [
        {
            type: 'SELECT',
            label: '城市',
            placeholder: '全部',
            field: 'city_id',
            width: '120',
            initialValue: 1,
            list: [
                {id: 0, name: '全部'},
                {id: 1, name: '北京市'},
                {id: 2, name: '天津市'},
                {id: 3, name: '深圳市'}
            ]
        },
        {
            type: 'SELECT',
            label: '用车模式',
            placeholder: '全部',
            field: 'mode',
            width: '150',
            initialValue: 1,
            list: [
                {id: 0, name: '全部'},
                {id: 1, name: '制定停车点模式'},
                {id: 2, name: '禁停区模式'},
            ]
        },
        {
            type: 'SELECT',
            label: '营运模式',
            placeholder: '全部',
            field: 'use_mode',
            width: '120',
            initialValue: 1,
            list: [
                {id: 0, name: '全部'},
                {id: 1, name: '自营'},
                {id: 2, name: '加盟'}
            ]
        },
        {
            type: 'SELECT',
            label: '加盟商授权状态',
            placeholder: '全部',
            field: 'auth_status',
            width: '120',
            initialValue: 1,
            list: [
                {id: 0, name: '全部'},
                {id: 1, name: '已授权'},
                {id: 2, name: '未授权'}
            ]
        },        
    ]

    componentDidMount () {
        this.requestList()
    }

    requestList = () => {
        axios.requestList(this, '/open_city', this.params, true);
    }
   
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        })
    }

    //城市开通提交
    handleSubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo);
        axios.ajax({
            url: '/city/open',
            data: {
                params: cityInfo
            }
        }).then((res) => {
            console.log(res);
            if ( res.code === 200 ) {
                message.success('开通成功');
                this.setState({
                    isShowOpenCity: false
                })
                this.requestList();
            }
        })
    }

    // 处理baseform传递过来的数据
    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }

    render () {

        const columns = [
            {
                title:'城市ID',
                dataIndex:'id'
            }, 
            {
                title: '城市名称',
                dataIndex: 'name'
            }, 
            {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode){
                    return mode === 1 ?'停车点':'禁停区';
                }
            }, 
            {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode === 1 ? '自营' : '加盟';
                }
            }, 
            {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            }, 
            {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name;
                    }).join(',');
                }
            }, 
            {
                title: '城市开通时间',
                dataIndex: 'open_time'
            }, 
            {
                title: '操作时间',
                dataIndex: 'update_time',
                render: Utils.formateDate
            }, 
            {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ]

        return (
            <div>
                <Card>
                    <BaseForm formList={ this.formList } filterSubmit={ this.handleFilter } />
                </Card>
                <Card>
                    <Button type="primary" onClick={this.handleOpenCity}>开放城市</Button>
                </Card>
                <Card>
                    <Table
                        columns={ columns }
                        dataSource= { this.state.dataSource }
                        pagination={ this.state.pagination }
                    />
                </Card>
                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={ () => {
                            this.setState({
                                isShowOpenCity: false
                            })
                        }
                    } 
                    onOk={ this.handleSubmit }
                >
                    {/* <OpenCityForm wrappedComponentRef={inst => { this.cityForm = inst }} /> */}
                    <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst;}}/>
                </Modal>
            </div>
        )
    }
}

class OpenCityForm extends Component {
    render () {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="horizontal">
                <FormItem label="城市选择" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id',{
                            initialValue: '1'
                        })(
                            <Select style={{width:100}}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="自营模式" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode',{
                            initialValue: '1'
                        })(
                            <Select style={{width:100}}>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem> 
                <FormItem label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator('use_mode',{
                            initialValue: '1'
                        })(
                            <Select style={{width:100}}>
                                <Option value="1">指定停车点</Option>
                                <Option value="2">禁停区</Option>
                            </Select>
                        )
                    }
                </FormItem>                                
            </Form>
        )

    }
}
OpenCityForm = Form.create({})(OpenCityForm);