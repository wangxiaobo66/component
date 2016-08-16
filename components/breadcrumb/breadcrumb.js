/* 
 * Created by wang on 16/6/12.
 * 组件所需props:
 *   breadcrumbMsg: [
 *       {name: 'string', url: 'url-link'}
 *    ]
 */

require('breadcrumb.scss');
const util = require('util');
const React = require('react');
const render = require('react-dom').render;
let PropTypes = React.PropTypes;

export class Breadcrumb extends React.Component {
    constructor(props) {
        super(props);
    }

    createBreadcrumb() {
        let {breadcrumbMsg} = this.props;
        let breadcrumbNode = [];
        for(let i = 0, len = breadcrumbMsg.length; i < len; i++) {
            let {name, url} = breadcrumbMsg[i];
            if (i === (len - 1)) {
                url = 'javascript:;';
            }
            breadcrumbNode.push(
                <a href={url} key={i+'a'} className="breadcrumbName">{name}</a>,
                <span className="arrow" key={i+'span'}>&gt;</span>
            );
        }
        return breadcrumbNode;
    }

    render() {
        return(
            <div className="module-breadcrumb">
                <div className="breadcrumb">
                    {this.createBreadcrumb()}
                </div>
            </div>
        );
    }
}