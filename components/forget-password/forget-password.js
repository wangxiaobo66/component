/**
 * Created by wangxiaobo on 16/6/30.
 */
require('forget-password.scss');
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
const { GoEmail } = require('go-email');
let store = createStore(scorewebStore, applyMiddleware(thunk));

export class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        let hash = location.hash.replace("#", "");
        let { goEmail } = this.props;
        if (hash === "goEmail"){
            goEmail = true;
        }
        this.state = {
            emailName:''
        }
    }

    render() {
        let { getShow , goEmail } = this.props;
        let {emailName } = this.state;
        return (
            <div>
                <div className={"module-forget-password" + (getShow?'': goEmail?'':' show')}>
                    <p className="p">忘记密码</p>
                    <div className="div"><span></span><input type="text" className="input" placeholder="请输入您的邮箱"
                                                             ref="email" onBlur={(e) => this.blur(e)}/></div>
                    <a href="javascript:;" className="submit" onClick={(e) => this.submit()}>发送验证邮箱</a>
                    <p className="error">{emailName}</p>
                </div>
                <GoEmail
                    goEmail={goEmail}/>
            </div>
        )
    }

    blur(e){
        let value = e.target.value;
        if(!value){
            this.setState({
                emailName:'请输入您的邮箱'
            })
        }else {
            if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
                this.setState({
                    emailName:''
                })
            }else {
                this.setState({
                    emailName:'请输入正确的邮箱'
                })
            }
        }
    }

    submit(){
        let email = this.refs.email.value;
        if(!email){
            this.setState({
                emailName:'请输入您的邮箱'
            })
        }else {
            if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
                this.setState({
                    emailName:''
                })
                location.hash = "goEmail";
                let data = { email:email };
                this.props.sendEmail(data)
            }else {
                this.setState({
                    emailName:'请输入正确的邮箱'
                })
            }
        }

    }
}