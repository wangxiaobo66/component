/**
 * Created by ping on 16/5/13.
 * 组件所需props：[1]键盘事件emit消息、[2]鼠标事件emit消息、[3]传入数组对象以生成List、[4]传入回调函数以提供选择后的返回值
 *      i. this.props = {
 *             dropdownMsg: [{
 *                 desc: 'string', 
 *                 id: 'string'
 *             }],
 *             defaultSelect: 'string'
 *         }
 *      ii. 回调函数dropdownReturn()
 * 组件所需消息：
 *      i. bodyKeyDown
 *      ii. bodyClick
 */

require('dropdown-menu.scss');

const util = require('util'),
    React = require('react'),
    render = require('react-dom').render,
    PropTypes = React.PropTypes;

export class DropdownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    render() {
        let { show } = this.state,
            dropdownButton = this.createDropdownButton('请选择'), //定义按钮显示的默认值
            menuListNodes = this.props.dropdownMsg.map((list, index) => {
                if ( this.props.defaultSelect ) { //初始化按钮的默认名称
                    dropdownButton = this.createDropdownButton(this.props.defaultSelect);
                }
                return ( //下拉菜单选项 (需要父集组件提供数组对象menuListNodes)
                    <li className="dropdown-menu-item" key={index} onClick={(e) => this.selectItem(e, list.id, list.desc)}>
                        { list.desc }
                    </li>
                );
            });
        return(
            <div className="module-dropdown-menu">
                <div className="dropdown-button" ref="dropdownButton" onClick={(e) => this.dropDown(e)}>
                    { dropdownButton }
                </div>
                <ul className={"dropdown-menu" + (show ? ' inline-block' : '')}>
                    { menuListNodes }
                </ul>
            </div>
        );
    }
    createDropdownButton(desc){
        return(
            <a ref="dropdownButtonName" href="javascript:;">{desc}</a>
        );
    }
    componentDidMount() {
        //激活（或关闭）下拉菜单的事件（需要在父集组件定义events-emitter的body点击事件'bodyClick'和body键盘事件'bodyKeyDown'）
        util.events.on('bodyClick', (e) => { //通过listShow判断点击按钮展开或者闭合下拉菜单
            let el = e.target,
                dropdownButton = this.refs.dropdownButton;
            if (!$.contains(dropdownButton, el)) { //判断如果点击的元素不是按钮本身的话
                this.setState({
                    show: false
                });
            }
        });
        util.events.on('bodyKeyDown', (e) => { //按ESC关闭下拉菜单
            if (e.keyCode === 27) {
                this.setState({
                    show: false
                });
            }
        });
    }
    dropDown(e) {
        this.setState({ //下拉菜单展开关闭切换
            show: !this.state.show
        });
    }
    selectItem(e, id, desc) { //选中下拉菜单选项的点击事件（需要在父集组件定义函数dropdownReturn），并且将按钮的“请选择”更新为点击的项目
        let _this = this;
        let dropdownReturn = this.props.dropdownReturn,
            dropdownButtonName = this.refs.dropdownButtonName;
        if (typeof dropdownReturn === 'function') {
            $(dropdownButtonName).text(desc);
            dropdownReturn(id, desc , _this);
            this.setState({
                show: false
            });
        }
    }
}

DropdownMenu.propTypes = {
    //所需数据类型格式限定
    dropdownMsg: PropTypes.arrayOf(React.PropTypes.object).isRequired, //数组对象，格式如：[{desc: 'string', id: 'string', def: true/false(only 1)}]
    dropdownReturn: PropTypes.func.isRequired //函数数据类型
};