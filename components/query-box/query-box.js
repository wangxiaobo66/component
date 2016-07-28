/**
 * Created by wangxiaobo on 16/4/8.
 */
require('query-box.scss');
const _ = require('lodash/lang');

const React = require('react');
const render = require('react-dom').render;
const DataPicker = require('antd/lib/date-picker');
const RangePicker = DataPicker.RangePicker;
require('antd/lib/date-picker/style/css');
let PropTypes = React.PropTypes;
let DropdownMenu = require('dropdown-menu').DropdownMenu;
//let DatePiker = require('date-picker').DatePicker;
let DatePiker = require('date-picker').DatePicker;

let selectName= {};
export class QueryBox extends React.Component {//定义一个LeftNav组件,类定义法替代React.createClass 方法来定义一个组件
    constructor(props) {
        super(props);//props传递
        let {queryText} = this.props;//展示数据
        let pageList = _.cloneDeep(queryText);
        let orignList = _.cloneDeep(queryText);
        selectName = {name:pageList[0].defaultSelect};//下拉选项默认值
        this.state = {//状态机,初始状态
            orignList: orignList,
            pageList: pageList,
            date: {},
            startValue: null,
            endValue: null
        }
    }

    render() {
        let querybox = this.queryStyle();
        return <div id="query-box" className="query-box">{querybox}</div>;
    }

    componentWillReceiveProps(nextProps) {
        let queryText = nextProps.queryText;
        let pageList = _.cloneDeep(queryText);
        let orignList = _.cloneDeep(queryText);
        this.setState({
            orignList: orignList,
            pageList: pageList,
        })
    }
    //cheackbox模块方法
    checkBox(obj, index) {
        return (
            <div key={index + 'divCheckbox'} className="ipt-checkbox" onClick={(e) => this.checkClick(obj)}>
                <i className={"iconfont ipt-check " + (this.state.pageList[index].active ? 'ipt-checked' : '')}
                   key={index + 'iCheckbox'}></i>
                {obj.text}
            </div>
        );
    }

    //radio模块方法
    radio(obj, index) {
        return (
            <div key={index + 'divRadio'} className="ipt-radio" onClick={(e) => this.radioClick(index,obj)}>
                <label key={index + 'labelRadio'}>{obj.name}</label>
                <i className={"iconfont ipt-rad" + (this.state.pageList[index].active ? ' ipt-raded' : '') + (this.state.pageList[index].pickOn ? ' ipt-raded' : '')}
                   key={index + 'iRadio'}></i>
                {obj.text}
            </div>
        );
    }

    //多个input输入框拼接
    textList(obj, index) {
        return (
            <div key={index + 'divText'} className="ipt-text">
                <label key={index + 'labelText'} className="ipt-name">{obj.name}</label>
                <input key={index + 'inputText'} type="text" className="ipt-text" placeholder={obj.text}
                       maxLength={obj.maxLength} ref={obj.refsName} value={obj.value}/>
            </div>
        );
    }

    queryStyle() {
        //查询按钮暂可写死
        let iptbutton = <input type="button" key='inputButton' className="ipt-button" value="查询"
                               onClick={(e) => this.inQuire()}/>;
        let querybox = [];
        let {pageList} = this.state;
        pageList.map((obj, index) => {
            switch (obj.dataType) {
                case "checkbox":
                    let checkBox = this.checkBox(obj, index);
                    querybox.push(checkBox);
                    break;
                case "radio":
                    let radio = this.radio(obj, index);
                    querybox.push(radio);
                    break;
                case "text":
                    let inputList = this.textList(obj, index);
                    querybox.push(inputList);
                    break;
                case "select":
                    querybox.push(<DropdownMenu dropdownMsg={obj.dropdownList} dropdownReturn={this.outputId} defaultSelect={obj.defaultSelect} key="DropdownMenu"/>);
                    break;
                case "date":
                    querybox.push(<DataPicker style={{ width: 184 }}
                                              onChange={(value, dateString) => this.onChange(value, dateString)} key="DataPicker"/>);
                    break;
                case "range":
                    querybox.push(<RangePicker style={{ width: 184 }}
                                               onChange={(value, dateString) => this.onChange(value, dateString)} key="RangePicker"/>);
                    break;
            }
        })
        querybox.push(iptbutton);
        return querybox;
    }

    disabledStartDate() {

    }

    onChange(field, value) {
        let time = arguments[1];
        this.setState({
            startValue:this.timestamp(time[0]),
            endValue:this.timestamp(time[1])
        })
    }

    timestamp(time){//转时间戳
        let str = time;
        str = str.replace(/-/g,'/');
        let date = new Date(str);
        let timestamp = date.getTime()/1000;
        return timestamp;
    }

    //传参,下拉
    outputId(id,desc) {//当下拉选项改变时
        selectName.name = desc;
    }

    checkClick(obj) {//多选方法
        let {pageList} = this.state;
        if (obj.active) {
            obj.active = false;
        } else {
            obj.active = true;//点哪一个就设置哪一个的active为true
        }
        this.setState({//重置状态机
            pageList: pageList
        });
    }

    radioClick(index) {//单选
        let {pageList} = this.state;
        let list = _.cloneDeep(pageList);
        list.map((obj)=> {
            switch (obj.dataType) {
                case "radio":
                    obj.active = false;
                    obj.pickOn = false;
                    break;
            }
        })
        list[index].active = true;
        this.setState({//重置状态机
            pageList: list
        });
    }

    inQuire() {
        let {pageList} = this.state;
        let submitList = [];
        let textObj = {};
        let radioObj = {};
        let checkboxObj = {};
        let { startValue , endValue } = this.state;
        pageList.map((obj)=> {
            switch (obj.dataType) {
                case "checkbox":
                    if (obj.active) {
                        checkboxObj.id = obj.id;
                        submitList.push(checkboxObj);
                    }
                    break;
                case "radio":
                    if (obj.active) {
                        radioObj.id = obj.id;
                        submitList.push(radioObj);
                    } else {
                        if (obj.pickOn) {
                            radioObj.id = obj.id;
                            submitList.push(radioObj);
                        }
                    }
                    break;
                case "text":
                    textObj.id = obj.id;
                    textObj.value = this.refs[obj.refsName].value;
                    submitList.push(textObj);
                    break;
                case "select"://如果有下拉框则传入submitList
                    submitList.push(selectName);
                    break;
                case "date":
                    submitList.push({startValue:startValue},{endValue:endValue});
                    break;
                case "range":
                    submitList.push({startValue:startValue},{endValue:endValue});
                    break;
            }
        })
        //console.log(new Date().getTime() - timer);
        console.log(submitList);
        /*submitList.map((obj) => {
            switch (obj.id) {
                case "7":
                    console.log(obj.value)
                    let data = {"page": 1, "count": 10, "company": obj.value};
                    this.props.getBusinessList(data);
                    break;
            }
        });*/
        let _this = this;
        let listReturn = this.props.listReturn;
        if (typeof listReturn === 'function') {
            listReturn(submitList,_this);
        }
    }
}

QueryBox.propTypes = {
    listReturn: PropTypes.func.isRequired,//函数数据类型
    queryText: PropTypes.array.isRequired//数组格式,必须
    /*
    * listReturn回调所选择的各个项submitList
    * */
    /*
     *例子:
     [
     // checkbox
     {
     "dataType": "checkbox",
     "text": "基础建模",
     "id":"1"
     },
     // radio
     {
     "dataType": "radio",
     "text": "单个查询",
     "pickOn": false,
     "id":"4"
     },
     // input
     {
     "name": "真实姓名",
     "dataType": "text",
     "text": "真实姓名",
     "maxLength": "",
     "refsName": "name",
     "id":"7"
     },
     // 下拉选框
     {
     "dataType": "select",
     "dropdownList": [{
     desc: '客户消耗图',
     id: '1',
     def: true
     }, {
     desc: '模型消耗图',
     id: '2'
     }]
     },
     // 日期框
     {单
     "dataType": "date",
     "name":"开始时间",
     "id":"timeStart"
     },
     {双
     "dataType": "range",
     "name":"结束时间",
     "id":"timeEnd"
     }
     ]
     */
};