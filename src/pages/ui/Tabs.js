import React,{ Component } from 'react'
import { Card,Tabs,Icon,Radio } from 'antd'
const TabPane = Tabs.TabPane

export default class Tab extends Component{

    newTabIndex = 0;
    componentWillMount () {
        const panes = [
            {
                title: 'tab 1',
                content: 'content of tab 1',
                key: '1',
                closable: false
            },
            {
                title: 'tab 2',
                content: 'content of tab 2',
                key: '2'
            },
            {
                title: 'tab 3',
                content: 'content of tab 3',
                key: '3'
                
            }          
        ]
        this.setState({
            activeKey: panes[0].key,
            panes
        })
    }

    constructor (props) {
        super(props)
        this.state = {
            mode: 'top'
        }
    }

    handleTabClick = (key) => {
        console.log(key)
    }

    handleModeChange = (e) => {
        const mode = e.target.value
        this.setState ( () => ({
            mode
        }))
    }

    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }

    onEdit = (targetKey,action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        })
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });    
    }   

    render () {
        return (
            <div>
                <Card title="tabs展示——默认选中第一项">
                    <Tabs defaultActiveKey="1" onChange={this.handleTabClick}>
                        <TabPane tab="Tab 1" key="1">content of tab 1</TabPane>
                        <TabPane tab="Tab 2" key="2">content of tab 2</TabPane>
                        <TabPane tab="Tab 3" key="3">content of tab 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="tabs展示——禁用某一项">
                    <Tabs defaultActiveKey="1" onChange={this.handleTabClick}>
                        <TabPane tab="Tab 1" key="1">content of tab 1</TabPane>
                        <TabPane tab="Tab 2" disabled key="2">content of tab 2</TabPane>
                        <TabPane tab="Tab 3" key="3">content of tab 3</TabPane>
                    </Tabs>
                </Card> 
                <Card title="tabs展示——带图标的">
                    <Tabs defaultActiveKey="2" onChange={this.handleTabClick}>
                        <TabPane tab={<span><Icon type="apple" />tab 1</span>} key="1">content of tab 1</TabPane>
                        <TabPane tab={<span><Icon type="android"/>tab 2</span>} key="2">content of tab 2</TabPane>
                        <TabPane tab={<span><Icon type="plus"/>tab 3</span>} key="3">content of tab 3</TabPane>
                    </Tabs>
                </Card> 
                <Card title="tabs展示——上下、左右滑动">
                    <Radio.Group onChange={this.handleModeChange} value={this.state.mode} style={{marginBottom: 8}}>
                        <Radio.Button value="top">top</Radio.Button>
                        <Radio.Button value="left">left</Radio.Button>
                        <Radio.Button value="right">right</Radio.Button>
                        <Radio.Button value="bottom">bottom</Radio.Button>
                    </Radio.Group>
                    <Tabs defaultActiveKey="2" 
                        onChange={this.handleTabClick}
                        tabPosition={this.state.mode}
                        style={{height:220}}
                    >
                        <TabPane tab="tab 1" key="1">content of tab 1</TabPane>
                        <TabPane tab="tab 2" key="2">content of tab 2</TabPane>
                        <TabPane tab="tab 3" key="3">content of tab 3</TabPane>
                        <TabPane tab="tab 4" key="4">content of tab 4</TabPane>
                        <TabPane tab="tab 5" key="5">content of tab 5</TabPane>
                        <TabPane tab="tab 6" key="6">content of tab 6</TabPane>
                        <TabPane tab="tab 7" key="7">content of tab 7</TabPane>
                        <TabPane tab="tab 8" key="8">content of tab 8</TabPane>
                        <TabPane tab="tab 9" key="9">content of tab 9</TabPane>
                        <TabPane tab="tab 10" key="10">content of tab 10</TabPane>
                    </Tabs>
                </Card>
                <Card title="tabs展示——添加、删除">
                    <Tabs defaultActiveKey="2" 
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map( (item) => {
                                return (
                                    <TabPane tab={item.title} key={item.key} closable={item.closable}>{item.content}</TabPane>
                                )
                            })
                        }
                    </Tabs>
                </Card>                                                              
            </div>
        )
    }
}