import React,{ Component } from 'react'
import { Card,Form,Input,Button,message,Icon, Checkbox } from 'antd'
const FormItem = Form.Item

class Login extends Component {

    handleSubmit = () => {
        const userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err,values) => {
            if(!err){
                message.success(`${values.userName}，恭喜您，验证通过了。请牢记您的密码${values.passWord}`)
            }
        });
        console.log(userInfo);
    }

    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Card title="基础行内form">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>                                                
                    </Form>
                </Card>
                <Card title="基础水平form">
                    <Form style={{width:300}}>
                        <FormItem>
                            {
                                getFieldDecorator('userName',{
                                    initialValue: '',
                                    rules: [
                                        {required: true,message: 'please input your username'},
                                        {min: 5,max:10,message: '长度不在范围内'}
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('passWord',{
                                    rules: [{required: true,message: 'please input your password'}]
                                })(
                                    <Input prefix={<Icon type="lock" />} placeholder="请输入密码" />
                                )
                            }                            
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember',{
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }   
                            <a href="http://www.baidu.com" style={{float:"right"}}>忘记密码</a>                         
                        </FormItem>                        
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>                                                
                    </Form>
                </Card>    
            </div>
        )
    }
}

export default Form.create()(Login);