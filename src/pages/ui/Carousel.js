import React,{ Component } from 'react'
import { Card,Carousel }  from 'antd'

export default class Carousels extends Component {

    handleAfterChange = (a,b,c) => {
        console.log(a,b,c)
    }

    render () {
        return (
            <div>
                <Card title="文字轮播">
                    <Carousel afterChange={this.handleAfterChange}>
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播">
                    <Carousel autoplay effect="fade">
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" alt="carousel1" />
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-2.jpg" alt="carousel2" />
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt="carousel3" />
                        </div>
                    </Carousel>
                </Card>    
                <Card title="垂直显示">
                    <Carousel vertical>
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                    </Carousel>
                </Card>
                <Card title="切换效果渐显">
                    <Carousel effect="fade">
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                    </Carousel>
                </Card>  
                <Card title="定时切换">
                    <Carousel autoplay effect="fade">
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                    </Carousel>
                </Card>                       
            </div>
        )
    }
}