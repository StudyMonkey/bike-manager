import React,{ Component } from 'react';
import { Form,Button, Select,Checkbox,Radio, Input, DatePicker } from 'antd';
import Utils from './../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option 

class CommonForm extends Component {

    handleFilterSubmit = () => {
        let fieldValue = this.props.form.getFieldsValue();
        console.log(fieldValue);
        this.props.filterSubmit(fieldValue)
    }

    reset = () => {
        this.props.form.resetFields();
    }

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if ( formList && formList.length > 0 ) {
            formList.forEach( (item,i) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if ( item.type === '城市' ) {
                    const city = <FormItem label="城市" key={ field }>
                        {
                            getFieldDecorator('city',{
                                initialValue: '0'
                            })(
                                <Select 
                                    style={{width: 80}}
                                    placeholder={placeholder}
                                >
                                    { Utils.getOptionList([{id: '0',name: '全部'},{id: '1',name: '北京'},{id: '2',name: '上海'}]) }
                                </Select>
                            )
                        }
                    </FormItem>
                    formItemList.push(city)
                } else if ( item.type === '时间查询' ) {
                    const begin_time = <FormItem label="订单时间" key={field}>
                        {
                            getFieldDecorator('begin_time')(
                                <DatePicker 
                                    showTime={ true }
                                    format="YYYY-MM-DD HH-mm-ss"
                                />
                            )
                        }
                    </FormItem>
                    formItemList.push(begin_time)
                    const end_time = <FormItem label="~" colon={ false } key={ field }>
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker 
                                    showTime= { true }
                                    format="YYYY-MM-DD HH-mm-ss"
                                />
                            )
                        }
                    </FormItem>
                    formItemList.push(end_time)
                } else if ( item.type === 'INPUT' ) {
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue: initialValue
                            })(
                                <Input type="text" placeholder={ placeholder } />
                            )
                        }
                    </FormItem>
                    formItemList.push(INPUT);
                } else if ( item.type === 'SELECT' ) {
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue: initialValue
                            })(
                                <Select 
                                    style={{width: width}}
                                    placeholder={placeholder}
                                >
                                    { Utils.getOptionList(item.list) }
                                </Select>
                            )
                        }
                    </FormItem>
                    formItemList.push(SELECT);
                } else if ( item.type === 'CHECKBOX' ) {
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                valuePropName: 'checked', // 控制checkbox是否选中的初始值
                                initialValue: initialValue
                            })(
                                <Checkbox>
                                    { label }
                                </Checkbox>
                            )
                        }
                    </FormItem>
                    formItemList.push(CHECKBOX)
                } else if ( item.type === 'DATE' ) {
                    const DATE = <FormItem label={ label } key={ field }>
                        {
                            getFieldDecorator([field])(
                                <DatePicker 
                                    showTime= { true }
                                    format="YYYY-MM-DD HH-mm-ss"
                                />
                            )
                        }
                        </FormItem>
                    formItemList.push(DATE)
                }

            });
        }
        return formItemList;
    }

    render () {
        return (
            <Form layout="inline">
                { this.initFormList() }
                
                <FormItem>
                    <Button type="primary" onClick={ this.handleFilterSubmit }>查询</Button>
                    <Button onClick={ this.reset }>重置</Button>
                </FormItem>                 
            </Form>
        )
    }
}

export default Form.create({})(CommonForm)