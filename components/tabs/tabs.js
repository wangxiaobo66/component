/* 
 * Created by ping on 16/6/19.
 * 组件所需props:
 *   i. tabsData: [{
 *       name: '要显示的列表代号',
 *       desc: '列表名称',
 *       selected: true/false, //是否被选中(唯一)，未被选中无次属性
 *       statusStr: '已激活',
 *       requestData: (范例){"page": 1, "count": 10}, //请求的页码和单页行数
 *    }]
 *   ii. dispatch action: (范例)fetchSelfModules 获取列表的发action方法，并在clickIcon方法里执行，利用switch依据tabsData.name来执行不同的action;
 *   iii. dispatch, 用于执行tabsSwitch action以切换选项卡选中高亮图标
 */

require('tabs.scss');
const util = ('util');
const React = require('react');
const render = require('react-dom').render;
const {tabsSwitch} = require('actions');

export class Tabs extends React.Component {
    constructor(props) {
        super(props);
    }

    createTabs() {
        let {tabsData} = this.props;
        if (!tabsData) {
            tabsData = [];
        }
        let tabsNode = [];
        for (let i = 0, len = tabsData.length; i < len; i++) {
            let {name, desc, selected, requestData} = tabsData[i];
            let selectedClass = 'icon-weixuanzhong';
            if (selected) {
                selectedClass = 'icon-xuanzhong';
            }
            tabsNode.push(
                <li className="tabs-item" key={i} onClick={(e) => this.clickIcon(e, i, name, selected, requestData)}>
                    <i className={'iconfont ' + selectedClass}></i>
                    <span className="tabs-name">{desc}</span>
                </li>
            );
        }
        return tabsNode;
    }

    render() {
        return(
            <div className="module-tabs">
                <ul className="tabs-content">
                    {this.createTabs()}
                </ul>
            </div>
        );
    }

    clickIcon(e, i, name, selected, requestData) {
        let {dispatch, achieveSelfModules, achieveCombineModules, tabsData} = this.props;
        if (!selected) {
            dispatch(tabsSwitch(tabsData, i));
            switch(name) {
                case 'selfModules':
                    return achieveSelfModules(requestData);
                case 'combineModules':
                    return achieveCombineModules(requestData);
            }
        }
    }
}