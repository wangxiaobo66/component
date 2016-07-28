/**
 * Created by wangxiaobo on 16/6/30.
 */
require('go-email.scss');
require('normalize');
require('base');
require('es6-shim');
const React = require('react');
const render = require('react-dom').render;
const { createStore, applyMiddleware} = require('redux');
const { Provider }= require('react-redux');
const { scorewebStore } = require('reducers');
const { connect } = require('react-redux');
const thunk = require('redux-thunk').default;
const util = require('util');
let store = createStore(scorewebStore, applyMiddleware(thunk));

export class GoEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let { goEmail } = this.props;
        return (
            <div className={"module-go-email"+ (goEmail?' show':'')}>
                <p className="title">我们已经向您的注册邮箱457117157@qq.com发送了一份密码找回邮件,请您注意接收邮件</p>
                <a className="submit" href="javascript:;">去邮箱接收邮件</a>
                <p className="text">请注意查收邮件,并按照邮件中的提示操作,完成安全认证.没有收到邮件?<a className="a" href="javascript:;" onClick={(e) => this.aClick()}>重新发送</a></p>
            </div>
        )
    }

    aClick(){
        location.hash = "forget";
    }
}