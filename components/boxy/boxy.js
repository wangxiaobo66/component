/**
 * Created by pingYuan on 16/5/12.
 * 1. 组件所需props：
 *      i. boxyMsg: state.boxyAction --> boxyMsg {
 *          show: true/false,
 *          type: 'tip/confirm/warning', //规定弹框类型(字符串格式，全部小写)：'tip'(弹出两秒后消失)、'warning'(弹出带有确定按钮)、'confirm'(弹出带有确定和取消按钮)
 *          content: 'string',
 *          tipTime: 2000(default),
 *          boxyReturnConfirm: callback,
 *          boxyReturnCancel: callback
 *      }
 *      ii. dispatch隐藏弹框action: boxyHide()
 *      iii. dispatch隐藏遮罩action: maskHide()
 *  2. 组件所需消息：bodyKeyDown
 */
 
require('boxy.scss');

const util = require('util');
const React = require('react');
const render = require('react-dom').render;
let PropTypes = React.PropTypes;

export class Boxy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {timer: null}; //初始化tip类型弹框所需的计时器
    }

    render() {
        let { boxyMsg, boxyHide, maskHide } = this.props;
        if ( boxyMsg.type === 'tip' ) { //如果是tip类型的弹窗，则弹出两秒后关闭
            if (!boxyMsg.tipTime || isNaN(boxyMsg.tipTime)) {
                boxyMsg.tipTime = 2000;
            }
            clearTimeout(this.state.timer);
            this.state.timer = null;
            this.state.timer = setTimeout((e) => {
                boxyHide();
                maskHide();
            }, boxyMsg.tipTime);
        }
        return(
            <div className={"module-boxy" + (boxyMsg.show ? '' : ' hidden')}>
                <div className="boxy-container">
                    <div className="boxy-content">
                        <div className={"close-boxy" + ((boxyMsg.type === 'tip') ? ' hidden' : '')}>
                            <span className="icon-close" onClick={(e) => this.isConfirm(e, boxyMsg.type)}>关闭</span>
                        </div>
                        <p className="boxy-msg">{boxyMsg.content}</p>
                        <div className={"confirm-button" + ((boxyMsg.type === 'tip') ? ' hidden' : '')}>
                            <a href="javascript:;" 
                                className={"boxy-submit" + ((boxyMsg.type === 'warning') ? ' ml200' : '')} 
                                onClick={(e) => this.isConfirm(e, boxyMsg.type, true)}>确定</a>
                            <a href="javascript:;" 
                                className={"boxy-cancel" + ((boxyMsg.type === 'warning') ? ' hidden' : '')} 
                                onClick={(e) => this.isConfirm(e, boxyMsg.type, false)}>取消</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let { boxyHide, maskHide } = this.props;
        util.events.on('bodyKeyDown', (e) => { //按ESC关闭弹窗
            if (e.keyCode === 27) {
                boxyHide();
                maskHide();
            }
        });
    }

    isConfirm(e, type, judge) { //点击弹框按钮事件
        let { boxyReturnConfirm, boxyReturnCancel } = this.props.boxyMsg,
            { boxyHide, maskHide } = this.props;
        if (typeof boxyReturnConfirm === 'function' && judge) { //判断回调函数传进来的是不是函数，并且选择了“确定”
            if (type === 'warning') { //如果弹框类型为warning，意味着“确定”即是“取消”
                boxyReturnCancel(!judge);
            } else {
                boxyReturnConfirm(judge);
            }
        }
        if (typeof boxyReturnCancel === 'function' && !judge) { //判断回调函数传进来的是不是函数，并且选择了“取消”
            boxyReturnCancel(judge);
        }
        boxyHide();
        maskHide();
    }
}

Boxy.propTypes = {
    boxyMsg: PropTypes.object.isRequired,
    boxyHide: PropTypes.func.isRequired,
    maskHide: PropTypes.func.isRequired
}