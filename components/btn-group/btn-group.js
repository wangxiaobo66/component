/* 
 * Created by wang on 16/5/19.
 * 组件所需props:
 *     operation: [
 *        {name: 'sure', status: 0},
 *        {name: 'modify', status: 1},
 *        {name: 'delete', status: 0}
 *     ]
 */

require('btn-group.scss');
const uitl = require('util');
const React = require('react');
const render = require('react-dom').render;
let PropTypes = React.PropTypes;

export class BtnGroup extends React.Component {
    constructor(props) {
        let {btnGroupSure, btnGroupModify, btnGroupDelete} = props;
        super(props);
        this.state = {
            'sure': {
                desc: '确定',
                type: 'primary',
                size: 'small',
                option: (id) => {
                    btnGroupSure('确定，id是' + id);
                }
            }, 
            'modify': {
                desc: '修改',
                type: 'info',
                size: 'small',
                option: (id) => {
                    btnGroupModify('修改，id是' + id);
                }
            },
            'delete': {
                desc: '删除',
                type: 'danger',
                size: 'small',
                option: (id) => {
                    btnGroupDelete('删除，id是' + id);
                }
            }
        }
    }

    createBtn() {
        let {rowList} = this.props;
        let {operation} = this.props.rowList;
        let btnGroupNode = [];
        for (let i = 0, len = operation.length; i < len; i++) {
            let {name} = operation[i];
            let {type, size, desc, option} = this.state[name];
            btnGroupNode.push(
                <a href="javascript:;" key={i}
                    className={"btn-" + type +" size-" + size}
                    onClick={() => option(rowList.id)}>{desc}</a>
            );
        }
        return btnGroupNode;
    }

    render() {
        return(
            <div className="module-btnGoup clearfix">
                {this.createBtn()}
            </div>
        );
    }
}

BtnGroup.propTypes = {
    operation: PropTypes.array.isRequired
}