/**
 * Created by wangxiaobo on 16/6/13.
 */
require('modify-password.scss');
const React = require('react');
const render = require('react-dom').render;
const util = require('util');
let PropTypes = React.PropTypes;

export class ModifyPassword extends React.Component {
    constructor(props) {
        super(props);//props传递
        this.state={
            pass:{},
            oldPass:"",
            newPass:"",
            show: false
        }
    }

    render() {
        let { src , show , pass } = this.state;
        let { resultInfo } = this.props.userMessage;
        return (<div className="module-modify-password clearfix">
            <p className={"head" +(show ? ' header':'')} onClick={(e) => this.show()}>修改密码<span
                className="iconfont spanArrows"></span></p>
            <div className={"div clearfix" +(show ? ' after' : '')}>
                <ul className="ul clearfix">
                    <li className="li">
                        <label key="label" className="label">原始密码</label>
                        <input type="password" className={"input" +(pass.old ? ' red-border':'')} onBlur={(e) => this.blur(e,"old")}/>
                        <p className={"hint" +(pass.old ? ' verify':'')}>{pass.oldName}</p>
                    </li>
                    <li className="li">
                        <label key="label" className="label">新密码</label>
                        <input type="password" className={"input" +(pass.newOne ? ' red-border':'')} onBlur={(e) => this.blur(e,"newOne")}/>
                        <p className={"hint" +(pass.newOne ? ' verify':'')}>{pass.newOneName}</p>
                    </li>
                    <li className="li">
                        <label key="label" className="label">确认新密码</label>
                        <input type="password" className={"input" +(pass.newTwo ? ' red-border':'')} onBlur={(e) => this.blur(e,"newTwo")}/>
                        <p className={"hint" +(pass.newTwo ? ' verify':'')}>{pass.newTwoName}</p>
                    </li>
                    <li className="li">
                        <label key="label" className="label"><span className="span after">*</span>验证码</label>
                        <input type="text" className="input code" maxLength="4" onBlur={(e) => this.blur(e,"verifyCode")}/>
                        <p className={"hint" +(pass.code ? ' verify':'')}>{pass.codeName}</p>
                        <img src={src} className="CodeImg" ref="codeImg"
                             onClick={(e) => this.handleClick()}/>
                        <p className={"hint"}></p>
                    </li>
                </ul>
                <div>
                    <a href="javascript:;" className="a submit" onClick={(e) => this.submitPassword()}>提交</a>
                </div>
            </div>
        </div>)
    }

    componentWillReceiveProps(nextProps) {
        //let result = nextProps.userMessage.resultInfo;
        let src = nextProps.userMessage.src;
        this.setState({
            src: src
        });
    }

    show(){
        let {show} = this.state;
        let newShow;
        if (show) {
            newShow = false;
        } else {
            newShow = true;
        }
        this.setState({
            show: newShow
        })
    }

    blur(e,name){
        let { newPass , pass }=this.state;
        let newPas = {};
        let value = util.base64encode(e.target.value),newValue="";
        let password = {password:value};
        switch (name){
            case 'old':
                if(!value){
                    newPas.old = true;
                    newPas.oldName = "请输入原始密码"
                }else {
                    newPas.old = false;
                    this.props.verifyOldPassWord(password)
                    this.setState({
                        oldPass:value
                    })
                }
                break;
            case 'newOne':
                if(!value){
                    newPas.newOne = true;
                    newPas.newOneName = "请输入新密码"
                }else {
                    newPas.newOne = false;
                    this.setState({
                        newPass:value
                    })
                }
                break;
            case 'newTwo':
                if(!value){
                    newPas.newTwo = true;
                    newPas.newTwoName = "请再次输入新密码"
                }else{
                    console.log(newValue)
                    if(value===newPass){
                        newPas.newTwo = false;
                    }else {
                        newPas.newTwo = true;
                        newPas.newTwoName = "两次输入的密码必须一致"
                    }
                }
                break;
            case 'verifyCode':
                let code = e.target.value;
                if(code.length >= 4){
                    let validateCode = {validateCode:code}
                    console.log(code)
                    this.props.verifyCode(validateCode)
                }
                break;
        }
        this.setState({
            pass:Object.assign({}, pass, newPas)
        })
    }
    handleClick(){
        let src = "/scoreManagement/user/createCaptcha?" + new Date().getTime();
        this.setState({
            src: src
        });
    }
    handlerKeyUp(e){
        let code = e.target.value;
        if (code.length >= 4) {
            let validateCode = {validateCode:code}
            this.props.verifyCode(validateCode)
        }
    }
    submitPassword(){
        let { oldPass , pass , newPass } =this.state;
        let newPas = {};
        if(pass.old!==false){
            newPas.old = true;
            newPas.oldName = "请输入原始密码"
        }
        if(pass.newOne!==false){
            newPas.newOne = true;
            newPas.newOneName = "请输入新密码"
        }
        if(pass.newTwo!==false){
            newPas.newTwo = true;
            newPas.newTwoName = "请再次输入密码"
        }
        if(!pass.old&&!pass.newOne&&!pass.newTwo){
            let data = {oldPassword:oldPass,newPassword:newPass}
            this.props.modifyPassWord(data)
        }
        this.setState({
            pass:Object.assign({}, pass, newPas)
        })
    }
}