/**
 * Created by wangxiaobo on 16/4/8.
 */
require('left-nav.scss');
const _ = require('lodash/Lang');
const React = require('react');
const render = require('react-dom').render;
let PropTypes = React.PropTypes;
const leftList = [
    {
        "name": "客户管理",
        "iconclass": "icon-kehuguanli",
        "children":[
            {
                "name":"试用申请客户",
                "role":[0],
                "href":'applyCompany'
            },
            {
                "name":"商务客户",
                "role":[0],
                "href":'companyList'
            }
        ]
    },
    {
        "name": "数据统计",
        "iconclass": "icon-shujutongji",
        "children": [
            {
                "name": "查询次数统计",
                "role": [0],
                "href":'queryStatistics'
            },
            {
                "name":"预警",
                "role":[0],
                "href":'earlyWarning'
            }
        ]
    },
    {
        "name": "模型管理",
        "iconclass": "icon-moxingguanli",
        "children": [
            {
                "name": "模型管理",
                "role": [0],
                "href":'modManage'
            }
        ]
    },
    {
        "name": "操作日志",
        "iconclass": "icon-caozuorizhi",
        "children": [
            {
                "name": "日志列表",
                "role": [0],
                "href":'userLogs'
            }
        ]
    },
    {
        "name": "我的设置",
        "iconclass": "icon-wodeshezhi",
        "children": [
            {
                "name": "我的设置",
                "role": [0],
                "href":'userInfo'
            }
        ]
    }
];

export class LeftNav extends React.Component {//定义一个LeftNav组件,类定义法替代React.createClass 方法来定义一个组件
    dataHandling() {//根据权限显示数据
        let dataList = _.cloneDeep(leftList);
        let {role} = this.props;
        for (let i = 0, len = dataList.length; i < len; i++) {
            let child = dataList[i].children;
            if (child) {
                let jlen = child.length;
                for (let j = 0; j < jlen; j++) {
                    let roles = (child[j].role.join("").indexOf(role));
                    if (roles === -1) {
                        child.splice(j, 1);
                        jlen--;
                        j--;
                    }
                }
                if (child.length === 0) {
                    dataList.splice(i, 1);
                    len--;
                    i--;
                }
            }
        }
        return dataList;
    }

    constructor(props) {//类的 constructor 现在假设 role 之前是通过 componentWillMount 填充的;服务器端和客户端都只调用一次，在初始化渲染执行之前立刻调用。如果在这个方法内调用 setState，render() 将会感知到更新后的 state，将会执行仅一次，尽管 state 改变了。
        super(props);//props传递
        //let {select} = this.props;//this.props为传递的对象,通过{let,select}取对向上的属性
        /*let dataList = this.dataHandling();
        let orignMaps = _.cloneDeep(dataList);//对list进行克隆
        let maps = _.cloneDeep(dataList);//同上

        maps[select[0]].active = true;//取select表示第几个选项的第几个子项被选中,设置active为true,添加class=after
        if (select.length > 1) {
            maps[select[0]].children[select[1]].active = true;
        }
        this.state = {//状态机,初始状态
            maps: maps,
            orignMaps: orignMaps
        };*/
    }

    handleClick(e, index) {//点击选项事件,并用数据触发事件
        /*let {orignMaps} = this.state;
        let list = _.cloneDeep(orignMaps);//克隆一个list表并根据点击事件,改变数据
        list[index].active = true;//点哪一个就设置哪一个的active为true
        this.setState({//重置状态机
            maps: list//使把改变后的list将maps替代
        });*/
        let firstVale = [index]
        this.props.leftNavFirst(firstVale);
    }

    liClick(e, index, cindex, location) {//点击子项事件,同上个事件
        let {select} = this.props;
        if (select[0] === index && select[1] === cindex) {
            return
        }
        window.location.href = location.toString();
        console.log(index, cindex, location)
        let nextVale = [index,cindex];
        this.props.leftNavNext(nextVale);
    }

    render() {
        let {select} = this.props;
        let dataList = this.dataHandling();
        var listdom = [];//定义一个空数组
        dataList[select[0]].active = true;//取select表示第几个选项的第几个子项被选中,设置active为true,添加class=after
        if (select.length > 1) {
            dataList[select[0]].children[select[1]].active = true;
        }
        dataList.map((obj, index) => {//将maps里的数据map出来
            listdom.push(//并push到listdom中
                <a onClick={(e) => this.handleClick(e, index)} key={obj.iconclass + index + 'a'}
                   data-id={index}//点击选项事件,根据三元运算符获取该数据的active属性,如果为true添加class:after,为false则为空
                   className={"left-nav-button" + (obj.active ? ' after' : '')}>
                        <span key={obj.iconclass + index + 'span'}//同上
                              className={"left-nav-strip" + (obj.active ? ' after' : '')}></span>
                    <i key={obj.iconclass +index + 'i'} className={"left-nav-icon iconfont " +(obj.iconclass)}></i>
                    {obj.name}
                    <i key={obj.iconclass +index + 'arrow'}
                       className={"iconfont-arrow left-nav-right-icon " + (obj.active ? 'arrow-right' : 'arrow-down')}></i>
                </a>
            );

            let lis = [];//定义一个空数组
            if (obj.children !== undefined) {
                obj.children.map((obj, cindex) => {
                    lis.push(
                        <a href={obj.href} className="color-a" key={obj.href + cindex + 'a'}>
                            <li key={obj.href + cindex} className={"left-nav-options" + (obj.active ? ' after' : '')}
                            onClick={(e) => this.liClick(e, index, cindex)}>{obj.name}</li>
                        </a>
                    );
                });

                listdom.push(
                    <ul key={obj.iconclass + index + 'ul'}
                        className={"left-nav-case" + (obj.active ? ' after' : '')}>{lis}</ul>
                );
            }
        });
        return <div id="leftNav" className="leftNav clearfix">{listdom}</div>;
    }
    componentWillReceiveProps(nextProps) {


    }
}

LeftNav.propTypes = {
    //role: PropTypes.number.isRequired,//数字格式,必须
    /*
     *例子:
     * 0
     */
    select: PropTypes.array.isRequired//数组格式,必须
    /*
     *例子:
     *[2,1]
     */
};