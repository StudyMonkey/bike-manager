import React,{ Component } from 'react';
import { Card } from 'antd';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class ChartLine extends Component{

    getOption = () => {
        const option = {
            title: {
                text: '用户骑行订单'
            },
            xAxis: {
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            tooltip: {
                trigger: 'axis'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [1000, 2000, 1500, 2500, 3000, 2800, 4500, 3500]
                }
            ]            
        }
        return option
    }

    getOption2 = () => {
        const option = {
            title: {
                text: '用户骑行订单'
            },
            legend: {
                data: ['OFO订单量','摩拜订单量','小毛订单量']
            },
            xAxis: {
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            tooltip: {
                trigger: 'axis'
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',
                    data: [1000, 2000, 1500, 2500, 3000, 2800, 4500, 3500]
                },
                {
                    name: '摩拜订单量',
                    type: 'line',
                    data: [1000, 2000, 5500, 6500, 3000, 8800, 10500, 12000]
                },
                {
                    name: '小毛订单量',
                    type: 'line',
                    data: [800, 2000, 2500, 4500, 6000, 8800, 11500, 13500]
                }               
            ]            
        }
        return option        
    }

    getOption3 = () => {
        const option = {
            title: {
                text: '用户骑行订单'
            },
            xAxis: {
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            tooltip: {
                trigger: 'axis'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [1000, 2000, 1500, 2500, 3000, 2800, 4500, 3500],
                    areaStyle: {}
                }
            ]            
        }
        return option
    }    

    render (){
        return (
            <div>
                <Card title="线性图表之一">
                    <ReactEcharts option={this.getOption()} style={{height: 500}} />
                </Card>
                <Card title="线性图表之二">
                    <ReactEcharts option={this.getOption2()} style={{height: 500}} />
                </Card>
                <Card title="线性图表之一">
                    <ReactEcharts option={this.getOption3()} style={{height: 500}} />
                </Card>                                
            </div>
        )
    }
}