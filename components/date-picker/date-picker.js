/**
 * Created by jin on 16/4/27.
 */
const React = require('react');
let Component = React.Component;
let PropTypes = React.PropTypes;
require('date-picker.scss');
const { DropdownMenu } = require('dropdown-menu');

/*
* 日期组件
* */
export class DatePicker extends Component {
    constructor(props) {
        super(props);
        let {year, month, day} = this.props.date;
        this.state = {
            year: year,
            month: month,
            day: day,
            years: this.createYear(),
            months: this.createMonth(),
            days: []
        };

    }

    //创建月份
    createMonth() {
        let arr = [];
        let {month} = this.props.date;
        for (let i = 1; i < 13; i++) {
            var defMonth = {
                id: i,
                desc: i
            };
            if (month === i){
                defMonth.def = true;
            }

            arr.push(defMonth);
        }
        return arr;
    }

    //创建年
    createYear() {
        let arr = [];
        let defYears = new Date().getFullYear();
        let from = defYears - 50;
        let end = defYears + 50
        let {year} = this.props.date;
        for (let i = from; i < end; i++) {
            let defYear = {
                id: i,
                desc: i
            };
            if (year === i){

                defYear.def = true;
            }
            arr.push(defYear);
        }
        return arr;
    }

    //创建天
    createDay() {
        let {year, month} = this.state;
        let {day} = this.props.date;
        let arr = [];
        let len = 0;
        if (year && month) {
            switch (month) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    len = 32;
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    len = 31;
                    break;
                case 2:
                    if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
                        len = 30;
                    } else {
                        len = 29;
                    }
            }
            for (let i = 1; i < len; i++) {
                let defDay = {
                    id: i,
                    desc: i
                };
                if (day === i){
                    defDay.def = true;
                }
                arr.push(defDay);
            }
        }
        return arr;
    }

    shouldComponentUpdate(nextProps, nextState){
        let {year, month, day} = nextState;
        this.props.setDatepickerDate({
            year: year,
            month: month,
            day: day
        });
        return true;
    }
    //渲染DOM
    render() {
        return (
            <div className="module-date-picker clearfix">
                <DropdownMenu dropdownMsg={this.createYear()} dropdownReturn={(id) => this.getYear(id)}/>
                <DropdownMenu dropdownMsg={this.createMonth()} dropdownReturn={(id) => this.getMonth(id)}/>
                <DropdownMenu dropdownMsg={this.createDay()} dropdownReturn={(id) => this.getDay(id)}/>
            </div>

        );
    }

    //获取年
    getYear(id) {
        this.setState({
            year: id
        });
    }

    //获取月
    getMonth(id) {
        this.setState({
            month: id
        });
    }

    //获取天
    getDay(id) {
        this.setState({
            day: id
        });
    }
}

DatePicker.propTypes = {
    setDatepickerDate: PropTypes.func.isRequired, //回调方法,返回value, Object  {year:X, month: X, day: X}
    date: PropTypes.object.isRequired //传入年月日     Object  {year:X, month: X, day: X}
};