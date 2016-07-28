/**
 * Created by jin on 16/6/15.
 */
require('company-form.scss');
const util = require('util');
const React = require('react');
const render = require('react-dom').render;
const DatePicker = require('antd/lib/date-picker');
const Upload = require('antd/lib/upload');
const Icon = require('antd/lib/Icon');
const {QueryBox} = require('query-box');
let DropdownMenu = require('dropdown-menu').DropdownMenu;
require('antd/lib/date-picker/style/css');
require('antd/lib/upload/style/css');
require('antd/lib/icon/style/css');

const formConfig = [
    {
        name: '公司名称',
        id: 'company'
    },
    {
        name: '合作时间',
        id: 'applyDate'
    },
    {
        name: '社会信用码',
        id: 'registationNumber'
    },
    {
        name: '联系人',
        id: 'contact'
    },
    {
        name: '联系电话',
        id: 'mobile'
    },
    {
        name: '联系邮箱',
        id: 'email'
    },
    {
        name: '联系传真',
        id: 'fax'
    },
    {
        name: '企业类型',
        id: 'companyType'
    },
    {
        name: '负责销售',
        id: 'salesman'
    },
    {
        name: '销售电话',
        id: 'salesMobile'
    },
    {
        name: '销售邮箱',
        id: 'salesEmail'
    },
    {
        name: '付费模式',
        id: 'countType'
    },
    {
        name: '企业地址',
        id: 'companyAddress'
    }
];
const companyList = [
    {
        desc: 'p2p',
        id: '10'
    },
    {
        desc: '消费金融',
        id: '11'
    },
    {
        desc: '小额贷款',
        id: '12'
    },
    {
        desc: '银行',
        id: '13'
    },
    {
        desc: '其它',
        id: '14'
    }
];
const payList = [
    {
        desc: '预充值',
        id: '15'
    },
    {
        desc: '后付费',
        id: '16'
    }
];
let companyListChoice = "p2p", payListChoice = "预充值";
//错位码
const errorCode = {
    E0013: "合作时间格式不对",
    E0014: "合作时间为空",
    E0015: "公司名称字符长度超出",
    E0016: "公司名称为空",
    E0017: "公司地址字符串长度超出",
    E0018: "公司地址为空",
    E0019: "社会统一信用码格式不对",
    E0020: "社会统一信用码为空",
    E0021: "联系人名称长度超出",
    E0022: "联系人名称为空",
    E0023: "联系电话格式不对",
    E0024: "联系电话为空",
    E0028: "传真为空",
    E0029: "传真格式错误",
    E0030: "联系人邮箱为空",
    E0031: "联系人邮箱格式错误",
    E0033: "销售名称为空",
    E0034: "销售名称长度超出",
    E0035: "销售电话为空",
    E0036: "销售电话格式错误",
    E0037: "销售邮箱为空",
    E0038: "销售邮箱格式错误",
    E0039: "预警阀值格式错误",
    E0040: "预警阀值超过上限",
    E0041: "自动停止预警阀值格式错误",
    E0042: "自动停止预警阀值超过上限",
    zero: ""
};
export class CompanyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyListMessage: {},
            //businessLicenceSrc: baseImageUrl,
            businessLicenceSrc: "",
            IDCardSrc: "",
            useAgreementSrc: "",
            dataList: {//数据
                applyDate: "",
                company: "",
                companyAddress: "",
                registationNumber: "",
                contact: "",
                fax: "",
                email: "",
                mobile: "",
                salesman: "",
                salesMobile: "",
                salesEmail: "",
                useAgreement: "",
                IDCard: "",
                businessLicence: "",
                companyType: "p2p",
                payType: "后付费"
            },
            correctList://验证是否通过
            {
                company: true,
                applyDate: true,
                registationNumber: true,
                contact: true,
                mobile: true,
                email: true,
                fax: true,
                qy: true,
                salesman: true,
                salesMobile: true,
                salesEmail: true,
                ms: true,
                companyAddress: true,
                useAgreement: true
            }
        }
    }

    createUploadProps(type) {
        return {
            action: '/scoreManagement/company/upload?type=' + type + "&_csrf=" + scoreweb.token,
            onChange: (info) => {
                let file = info.file;
                let response;
                let path = '/scoreManagement/company/Image';
                switch (file.status) {
                    case "uploading":
                        break;
                    case "done":
                        response = file.response;
                        if (response.result === "0") {
                            let { dataList } = this.state;
                            switch (type) {
                                case "businessLicence":
                                    let businessLicenceSrc = {businessLicenceSrc: response.data.filePath};
                                    dataList = Object.assign({}, dataList, businessLicenceSrc);
                                    this.setState({
                                        businessLicenceSrc: path + '?path=' + response.data.filePath,
                                        dataList: dataList
                                    });
                                    break;
                                case "IDCard":
                                    let IDCardSrc = {IDCardSrc: response.data.filePath};
                                    dataList = Object.assign({}, dataList, IDCardSrc);
                                    this.setState({
                                        IDCardSrc: path + '?path=' + response.data.filePath,
                                        dataList: dataList
                                    });
                                    break;
                                case "useAgreement":
                                    let useAgreement = {useAgreement: response.data.filePath};
                                    dataList = Object.assign({}, dataList, useAgreement);
                                    this.setState({
                                        useAgreementSrc: path + '?path=' + response.data.filePath,
                                        dataList: dataList
                                    });
                                    correctList[13].useAgreement = true;
                                    break;
                            }
                        }
                        break;
                    case "error":
                        break;
                }
            },
            //  accept: "image/jpeg,image/jpeg,image/gif",
            beforeUpload: function (file) {
                let size = Math.round(file.size / 1024);
                if (size < 100) {
                    console.log("小于100K");
                    //  return false;
                } else if (size > (2 * 1024)) {
                    console.log("大于2M");
                    //return false;
                }
            },
            showUploadList: false,
            name: type
        }
    }

    render() {
        let { createModifier , companyList} = this.props;
        let {dataList} = this.state;
        return (
            <div className="module-companyForm">
                <div className="form-body">
                    {this.createFormList()}
                    {/*this.createModel()*/}
                    <div className="upload-region clearfix">
                        <div className="businessLicence upload-box">
                            <Upload {...this.createUploadProps("businessLicence")}>
                                <Icon type="plus"/>
                                <div className="ant-upload-text">上传单位公章的产品使用协议</div>
                                <span className="span">格式:JPG,PNG,GIF</span>
                                <span className="span">大小:大于100K小于2M</span>
                                <a href="javascript:;" className="upload-example">
                                    <img alt="" src={(createModifier ? dataList.businessLicenceSrc: '')}/>
                                </a>
                            </Upload>

                        </div>
                        <div className="IDCard upload-box">
                            <Upload {...this.createUploadProps("IDCard")}>
                                <Icon type="plus"/>
                                <div className="ant-upload-text">上传身份证</div>
                                <span className="span">格式:JPG,PNG,GIF</span>
                                <span className="span">大小:大于100K小于2M</span>
                                <a href="javascript:;" className="upload-example">
                                    <img alt="" src={(createModifier ? dataList.IDCardSrc: '')}/>
                                </a>
                            </Upload>
                        </div>
                        <div className="useAgreementSrc upload-box">
                            <Upload {...this.createUploadProps("useAgreement")}>
                                <Icon type="plus"/>
                                <div>
                                    <div className="ant-upload-text">上传使用协议照片</div>
                                    <span className="span">格式:JPG,PNG,GIF</span>
                                    <span className="span">大小:大于100K小于2M</span>
                                </div>
                                <a href="javascript:;" className="upload-example">
                                    <img alt="" src={(createModifier ? dataList.useAgreement: '')}/>
                                </a>
                            </Upload>
                        </div>
                    </div>
                </div>
                <a href="javascript:;" className="create-btn" onClick={(e) => this.createClick()}>创建</a>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        let { createModifier } = this.props;
        if (createModifier) {
            let companyList = nextProps.companyList;
            this.setState({
                dataList: companyList
            });
        }
    }

    componentDidMount() {

    }

    createModel(){
          let list = [];
        list.push(
            <div>
                <div><a href="javascript:;" className="iconfont-checkbox ">&#xe638;</a>Model<input type="text"/><input type="text"/></div>
            </div>
        )
        return list;
    }

    createFormList() {
        let { dataList , correctList } = this.state;
        let _list = [];
        for (let i = 0, len = formConfig.length; i < len; i++) {
            switch (i) {
                case 1:
                    _list.push(
                        <div className="div" key={"div"+i}>
                            <span className="span-input" key={"span"+i}>{formConfig[i].name}</span>
                            <DatePicker format="yyyy-MM-dd" placeholder="选择日期" value={dataList.applyDate}
                                        onChange={(value, dateString) => this.onChange(value, dateString)}/>
                        </div>
                    )
                    break;
                case 7:
                    _list.push(
                        <div className="div" key={"div"+i}>
                            <span className="span-input" key={"span"+i}>{formConfig[7].name}</span>
                            <DropdownMenu dropdownMsg={companyList} dropdownReturn={this.outputCompany} defaultSelect={companyListChoice}/>
                        </div>
                    )
                    break;
                case 11:
                    _list.push(
                        <div className="div" key={"div"+i}>
                            <span className="span-input" key={"span"+i}>{formConfig[11].name}</span>
                            <DropdownMenu dropdownMsg={payList} dropdownReturn={this.outputPy} defaultSelect={payListChoice}/>
                        </div>
                    )
                    break;
                default:
                    _list.push(
                        <div className={formConfig[i].id+"-div div"} key={"div"+i}>
                            <span className="span-input" key={"span"+i}>{formConfig[i].name}</span>
                            <div className={formConfig[i].id+" div-input"+(correctList[formConfig[i].id]?'':' active')}
                                 key={"div-input"+i}>
                                <input type="text" key={"input"+i} value={dataList[formConfig[i].id]} className="input"
                                       onBlur={(e) => this.blur(formConfig[i].id)}
                                       onChange={(e) => this.inpChange(e, formConfig[i].id)}/>
                                <i className={"iconfont error" +(correctList[formConfig[i].id]?'':' show')}></i>
                            </div>
                        </div>
                    )

            }
        }
        return _list;
    }

    onChange(field, value) {
        let { dataList } = this.state;
        dataList.applyDate = value;
        this.setState({
            dataList: dataList
        })
    }

    inpChange(e, id) {
        let { dataList } = this.state;
        dataList[id] = e.target.value;
        this.setState({
            dataList: dataList
        })
    }

    outputCompany(id, desc) {
        companyListChoice = desc;
    }

    outputPy(id, desc) {
        payListChoice = desc;
    }

    focusBlur(id) {
        let { dataList } = this.state;
        let value = dataList[id];
        switch (id) {
            case "company"://公司名称
                console.log(value)
                this.company(value);
                break;
            case "companyAddress"://公司地址
                this.companyAddress(value);
                break;
            case "registationNumber"://社会统一注册代码
                this.registationNumber(value);
                break;
            case "contact"://联系人
                this.contact(value);
                break;
            case "mobile"://联系电话
                this.mobile(value);
                break;
            case "email"://联系邮箱
                this.email(value);
                break;
            case "fax"://传真
                this.fax(value);
                break;
            case "salesEmail"://销售邮箱
                this.salesEmail(value);
                break;
            case "salesman"://负责销售
                this.salesman(value);
                break;
            case "salesMobile"://销售电话
                this.salesMobile(value);
                break;
        }
    }

    focus(id) {
        console.log(id)
    }

    blur(id) {
        this.focusBlur(id);
    }

    thresholdValues(e, value) {//预警阀值
        let { errorText } = this.state;
        let thresholdValues = {thresholdValues: value};//input内容字段
        let code = "";
        if (!value) {
            code = "E0039";
            errorText.thresholdValues=errorCode[code];
        } else {
            if (/^(?:(?!0{1,6})\d{1,6}|10{6}|0)$/.test(value)) {
                dataList = Object.assign({}, dataList, thresholdValues);
            } else {
                code = "E0040";
                e.target.value = "";
                errorText.thresstopValues=errorCode[code];
            }
        }
        this.setState({
            errorText:errorText
        })
    }

    thresstopValues(e, value) {//停用阀值
        let { errorText } = this.state;
        let thresstopValues = {thresstopValues: value};//input内容字段
        let code = "";
        if (!value) {
            code = "E0041";
            errorText.thresstopValues=errorCode[code];
        } else {
            if (/^(?:(?!0{1,6})\d{1,6}|10{6}|0)$/.test(value)) {
                dataList = Object.assign({}, dataList, thresstopValues);
            } else {
                code = "E0042";
                e.target.value = "";
                errorText.thresstopValues=errorCode[code];
            }
        }
        this.setState({
            errorText:errorText
        })
    }

    company(value) {
        let { dataList , correctList } = this.state;
        let company = {company: value};//input内容字段
        let code = "";
        if (!value) {
            correctList.company = false;
        } else {
            if (value.length <= 30) {
                correctList.company = true;
                dataList.company = value;
            } else {
                correctList.company = false;
            }
        }
        this.setState({
            dataList: dataList,
            correctList:correctList
        })
    }

    companyAddress(value) {
        let { dataList , correctList } = this.state;
        let companyAddress = {companyAddress: value};//input内容字段
        let code = "";
        if (!value) {
            correctList.companyAddress = false;
            code = "E0018";
        } else {
            if (value.length <= 30) {
                correctList.companyAddress = true;
                dataList.companyAddress = value;
            } else {
                correctList.companyAddress = false;
                code = "E0017";
            }
        }
        this.setState({
            dataList: dataList,
            correctList:correctList
        })
    }

    registationNumber(value) {
        let { dataList , correctList } = this.state;
        let registationNumber = {registationNumber: value};//input内容字段
        let code = "";
        if (!value) {
            correctList.registationNumber = false;
            code = "E0020";
        } else {
            if (/[a-zA-Z0-9]{18}/.test(value)) {
                correctList.registationNumber = true;
                dataList.registationNumber = value;
            } else {
                correctList.registationNumber = false;
                code = "E0019";
            }
        }
        this.setState({
            dataList: dataList,
            correctList:correctList
        })
    }

    fax(value) {
        let { dataList , correctList } = this.state;
        let fax = {fax: value};//input内容字段
        let code = "";
        if (!value) {
            correctList.fax = false;
            code = "E0019";
            code = "E0028";
        } else {
            if (/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(value)) {
                correctList.fax = true;
                dataList.fax = value;
            } else {
                correctList.fax = false;
                code = "E0029";
            }
        }
        this.setState({
            dataList: dataList,
            correctList:correctList
        })
    }

    salesEmail(value) {
        let { dataList , correctList } = this.state;
        let salesEmail = {salesEmail: value};//input内容字段
        let code = "";
        if (!value) {
            correctList.salesEmail = false;
            code = "E0037";
        } else {
            if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
                correctList.salesEmail = true;
                dataList.salesEmail = value;
            } else {
                correctList.salesEmail = false;
                code = "E0038";
            }
        }
        this.setState({
            dataList: dataList,
            correctList:correctList
        })
    }

    salesMobile(value) {
        let { dataList , correctList } = this.state;
        let salesMobile = {salesMobile: value};//input内容字段
        let code = "";
        if (!value) {
            correctList.salesMobile = false;
            code = "E0035";
        } else {
            if (/^(13|15|18)\d{9}$/.test(value)) {
                correctList.salesMobile = true;
                dataList.salesMobile = value;
            } else {
                correctList.salesMobile = false;
                code = "E0036";
            }
        }
        this.setState({
            dataList: dataList,
            correctList:correctList
        })
    }

    salesman(value) {
        let { dataList , correctList } = this.state;
        let salesman = {salesman: value};//input内容字段
        let code = "";
        if (!value) {
            correctList.salesman = false;
            code = "E0033";
        } else {
            if (value.length <= 10) {
                correctList.salesman = true;
                dataList.salesman = value;
            } else {
                correctList.salesman = false;
                code = "E0034";
            }
        }
        this.setState({
            dataList: dataList,
            correctList:correctList
        })
    }

    contact(value) {
        let { dataList , correctList } = this.state;
        let contact = {contact: value};//input内容字段
        let code = "";
        if (!value) {
            correctList.contact = false;
            code = "E0022";
        } else {
            if (value.length <= 10) {
                correctList.contact = true;
                dataList.contact = value;
            } else {
                correctList.contact = false;
                code = "E0021";
            }
        }
        this.setState({
            dataList: dataList,
            correctList:correctList
        })
    }

    mobile(value) {
        let { dataList , correctList } = this.state;
        let mobile = {mobile: value};//input内容字段
        let code = "";
        if (!value) {
            correctList.mobile = false;
            code = "E0024";
        } else {
            if (/^(13|15|18)\d{9}$/.test(value)) {
                correctList.mobile = true;
                dataList.mobile = value;
            } else {
                correctList.mobile = false;
                code = "E0023";
            }
        }
        this.setState({
            dataList: dataList,
            correctList:correctList
        })
    }

    email(value) {
        let { dataList , correctList} = this.state;
        let email = {email: value};//input内容字段
        let code = "";
        if (!value) {
            correctList.email = false;
            code = "E0030";
        } else {
            if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
                correctList.email = true;
                dataList.email = value;
            } else {
                correctList.email = false;
                code = "E0031";
            }
        }
        this.setState({
            dataList: dataList,
            correctList:correctList
        })
    }

    createClick() {
        this.inspection();
    }

    //检验输入内容
    inspection() {
        let { dataList , correctList } = this.state;
        dataList = Object.assign({}, dataList, {companyType: companyListChoice});
        dataList = Object.assign({}, dataList, {payType: payListChoice});
        this.setState({
            dataList: dataList
        })
        console.log(dataList, correctList);
    }
}
