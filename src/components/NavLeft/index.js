import React, { Component } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'
import MenuConfig from './../../config/menuConfig';
import './index.less'
const SubMenu = Menu.SubMenu;

class NavLeft extends Component {

    state = {
        currentKey: ''
    }

    componentWillMount () {
        const menuTreeNode = this.renderMenu(MenuConfig);
        const currentKey = window.location.hash.replace(/#|\?.*$/g,'');
        this.setState( () => ({
            menuTreeNode,
            currentKey
        }))
    }

    renderMenu = (data) => {
        return data.map((item) => {
            if ( item.children ) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            } 
            return (<Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item> )          
        })
    }

    handleMenuClick = ({item,key}) => {
        console.log(item);
        const { dispatch } = this.props; // 下面connect()(NavLeft)之后，才能取到dispatch
        dispatch(switchMenu(item.props.title));
        localStorage.setItem('menu',JSON.stringify(item.props.title))
        this.setState({
            currentKey: key
        })
    }

    render () {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>小毛单车</h1>
                </div>
                <Menu 
                    theme="dark" 
                    selectedKeys={this.state.currentKey}
                    onClick={ this.handleMenuClick }
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}

export default connect()(NavLeft);