/**
 * Created by pingYuan on 16/5/12.
 * 组件所需props:
 *      maskMsg: state.maskAction --> maskMsg: {
 *          show: false,
 *          transparent: false
 *      }
 */

require('mask.scss');

const util = require('util');
const React = require('react');
const render = require('react-dom').render;
let PropTypes = React.PropTypes;

export class Mask extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={"module-mask" + this.maskCtrl()}></div>
        );
    }

    maskCtrl() {
        let { show, transparent } = this.props.maskMsg, ctrl = '';
        if (!show) {
            ctrl += ' hidden';
        }
        if (transparent) {
            ctrl += ' trans';
        }
        return ctrl;
    }
}

Mask.propTypes = {
    maskMsg: PropTypes.object.isRequired
}