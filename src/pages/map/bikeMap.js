import React,{ Component } from 'react'
import { Card } from 'antd'
import axios from './../../axios'
import BaseForm from './../../components/BaseForm'

export default class bikeMap extends Component{

    state = {};

    map = '';

    params = {};

    formList = [
        {
            type: '城市'
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '0',
            list: [
                {id: '0', name: '全部'},
                {id: '1', name: '进行中'},
                {id: '2', name: '进行中(临时锁车)'},
                {id: '3', name: '行程结束'}
            ]
        }
    ];

    requestList = () => {
        axios.ajax({
            url: '/map/bike_list',
            data: {
                params: this.params
            }
        }).then( (res) => {
            if ( res.code === 200 ) {
                this.setState({
                    total_count: res.result.total_count
                })
                this.renderMap(res);
            }
        })
    }

    handleFilterSubmit = (filterParams) => {
        this.params = filterParams;
        this.requestList();
    }

    // 渲染地图数据
    renderMap = (res) => {
        const list = res.result.route_list
        this.map = new window.BMap.Map('container');
        const gps1 = list[0].split(',');
        const startPoint = new window.BMap.Point(gps1[0], gps1[1]);
        const gps2 = list[list.length-1].split(',');
        const endPoint = new window.BMap.Point(gps2[0], gps2[1]);
        this.map.centerAndZoom(endPoint,11);

        const startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        const bikeMarkerStart = new window.BMap.Marker(startPoint,{ icon: startPointIcon})
        this.map.addOverlay(bikeMarkerStart)
        const endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        const bikeMarkerEnd = new window.BMap.Marker(endPoint,{ icon: endPointIcon })  
        this.map.addOverlay(bikeMarkerEnd)  
        
        // 绘制车辆行驶路线
        let routeList = [];
        list.forEach(e => {
            let p = e.split(',');
            routeList.push(new window.BMap.Point(p[0],p[1]))
        });

        const polyLine = new window.BMap.Polyline(routeList,{
            strokeColor: '#ef4136',
            strokeWeight: 2,
            strokeOpacity: 1
        });       
        this.map.addOverlay(polyLine);

        // 绘制服务区
        let servicePointList = [];
        let serviceList =  res.result.service_list;
        serviceList.forEach(e => {
            servicePointList.push(new window.BMap.Point(e.lon,e.lat))
        })

        let pplyServiceLine = new window.BMap.Polyline(servicePointList, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1        
        });
        this.map.addOverlay(pplyServiceLine);

        // 添加地图中的自行车图标
        let bikeList = res.result.bike_list;
        const bikeIcon = new window.BMap.Icon('/assets/bike.jpg',new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        });
        bikeList.forEach( e => {
            let p = e.split(',');
            let point = new window.BMap.Point(p[0],p[1]);
            let bikeMarker = new window.BMap.Marker(point,{icon: bikeIcon});
            this.map.addOverlay(bikeMarker);
        });

    }

    componentWillMount(){
        this.requestList();
    }

    render () {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
                </Card>
                <Card>
                    <div>
                        <div>共{this.state.total_count}辆车</div>
                        <div id="container" style={{height: 500}}></div>
                    </div>
                </Card>
            </div>
        )
    }
}