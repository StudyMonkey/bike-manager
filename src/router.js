import React, { Component } from 'react';
import { HashRouter,Route,Switch,Redirect } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Home from './pages/home'
import Buttons from './pages/ui/Buttons'
import Modal from './pages/ui/Modal'
import Loading from './pages/ui/loading'
import Notice from './pages/ui/notice'
import Message from './pages/ui/Message'
import Tabs from './pages/ui/Tabs'
import Gallery from './pages/ui/Gallery'
import Carousel from './pages/ui/Carousel'
import FormLogin from './pages/form/Login'
import FormRegist from './pages/form/Regist'
import Basic from './pages/table/Basic'
import High from './pages/table/High'
import Rich from './pages/rich'
import CityIndex from './pages/city'
import OrderIndex from './pages/order'
import Common from './Common'
import OrderDetail from './pages/order/Detail'
import UserIndex from './pages/user'
import BikeMap from './pages/map/bikeMap'
import ChartBar from './pages/chart/bar'
import ChartPie from './pages/chart/pie'
import ChartLine from './pages/chart/line'
import PermissionIndex from './pages/permission'
import NoMatch from './pages/nomatch'

export default class IRouter extends Component {
    render () {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={ Login } />
                        <Route path="/common" render={ ()=> 
                            <Common>
                                <Switch>
                                    <Route path="/common/order/detail/:orderId" component={ OrderDetail }></Route>
                                    <Route component={ NoMatch }></Route>
                                </Switch>
                            </Common>
                        }/>                        
                        <Route path="/" render={() => 
                            <Admin>
                                <Switch>                                    
                                    <Route path="/home" component={ Home } />
                                    <Route path="/ui/buttons" component={ Buttons }></Route>
                                    <Route path="/ui/modals" component={ Modal }></Route>
                                    <Route path="/ui/loadings" component={ Loading }></Route>
                                    <Route path="/ui/notification" component={ Notice }></Route>
                                    <Route path="/ui/messages" component={ Message }></Route>
                                    <Route path="/ui/tabs" component={ Tabs }></Route>
                                    <Route path="/ui/gallery" component={ Gallery }></Route>
                                    <Route path="/ui/carousel" component={ Carousel }></Route>
                                    <Route path="/form/login" component={ FormLogin }></Route>
                                    <Route path="/form/reg" component={ FormRegist }></Route>
                                    <Route path="/table/basic" component={ Basic }></Route>
                                    <Route path="/table/high" component={ High }></Route>
                                    <Route path="/rich" component={ Rich }></Route>
                                    <Route path="/city" component={ CityIndex }></Route>
                                    <Route path="/order" component={ OrderIndex }></Route>
                                    <Route path="/user" component={ UserIndex }></Route>
                                    <Route path="/bikeMap" component={ BikeMap }></Route>
                                    <Route path="/charts/bar" component={ ChartBar }></Route>
                                    <Route path="/charts/pie" component={ ChartPie }></Route>
                                    <Route path="/charts/line" component={ ChartLine }></Route>
                                    <Route path="/permission" component={ PermissionIndex }></Route>
                                    <Redirect to="/home" />
                                    <Route component={ NoMatch }  />
                                </Switch>
                            </Admin>
                        }/>
                        <Route component={ NoMatch } />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
} 