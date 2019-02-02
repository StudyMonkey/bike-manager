import React,{ Component } from 'react'
import { Card,Form,Button,Input,Modal,Radio,DatePicker, Select } from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm'
import ETable from './../../components/ETable'
import moment from 'moment';
const FormItem = Form.Item
const RadioGroup = Radio.Group
const TextArea = Input.TextArea
const Option = Select.Option

class UserIndex extends Component {

    state = {
        isVisible: false
    };

    params = {
        page: 1
    };

    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'user_name',
            placeholder: '请输入用户名称',
            width: 100
        },
        {
            type: 'INPUT',
            label: '用户手机号',
            field: 'user_mobile',
            placeholder: '请输入用户手机号',
            width: 100
        },        
        {
            type: 'DATE',
            label: '请选择入职日期',
            field: 'user_date',
            placeholder: '请选择日期'
        }       
    ]

    componentDidMount () {
        this.requestList();
    }

    handleOperate = (type) => {
        let item = this.state.selectedItem;
        // console.log(item);
        if ( !item && type !== 'create' ) {
            Modal.info({
                title: '提示',
                content: '请选择一个用户'
            })
            return;
        }
        if ( type === 'create' ) {
            this.setState({
                type,
                isVisible: true,
                title: '创建员工'
            })
        } else if ( type === 'edit' ) {
            this.setState({
                type,
                isVisible: true,
                title: '编辑员工',
                userInfo: item
            })            
        } else if ( type === 'detail' ) {
            this.setState({
                type,
                isVisible: true,
                title: '员工详情',
                userInfo: item
            })             
        } else {
            Modal.confirm({
                title: '确认删除',
                content: '是否删除当前选中员工？',
                onOk: () => {
                    axios.ajax({
                        url: '/user/delete',
                        data: {
                            params: {
                                id: item.id
                            }
                        }
                    }).then( (res) => {
                        if ( res.code === 200 ) {
                            this.setState({
                                isVisible: false
                            })
                        }
                        this.requestList();
                    })
                },
                onCancel: () => {
                    this.setState({
                        isVisible: false
                    })
                }
            })
        }
    }

    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }

    requestList = () =>{
        axios.requestList(this,'/user/list',this.params);
    }

    // 创建员工提交
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        console.log(data);
        axios.ajax({
            url: type === 'create' ? '/user/add' : '/user/edit',
            data: {
                params: data
            }
        }).then( (res) => {
            if ( res.code === 200 ) {
                
                this.setState({
                    isVisible: false
                });
                this.requestList();
                this.userForm.props.form.resetFields();
            }
        })
    }

    render () {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render: (sex) => {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                key: 'interest',
                render: (interest) => {
                    return {
                        '1' : '跑步',
                        '2' : '瑜伽',
                        '3' : '台球',
                        '4' : '乒乓球',
                        '5' : '羽毛球',
                        '6' : '遛狗',
                        '7' : '逛街',
                        '8' : '看电影'
                    }[interest]
                }
            },                         
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render: (state) => {
                    return {
                        '1' : '好好学习',
                        '2' : '天天向上',
                        '3' : '乐于助人',
                        '4' : '乐善好施',
                        '5' : '慈眉善目',
                        '6' : '沉迷游戏',
                        '7' : '无精打采',
                        '8' : '丢人现眼'
                    }[state]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthdate',
                key: 'birthdate'
            }, 
            {
                title: '联系地址',
                dataIndex: 'address',
                key: 'address'
            }                           
        ]
       
        let footer = {};
        if ( this.state.type === 'detail' ) {
            footer = {
                footer: null
            }
        }
        return (
            <div>
                <Card>               
                    <BaseForm formList={ this.formList } filterSubmit={ this.handleFilter } />
                </Card>
                <Card>
                    <Button type="primary" icon="plus" onClick={ () => this.handleOperate('create') }>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={ () => this.handleOperate('edit') }>编辑员工</Button>
                    <Button type="primary" onClick={ () => this.handleOperate('detail') }>员工详情</Button>
                    <Button type="danger" icon="delete" onClick={ () => this.handleOperate('delete') }>删除员工</Button>
                </Card>
                <Card>
                    <ETable 
                        updateSelectedItem={ Utils.updateSelectedItem.bind(this) }
                        columns={ columns }
                        dataSource={ this.state.list }
                        selectedRowKeys={ this.state.selectedRowKeys }
                        selectedItem={ this.state.selectedItem }
                        pagination={ this.state.pagination }
                    />
                </Card>
                <Modal
                    title={ this.state.title }
                    visible= { this.state.isVisible }
                    onOk={ this.handleSubmit }
                    onCancel= { () => {
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible: false
                        })
                    } }
                    width={600}
                    { ...footer }
                >                   
                    {/* wrappedComponentRef 相当于vue 的 ref */}
                    <UserForm type={this.state.type} userInfo={ this.state.userInfo } wrappedComponentRef={ (inst) => this.userForm = inst } />
                </Modal>
            </div>
        )
    }
}

class UserForm extends Component {
    render () {
        const type = this.props.type;
        const userInfo = this.props.userInfo || {};
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 15}
        }
        const getState = {
            '1' : '好好学习',
            '2' : '天天向上',
            '3' : '乐于助人',
            '4' : '乐善好施',
            '5' : '慈眉善目',
            '6' : '沉迷游戏',
            '7' : '无精打采',
            '8' : '丢人现眼'               
        }
        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.name :
                        getFieldDecorator('user_name',{
                            initialValue: type=== 'edit' ? userInfo.name : ''
                        })(
                            <Input type="text" placeholder="请输入用户名" />
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.sex=== 1 ? '男' : '女' :
                        getFieldDecorator('sex',{
                            initialValue: type=== 'edit' ? userInfo.sex : ''
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem> 
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type === 'detail' ? getState[userInfo.state] :
                        getFieldDecorator('status',{
                            initialValue: type=== 'edit' ? userInfo.state : ''
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>努力少年</Option>
                                <Option value={3}>呆萌金毛</Option>
                                <Option value={4}>短腿柯基</Option>
                                <Option value={5}>思考人生</Option>
                                <Option value={6}>无精打采</Option>
                                <Option value={7}>沉迷游戏</Option>
                                <Option value={8}>热爱运动</Option>                               
                            </Select>
                        )
                    }
                </FormItem>   
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.birthdate :
                        getFieldDecorator('birthDate',{
                            initialValue: type=== 'edit' ? moment(userInfo.birthdate) : ''
                        })(
                            <DatePicker />
                        )
                    }
                </FormItem> 
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.address :
                        getFieldDecorator('address',{
                            initialValue: type=== 'edit' ? userInfo.address : ''
                        })(
                            <TextArea rows={3}  placeholder="请输入联系地址" />
                        )
                    }
                </FormItem>                                                             
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm)

export default Form.create({})(UserIndex)