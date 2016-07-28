/**
 * Created by ping on 16/5/25.
 * 组件所需props:
 *  userInfo: {
 *      username: 'string',
 *      details: [
 *          {name: 'string', value: 'string'}
 *      ]
 *  }
 */
require('header.scss');
const React = require('react');
const render = require('react-dom').render;
let PropTypes = React.PropTypes;

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    createUserMenu() {
        let {details} = this.props.userInfo;
        let userMenuNode = [];
        for (let i = 0, len = details.length; i < len; i++) {
            userMenuNode.push(
                <li key={i}>
                    <span className="list-name">{details[i].name}</span>
                    <span className="list-value">{details[i].value}</span>
                </li>
            );
        }
        return userMenuNode;
    }

    render() {
        let logo = require('js/components/header/images/header-logo.png') + ' 1x,' + require('js/components/header/images/header-logo@x2.png') + ' 2x';
        return (
            <div className="module-header">
                <div className="header-body">
                    <a href="javascript:;" className="logo pull-left">
                        <img src={require('js/components/header/images/header-logo.png')} srcSet={logo} alt="汇百川征信" title="汇百川征信" />
                    </a>
                    <div className="header-status pull-right">
                        <a className="username-logo" href="javascript:;"></a>
                        <div className="username">
                            <a href="/userInfo" className="username-setting">{scoreweb.username}</a>
                        </div>
                        <div className="logout">
                            <a href="javascript:;">退出</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    userInfo: PropTypes.object.isRequired
}