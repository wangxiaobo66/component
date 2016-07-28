/**
 * Created by wangxiaobo on 16/5/19.
 */
require('list-frame.scss');
const React = require('react');
const render = require('react-dom').render;
const { Pages } = require('pages');
const util = require('util');
let PropTypes = React.PropTypes;

export class ListFrame extends React.Component {//定义一个LeftNav组件,类定义法替代React.createClass 方法来定义一个组件
    constructor(props) {
        super(props);//props传递
    }

    sampleList() {
        let { sampleList , page} = this.props;
        let listLen = sampleList.length;
        let len = 5*page;
        let newList = [];
        if(len>listLen){
            len = listLen;
        }
        for (let i=(page-1)*5;i<len;i++){
            newList.push(<li className="li" key={'li'+i} onClick={(e)=>this.liClick(i)}>{sampleList[i].name}</li>)//箭头函数不会新产生自己的this
        }
        return newList;
    }

    render() {
        let { page , active, sampleList } = this.props;
        let listLen = sampleList.length;
        let pageLen = Math.ceil(listLen/5);
        return <div className={"list-frame list-div" +(active ? ' after' : '')} ref="comboBox">
            <ul className="ul">
                {this.sampleList()}
            </ul>
            <Pages pageLen={pageLen}
                   pageActive={page}
                   setPage={myPage => this.props.listFrameDivRage(myPage.active)}/>
        </div>
    }

    componentDidMount(){
        util.events.on('bodyClick', (e) => {
            let ediv = e.target,
                comboBox = this.refs.comboBox;
            if(!$.contains(comboBox,ediv)){
                this.props.listFrameActive(false);
            }
        })
    }

    /*setPage(myPage){
        this.props.listFrameDivRage(myPage.active);
    }*/
    liClick(i) {
        //隐藏列表
        let { sampleList } = this.props;
        this.props.listFrameActive(false);
        //添加div
        let objDiv = {name: sampleList[i].name,id:i+1};
        this.props.listFrameDiv([objDiv]);
        //点谁删谁
        this.props.listFrameLiRemove(i);
    }
}