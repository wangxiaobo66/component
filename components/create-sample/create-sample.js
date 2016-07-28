/**
 * Created by wangxiaobo on 16/4/8.
 */
require('create-sample.scss');
const React = require('react');
const render = require('react-dom').render;
let PropTypes = React.PropTypes;
let DatePicker = require('date-picker').DatePicker;

let date = {
    "startDate": {year: 2016, month: 4, day: 1}
    ,

    "endDate": {year: 2016, month: 12, day: 1}
};
let startDate = date.startDate,
    endDate = date.endDate;
export class CreateSample extends React.Component {//定义一个LeftNav组件,类定义法替代React.createClass 方法来定义一个组件
    constructor(props) {
        super(props);//props传递
        this.state = {//状态机,初始状态
        }
    }

    componentDidMount() {
        var uploader = WebUploader.create({
            swf: 'Uploader.swf', // swf文件路径
            server: 'sample/fileUpload.do', // 文件接收服务端。
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#picker',
            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false,
            auto: true,
            accept: {
                extensions: "csv,xls,xlsx",
                mimeTypes: 'text/comma-separated-values,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        });
        uploader.on('uploadSuccess', function (file, response) {//服务端返回的数据
            if (!response.success) {
                console.log(response.error);
            }
            if (response.data) {
                console.log(2);
            }
        })
        uploader.on('uploadError', function (file) {//出错的code
            console.log('上传失败')
        })
    }

    render() {
        return <div id="create-sample" className="create-sample">
            <ul className="ul">
                <li className="li">
                    <label className="label">样本名称</label><input type="text" ref="CreateName" className="create-name"/>
                </li>
                <li className="li">
                    <label className="label">选择文件</label><span className="choose span" id="picker">选择文件<input
                    type="file"
                    accept="text/comma-separated-values,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    className="create-file"/></span>
                </li>
                <li className="li">
                    <label className="label">开始日期</label>
                    <DatePicker date={startDate}
                                setDatepickerDate={(value) => this.startDate(value)}/>
                </li>
                <li className="li">
                    <label className="label">结束日期</label>
                    <DatePicker date={endDate}
                                setDatepickerDate={(value) => this.endDate(value)}/>
                </li>
                <li className="li">
                    <label className="label">样本描述</label><input type="text" ref="CreateDescribe"
                                                                className="create-describe"/>
                </li>
                <li className="li">
                    <a href="javascript:;" className="submit a" onClick={(e) => this.submit()}>提交</a><a
                    href="javascript:;" className="back a">返回</a>
                </li>
            </ul>
        </div>;
    }

    startDate(value) {
        startDate = Object.assign({}, startDate, value)

    }

    endDate(value) {
        endDate = Object.assign({}, endDate, value)
    }

    submit() {
        let submitList = [];
        let Name = this.refs.CreateName;
        let Describe = this.refs.CreateDescribe;
        let objName = {};
        let objDescribe = {};
        objName.id = Name.id;
        objName.value = Name.value;
        objDescribe.id = Describe.id;
        objDescribe.value = Describe.value;
        if (objName.value !== "") {
            submitList.push(objName);
        }
        if (objDescribe.value !== "") {
            submitList.push(objDescribe);
        }
        if (startDate.year !== 0 && startDate.month !== 0 && startDate.day !== 0) {
            submitList.push(startDate)
        }
        if (endDate.year !== 0 && endDate.month !== 0 && endDate.day !== 0) {
            submitList.push(endDate)
        }
        console.log(submitList)
    }
}