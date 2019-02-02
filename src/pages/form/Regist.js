import React,{ Component } from 'react'
import { message,Form,Card,Button,Input,Checkbox, Radio, InputNumber, Select, option, Switch, DatePicker, TimePicker, Upload, Icon } from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const TextArea = Input.TextArea

class Regist extends Component {
    state ={}

    handleSubmit = () => {
        const registInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(registInfo));
        message.success(`${registInfo.userName}，恭喜您，注册成功了。请牢记您的密码${registInfo.userPwd}`)
    }

    render () {

        const { getFieldDecorator } = this.props.form
        const formItemLabel = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        return (
            <div>
                <Card title="注册Form">
                    <Form>
                        <FormItem label="用户名" {...formItemLabel}>
                            {
                                getFieldDecorator('userName',{
                                    rules: [{required: true,message: 'please input your username'}]
                                })(
                                    <Input placeholder="请输入用户名"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLabel}>
                            {
                                getFieldDecorator('userPwd',{
                                    rules: [{required: true,message: 'please input your user password'}]
                                })(
                                    <Input type="password" placeholder="请输入用户密码"/>
                                )
                            }
                        </FormItem>  
                        <FormItem label="性别" {...formItemLabel}>
                            {
                                getFieldDecorator('sex',{
                                    initialValue: '0'
                                })(
                                    <Radio.Group>
                                        <Radio value="0">男</Radio>
                                        <Radio value="1">女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem> 
                        <FormItem label="年龄" {...formItemLabel}>
                            {
                                getFieldDecorator('age',{
                                    initialValue: 18
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem>  
                        <FormItem label="当前状态" {...formItemLabel}>
                            {
                                getFieldDecorator('state',{
                                    initialValue: "2"
                                })(
                                    <Select>
                                        <option value="1">一条咸鱼</option>
                                        <option value="2">浪子回头</option>
                                        <option value="3">鸣人</option>
                                        <option value="4">佐助</option>
                                        <option value="5">路飞</option>
                                    </Select>
                                )
                            }
                        </FormItem>  
                        <FormItem label="爱好" {...formItemLabel}>
                            {
                                getFieldDecorator('interest',{
                                    initialValue: ["2","5"]
                                })(
                                    <Select mode="multiple">
                                        <option value="1">游泳</option>
                                        <option value="2">跑步</option>
                                        <option value="3">爬山</option>
                                        <option value="4">遛狗</option>
                                        <option value="5">羽毛球</option>
                                        <option value="6">骑行</option>
                                        <option value="7">桌球</option>
                                        <option value="8">网球</option>
                                    </Select>
                                )
                            }
                        </FormItem> 
                        <FormItem label="是否已婚" {...formItemLabel}>
                            {
                                getFieldDecorator('isMarried',{
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Switch/>
                                )
                            }
                        </FormItem>   
                        <FormItem label="生日" {...formItemLabel}>
                            {
                                getFieldDecorator('birthDate',{
                                    initialValue: moment('2018-10-24')
                                })(
                                    <DatePicker showTime format="YYYY-MM-DD" />
                                )
                            }
                        </FormItem>  
                        <FormItem label="联系地址" {...formItemLabel}>
                            {
                                getFieldDecorator('address',{
                                    initialValue: '湖南省长沙市芙蓉区'
                                })(
                                    <TextArea autosize={ {minRows:2,maxRows:4} } />
                                )
                            }
                        </FormItem> 
                        <FormItem label="早起时间" {...formItemLabel}>
                            {
                                getFieldDecorator('time',{
                                    initialValue: ''
                                })(
                                    <TimePicker />
                                )
                            }
                        </FormItem>  
                        <FormItem label="头像" {...formItemLabel}>
                            {
                                getFieldDecorator('userImg',{
                                    initialValue: ''
                                })(
                                    <Upload 
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        >
                                        {this.state.userImg? <img src={this.state.userImg} alt="userImg"/> : <Icon type="plus"/>}
                                    </Upload>
                                )
                            }
                        </FormItem> 
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('hasRead',{
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>已阅读协议并同意<a href="http://www.baidu.com">必读协议</a></Checkbox>
                                )
                            }
                        </FormItem>   
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('hasRead',{
                                })(
                                    <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                                )
                            }
                        </FormItem>                                                                                                                                                                                                                                                                                  
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Regist);