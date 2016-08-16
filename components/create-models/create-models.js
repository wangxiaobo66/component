/**
 * Created by wang on 16/4/8.
 */
require('create-models.scss');
const React = require('react');
const render = require('react-dom').render;
const { ListFrame } = require('list-frame');
const util = require('util');
let PropTypes = React.PropTypes;

export class CreateModels extends React.Component {//定义一个LeftNav组件,类定义法替代React.createClass 方法来定义一个组件
    constructor(props) {
        super(props);//props传递
    }

    render() {
        let sampleList = this.props.listFrame.listFrame;
        let divList = this.props.listFrame.divList;
        let active = this.props.listFrame.active;
        let pageLen = this.props.listFrame.pageLen;
        let page = this.props.listFrame.page;
        let {listFrameActive,listFrameDiv,listFrameDivRage,listFrameLiRemove} = this.props;
        return <div id="create-models" className="create-models clearfix">
            <div className="div"><label className="label">模型名称</label><input type="text" id="CreateName" className="input"
                                                                             ref="CreateName"/></div>
            <div className="div clearfix">
                <label className="label">选择样本</label>
                <div className="div-content">
                    <div className="clearfix">
                        {this.divList()}
                    </div>
                    <i className={"iconfont unfold" +(active ? '' : ' after')} onClick={(e) => this.unfold()} ref="unfold" ></i>
                    <i className={"iconfont put" +(active ? ' after' : '')} onClick={(e) => this.put()} ref="put"></i>
                        <ListFrame sampleList={sampleList}
                                   pageLen={pageLen}
                                   page={page}
                                   divList={divList}
                                   active={active}
                                   listFrameActive={active => listFrameActive(active)}
                                   listFrameDiv={divList => listFrameDiv(divList)}
                                   listFrameDivRage={page=>listFrameDivRage(page)}
                                   listFrameLiRemove={indexLi=>listFrameLiRemove(indexLi)}/>
                </div>
            </div>
            <div className="div"><label className="label">当前状态</label><span className="span">新建</span></div>
            <div className="div"><a href="javascript:;" className="submit a" onClick={(e) => this.submit()}>提交</a><a
                href="javascript:;" className="return a">返回</a></div>
        </div>;
    }

    divList() {
        let listDiv = this.props.listFrame.divList;
        let list = [];
        for (let i = 0, len = listDiv.length; i < len; i++) {
            list.push(
                <div className="sample-div clearfix" key={listDiv[i].name + 'div'}>
                    <p className="sample-p" key={listDiv[i].name + 'p'}>{listDiv[i].name}</p>
                    <i className="iconfont sample-i" key={listDiv[i].name + 'i'}
                       onClick={(e) => this.remove(i)}></i>
                </div>
            )
        }
        return list;
    }

    unfold() {
        this.props.listFrameActive(true);
    }

    put(){
        this.props.listFrameActive(false);
    }

    remove(i) {
        let listDiv = this.props.listFrame.divList;
        let sampleList = this.props.listFrame.listFrame;
        let index = i;
        //let list = _.cloneDeep(divList);
        //list.splice(i,1);
        this.props.listFrameDivRemove(index);
        //删除一个向lilist添加一个
        let objLi = {name:listDiv[i].name,id:listDiv[i].id};
        this.props.listFrameLiAdd([objLi]);
    }

    submit() {
        let listDiv = this.props.listFrame.divList;
        let submit = [];
        let sample = {};
        let models = {};
        let Name = this.refs.CreateName;
        models.name = Name.value;
        sample.id = [];
        for (let i=0,len = listDiv.length;i<len;i++){
            sample.id.push(listDiv[i].id);
        }
        submit.push(models,sample);
        console.log(submit)
    }
}