import React,{ Component } from 'react';
import { Card,Button,Modal,Form,Select,Input,message,Tree,Transfer } from 'antd';
import ETable from './../../components/ETable'
import Utils from './../../utils/utils'
import axios from './../../axios'
import TreeData from './../../config/menuConfig'
const FormItem = Form.Item
const Option = Select.Option
const { TreeNode } = Tree

export default class PermissionIndex extends Component{

    state = {
        showCreateForm: false,
        isPermVisible: false,
        isAuthorize: false
    }

    componentDidMount () {
        axios.requestList(this,'/role/list',{});
    }

    handleCreatUser = () => {
        this.setState({
            showCreateForm: true
        })
    }
    // 打开设置权限弹窗
    handleSetAuth = () => {
        const item = this.state.selectedItem;
        if ( !item ) {
            Modal.info({
                content: '请选择一个角色'
            })
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: item,
            menuInfo: item.menus
        })
    }
    // 设置权限提交
    handlePermOk = () => {
        const data = this.permEditForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menuInfo = this.state.menuInfo;
        axios.ajax({
            url: '/permission/edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then( res => {
            if (res.code === 200) {
                message.success('设置成功');
                this.setState({
                    isPermVisible: false
                });
                axios.requestList(this,'/role/list',{});
            }
        })
    }
    // 创建角色提交
    handleRoleSubmit = () => {
        const data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url: '/role/create',
            dara: {
                params: data
            }
        }).then(res=> {
            message.success('创建成功');
            if (res.code === 200) {
                this.setState({
                    showCreateForm: false
                });
                axios.requestList(this,'/role/list',{});
                this.roleForm.props.form.resetFields();
            }
        })
    }
    // 打开用户授权弹出框
    handleUser = () => {
        const item = this.state.selectedItem;
        if ( !item ) {
            Modal.info({
                content: '请选择一个用户'
            })
            return;
        }
        this.getRoleUserList(item.id);
        this.setState({
            isAuthorize: true,
            detailInfo: item
        })        
    }

    // 获取用户列表
    getRoleUserList = (id) => {
        axios.ajax({
            url: '/role/user_list',
            data: {
                params: {
                    id
                }
            }
        }).then( res => {
            if ( res ){                
                this.getAuthUserList(res.result)
            }
        })
    }

    // 筛选目标用户
    getAuthUserList = (dataSource) => {
        let mockData = [];
        let targetKeys = [];
        if (dataSource && dataSource.length > 0) {
            for(let i = 0; i < dataSource.length; i++) {
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }
                if ( data.status === 1 ) {
                    targetKeys.push(data.key)
                }
                mockData.push(data)
                               
            }
            this.setState({
                mockData,
                targetKeys
            })
        }
    }

    // 用户授权提交
    handleAuthCommit = () => {
        const data = {};
        data.user_ids = this.state.targetKeys;
        data.role_id = this.state.selectedItem.id;
        console.log(data);
        axios.ajax({
            url: '/role/user_role_edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then( res => {
            if ( res ) {
               this.setState({
                   isAuthorize: false
               }) 
               axios.requestList(this,'/role/list',{});
            }
        })
    }

    render () {

        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            },
            {
                title: '角色名称',
                dataIndex: 'role_name'                
            },
            {
                title: '创建时间',
                dataIndex: 'create_time'                
            },            
            {
                title: '使用状态',
                dataIndex: 'status',
                render: status => {
                    return status === 0 ? '启用' : '停用'
                }
            },
            {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formateDate
            },
            {
                title: '授权人',
                dataIndex: 'authorize_user_name'
            }
        ]

        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleCreatUser}>创建用户</Button>
                    <Button type="primary" onClick={this.handleSetAuth}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUser}>用户授权</Button>
                </Card>
                <Card>
                    <ETable 
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        columns= { columns }
                    />
                </Card>
                <Modal
                    title="创建角色"
                    visible={this.state.showCreateForm}
                    onOk={ this.handleRoleSubmit }
                    onCancel={ () => {
                        this.roleForm.props.form.resetFields(); // 防止输入到一半的时候点取消，此时要清空内容
                        this.setState({
                            showCreateForm: false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={ (inst) => this.roleForm = inst } />
                </Modal>
                <Modal
                    title="设置权限"
                    width={600}
                    visible={this.state.isPermVisible}
                    onOk={this.handlePermOk}
                    onCancel={ () => {
                        this.setState({
                            isPermVisible: false
                        })
                    }}
                >
                    <PermEditForm 
                        detailInfo={this.state.detailInfo} 
                        menuInfo={ this.state.menuInfo }
                        wrappedComponentRef={ inst => this.permEditForm = inst }
                        patchMenuInfo={ (checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }} 
                    />
                </Modal>
                <Modal
                    title="用户授权"
                    width={800}
                    visible={this.state.isAuthorize}
                    onOk={ this.handleAuthCommit }
                    onCancel= { () =>{
                        this.setState({
                            isAuthorize: false
                        })
                    }}
                >
                    <RoleAuthForm 
                        detailInfo={this.state.detailInfo} 
                        targetKeys={ this.state.targetKeys }
                        mockData={ this.state.mockData }
                        wrappedComponentRef={ inst => this.roleAuthForm = inst }
                        patchUserInfo={(targetKeys) => {
                            this.setState({
                                targetKeys
                            })
                        }}
                    />
                </Modal>
            </div>
        )
    }
}

class RoleForm extends Component {
    render () {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 15}
        }
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name')(
                            <Input type="text" placeholder="请输入用户名" />
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status')(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>                                                               
            </Form>
        )
    }
}
RoleForm = Form.create({})(RoleForm)

class PermEditForm extends Component {

    renderTreeNodes = (data) => {
        return data.map( item => {
            if ( item.children ) {
                return (<TreeNode {...item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>)
            }else {
                return <TreeNode {...item} />
            }
        })
    }

    handleTreeCheck = (keys) =>{
        this.props.patchMenuInfo(keys);
    }

    render() {
        const detail_Info = this.props.detailInfo;
        const menu_Info = this.props.menuInfo; 
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 15}
        }   
        const { getFieldDecorator } = this.props.form     
        return (
            <Form layout="horizontal"> 
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detail_Info.role_name} />
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status',{
                            initialValue: 1
                        })(
                            <Select>
                                <Option value={1}>启用</Option>
                                <Option value={0}>停用</Option>
                            </Select>
                        )
                    }
                </FormItem> 
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={ checkedKeys => { this.handleTreeCheck(checkedKeys) }}
                    checkedKeys={ menu_Info }
                >
                    <TreeNode title="平台权限" key="plateform_all">
                        {this.renderTreeNodes(TreeData)}
                    </TreeNode>    
                </Tree>               
            </Form>
        )
    }
}
PermEditForm = Form.create({})(PermEditForm)

class RoleAuthForm extends Component{
   
    filterOption = (inputValue, option) => {
        return option.titles.indexOf(inputValue) > -1
    }

    handleAuthChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys)
    }
    
    render () {
        const detail_Info = this.props.detailInfo;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 15}
        }         
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detail_Info.role_name} />
                </FormItem>
                <FormItem label="选择用户" {...formItemLayout}>
                    <Transfer 
                        listStyle={{width:200,height:400}}
                        dataSource={ this.props.mockData }
                        titles={['待选用户', '已选用户']}
                        showSearch
                        searchPlaceholder="请输入用户名"
                        filterOption={this.filterOption}
                        targetKeys={ this.props.targetKeys }
                        render={item => item.title}
                        onChange={ this.handleAuthChange }
                    />
                </FormItem>
            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm);