/* 
 * Created by ping on 16/4/22.
 * 组件所需props:
 * i. infoFormList: {
 *      title: 'string',
 *      content: [{
 *           name: 'string',
 *           value: 'string', 
 *           type: 'text'/'dropdown'/'readOnly'/'textArea', #如果是dropdown需要增加列表属性item: [{desc: 'string', id: 'string', def: true/false}]
 *           match: util.match.mobile.reg, 
 *           error: util.match.mobile.msg,
 *           required: true/false 
 *     }]
 * }
 * ii. dispatch提交表单action: infoFormSubmit()
 */
require('info-form.scss');
const util = require('util');
const React = require('react');
const ender = require('react-dom').render;
const { DropdownMenu } = require('dropdown-menu');
let submitList = {};
let isPassed = [];
let PropTypes = React.PropTypes;

export class InfoForm extends React.Component {
    constructor(props) {
        super(props);
    }

    createInput(list) { //方法：创建输入框，并将值添加到submitList
        if (!list.value && required) {
            isPassed.push(list.name);
        } else {
            submitList[list.name] = list.value;
        }
        return (
            <div className='input-box'>
                <input type="text" 
                    placeholder={'请输入' + list.name} 
                    defaultValue={list.value}
                    onBlur={(e) => this.checkInfo(e, list.name, list.match, list.error)} />
            </div>
        );
    }

    createDropdown(list) { //方法：创建下拉菜单，并将选中的值添加到submitList
        if (!list.value && list.required) {
            isPassed.push(list.name); //没有通过检查标记
        }
        return (
            <DropdownMenu dropdownMsg={list.item} dropdownReturn={
                (id, desc) => {
                    list.value = desc;
                    submitList[list.name] = desc;
                    for (let i = 0, len = isPassed.length; i < len; i++) {
                        if (isPassed[i] === list.name) {
                            isPassed.splice(i, 1);
                        }
                    }
                }
            } />
        );
    }

    createReadOnly(list) { //方法：创建只读文字，并将值添加到submitList
        submitList[list.name] = list.value;
        return (
            <span className='read-only'>
                {list.value}
            </span>
        );
    }

    createText(list) { // 方法：创建文本框，并将值添加到submitList
        if (!list.value && required) {
            isPassed.push(list.name);
        } else {
            submitList[list.name] = list.value;
        }
        return (
            <div className='textarea-box'>
                <textarea type='text' 
                    placeholder="请输入不超过200个字符"
                    defaultValue={list.value}
                    onBlur={(e) => this.checkInfo(e, list.name, list.match, list.error, list.required)}></textarea>
            </div>
        );
    }

    createInfo(list) {
        switch (list.type) {
            case 'textArea':
                return this.createText(list);
            case 'readOnly':
                return this.createReadOnly(list);
            case 'dropdown':
                return this.createDropdown(list);
            case 'text':
                return this.createInput(list);
        }
    }

    render() {
        let {title, content} = this.props.infoFormList;
        let infoFormList = content.map((list, index) => {
            return (
                <li className="form-content" key={index}>
                        <span className="form-name">
                            {list.name}
                        </span>
                    <div className="form-value" data-check="0">
                        {this.createInfo(list)}
                    </div>
                </li>
            );
        });
        return (
            <div className="module-info-form">
                <div className="form-container">
                    <div className="form-title">
                        <h3>{title}</h3>
                    </div>
                    <ul>
                        {infoFormList}
                    </ul>
                    <div className="submit-btn">
                        <a href="javascript:;" onClick={() => this.formSubmit()}>确定</a>
                    </div>
                </div>
            </div>
        );
    }

    checkInfo(e, name, reg, error) { //验证表单内容是否符合规则
        let { infoFormAddSubmit } = this.props;
        let el = e.target,
            val = $(el).val(),
            $formValue = $(el).parents('.form-value');
        if (val.search(reg) || !val) { //如果输入的内容符合正则那么通过并删掉报错信息，不符合则显示报错信息
            if (!$formValue.find('.warning').length) { //同一个输入框报错信息只显示一个就够了
                $formValue.append(
                    '<span class="warning">' + error + '</span>'
                );
            }
            delete submitList[name];
            isPassed.push(name); //如果没有通过检查则标记
        } else {
            $formValue.data('check', 1).find('.warning').remove();
            submitList[name] = val;
            for (let i = 0, len = isPassed.length; i < len; i++) {
                if (isPassed[i] === name) {
                    isPassed.splice(i, 1);
                }
            }
        }
    }

    formSubmit() { //表单提交
        let {infoFormSubmit} = this.props;
        if (isPassed.length) {
            console.log(isPassed)
        } else {
            infoFormSubmit(submitList);
        }
    }
}

InfoForm.propTypes = {
    infoFormSubmit: PropTypes.func.isRequired,
    infoFormList: {
        title: PropTypes.string,
        content: propTypes.array.isRequired
    }
}
