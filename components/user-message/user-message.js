/**
 * Created by wangxiaobo on 16/5/24.
 */
require('user-message.scss');
const React = require('react');
const render = require('react-dom').render;
const util = require('util');
let PropTypes = React.PropTypes;

export class Message extends React.Component {//定义一个LeftNav组件,类定义法替代React.createClass 方法来定义一个组件
    constructor(props) {
        super(props);//props传递
        let {listMessage} = this.props.userMessage;
        this.state = {
            list: listMessage,
            me: {},
            show: false
        }
    }

    render() {
        let {show,list,me} = this.state;
        return (<div className="module-user-message clearfix">
            <p className={"head" +(show ? '':' header')} onClick={(e) => this.show()}>基本信息<span className="iconfont spanArrows"></span></p>
            <div className={"div clearfix" +(show ? '' : ' after')}>
                <ul className="ul clearfix">
                    <li className="li">
                        <label key="labelName" className="label">用户名</label>
                        <p className="p">{list.user}</p>
                    </li>
                    <li className="li">
                        <label key="labelMobile" className="label"><span className="span after">*</span>手机号码</label>
                        <input type="text" className={"input" +(me.mobile ? ' red-border':'')} value={list.mobile}
                               onChange={(e) => this.handleChange(e, "mobile")} onBlur={(e) => this.blur(e,"mobile")}/>
                        <p className={"hint" +(me.mobile ? ' verify':'')}>{me.mobileName}</p>
                    </li>
                    <li className="li">
                        <label key="labelRealName" className="label">真实姓名</label>
                        <input type="text" className="input" value={list.realName}
                               onChange={(e) => this.handleChange(e,"realName")}/>
                    </li>
                    <li className="li">
                        <label key="labelEmail" className="label"><span className="span after">*</span>电子邮箱</label>
                        <input type="text" className={"input" +(me.email ? ' red-border':'')} value={list.email}
                               onChange={(e) => this.handleChange(e,"email")} onBlur={(e) => this.blur(e,"email")}/>
                        <p className={"hint" +(me.email ? ' verify':'')}>{me.emailName}</p>
                    </li>
                    <li className="li">
                        <label key="labelDepartment" className="label">所在公司</label>
                        <input type="text" className="input" value={list.department}
                               onChange={(e) => this.handleChange(e,"department")}/>
                    </li>
                </ul>
                <div>
                    <a href="javascript:;" className="a submit" onClick={(e) => this.submit()}>提交</a>
                </div>
            </div>
        </div>)
    }

    componentWillReceiveProps(nextProps) {
        let list = nextProps.userMessage.listMessage;
        this.setState({
            list: list
        });
    }

    handleChange(e, name) {
        let {list} = this.state;
        let value = e.target.value;
        switch (name) {
            case "mobile":
                list.mobile = value;
                break;
            case "realName":
                list.realName = value;
                break;
            case "email":
                list.email = value;
                break;
            case "department":
                list.department = value;
                break;
        }
        this.setState({
            list: list
        })
    }

    mobile(value) {
        let {me}=this.state;
        if (/^(13|15|18)\d{9}$/.test(value)) {
            me.mobile = false;
        } else {
            me.mobile = true;
            me.mobileName = "请输入正确的手机号码";
        }
        this.setState({
            me: me
        })
    }

    email(value) {
        let { me } = this.state;
        if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
            me.email = false;
        } else {
            me.email = true;
            me.emailName = "请输入正确的电子邮箱";
        }
        this.setState({
            me: me
        })
    }

    blur(e, name) {
        let {me} = this.state;
        let value = e.target.value;
        if (!value) {
            switch (name) {
                case "mobile":
                    me.mobile = true;
                    me.mobileName = "手机号码不能为空";
                    break;
                case "email":
                    me.email = true;
                    me.emailName = "电子邮箱不能为空";
                    break;
            }
        } else {
            switch (name) {
                case "mobile":
                    me.mobile = false;
                    this.mobile(value);
                    break;
                case "email":
                    me.email = false;
                    this.email(value);
                    break;
            }
        }
        this.setState({
            me: me
        })
    }

    submit() {
        let { list , me } = this.state;
        if (!me.mobile&&!me.email) {
            if (!list.mobile) {
                me.mobile = true;
                me.mobileName = "手机号码不能为空";
            }
            if (!list.email) {
                me.email = true;
                me.emailName = "电子邮箱不能为空";
            }
            if (list.mobile && list.email) {
                this.props.modifySelfInfo(list);
                console.log(1)
            }
        } else {
            return false;
        }
        this.setState({
            me: me
        })
    }

    show() {
        let {show} = this.state;
        if (show) {
            show = false;
        } else {
            show = true;
        }
        this.setState({
            show: show
        })
    }
}