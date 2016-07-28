/* 
 * Created by ping on 16/5/19.
 *
 */

require('table-plugins.scss');
const uitl = require('util');
const React = require('react');
const render = require('react-dom').render;
let PropTypes = React.PropTypes;

export class TablePlugins extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     'sure': {
        //         desc: '确定',
        //         type: 'primary',
        //         size: 'small',
        //         option: (id) => {
        //             btnGroupSure('确定，id是' + id);
        //         }
        //     }, 
        //     'modify': {
        //         desc: '修改',
        //         type: 'info',
        //         size: 'small',
        //         option: (id) => {
        //             btnGroupModify('修改，id是' + id);
        //         }
        //     },
        //     'delete': {
        //         desc: '删除',
        //         type: 'danger',
        //         size: 'small',
        //         option: (id) => {
        //             btnGroupDelete('删除，id是' + id);
        //         }
        //     }
        // }
    }

    createBtns () {
        let {btnsMsg, rowList} = this.props;
        let btnsNode = [];
        if (btnMsg) {
            for (let i = 0, len = btnMsg.length; i < len; i++) {
                let {type, desc, func} = btnsMsg[i];
                btnGroupNode.push(
                    <a href="javascript:;" key={i} className={"btn-" + type} onClick={() => func(rowList.id)}>{desc}</a>
                );
            }
            return btnGroupNode;
        }
    }

    createInput () {
        let {inputMsg, rowList} = this.props;
        let {desc} = inputMsg
        if (tableMsg) {
            return(
                <input className="input" placeholder={desc}></input>
            );
        }
    }

    render() {
        return(
            <div className="module-tableplugins clearfix">
                {this.createBtn()}
                {this.createInput()}
            </div>
        );
    }
}