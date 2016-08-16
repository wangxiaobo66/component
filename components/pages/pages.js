/**
 * Created by wangxiaobo on 16/4/14.
 */
const React = require('react');
let Component = React.Component;
let PropTypes = React.PropTypes;
require('pages.scss');

export class Pages extends Component {
    constructor(props) {
        super(props);
    }

    pushFull(from, end){
        let arr = [];
        for (let i = from; i < end; i++) {
            arr.push(
                <li className="li" key={i}>
                    <a key={i + 'nums'} href="javascript:;"
                       className={"num-btn" + ((this.props.pageActive === (i + 1)) ? ' active' : '')}
                       onClick={(e) => this.choice(e, i)}>{i + 1}</a>
                </li>
            );
        }
        return arr;
    }

    render() {
        let {pageLen, pageActive} = this.props;
        let nums = [];
        let page = [];
        let pagePre = [];
        let pagePreHtml = [<a href="javascript:;" className="pre" onClick={(e) => this.pre(e)} key='pre'
                              onMouseOver={(e) => this.preHover(e,true)}
                              onMouseOut={(e) => this.nextHover(e,true)}>&#xe629;</a>];
        let pageNext = [];
        let pageNextHtml=[<a href="javascript:;" className="next" onClick={(e) => this.next(e)} key='next'
                              onMouseOver={(e) => this.preHover(e, false)}
                              onMouseOut={(e) => this.nextHover(e, false)}>&#xe62b;</a>];
        page.push(
            <div className="module-pages clearfix" key="div-pages">
                <div className="input-region" key="div-pagesDiv">
                    <span key="div-pagesSpanGo">去第</span>
                    <div className="input-box" key="div-pagesDivText">
                        <input type="text" defaultValue='1' ref="pageInput" className='num-input' key="div-pagesDivInput"
                               onKeyDown={(event) => this.sure(event, this)}/>
                    </div>
                    <span key="div-pagesSpanEnd">页</span>
                    <a href="javascript:;" className="go-page" onClick={(e) => this.sure(e, 'click')} key="div-pagesA">确定</a>
                </div>
                <div className="select-region" key="div-pagesDivNum">
                    {pagePre}
                    <ul className="page-list" key="div-pagesDivUl">
                        {nums}
                    </ul>
                    {pageNext}
                </div>
            </div>
        );
        switch (true) {
            case pageLen <= 5:
                if(pageLen===1){
                    page=[];
                }else {
                    if(pageActive===1){
                        pageNext.push(pageNextHtml);
                    }else if(pageActive===pageLen){
                        pagePre.push(pagePreHtml);
                    }else {
                        pagePre.push(pagePreHtml);
                        pageNext.push(pageNextHtml);
                    }
                    nums.push(...this.pushFull(0, pageLen));
                }
                break;
            case pageLen > 5:
                if(pageActive===1){
                    pageNext.push(pageNextHtml);
                }else if(pageActive===pageLen){
                    pagePre.push(pagePreHtml);
                }else {
                    pagePre.push(pagePreHtml);
                    pageNext.push(pageNextHtml);
                }
                if ((pageLen - pageActive) >= 3) {
                    let from = pageActive - 2;
                    let end = pageActive + 1;
                    if (from < 0) {
                        from = 0;
                    }
                    if ((end - from) < 3) {
                        end = pageActive + 2;
                    }
                    nums.push(...this.pushFull(from, end));
                    nums.push(
                        <li className="li" key="...">
                            <span className="breviary">...</span>
                        </li>
                    );
                    nums.push(
                        <li className="li" key={end}>
                            <a href="javascript:;" key={end}
                               className={"num-btn"}
                               onClick={(e) => this.choice(e, (pageLen-1))}>{pageLen}</a>
                        </li>
                    )
                } else {
                    let from = pageLen - 5;
                    let end = pageLen;
                    if (from < 0) {
                        from = 0;
                    }
                    nums.push(...this.pushFull(from, end));
                }

                break;
        }
        return (
            <div>{page}</div>
        );
    }

    preHover(e,pre){
        e.target.className = pre ? "pre pre-hover" : "next next-hover";
    }

    nextHover(e,pre){
        e.target.className = pre ? "pre" : "next";
    }

    next() {
        let { pageActive, pageLen } = this.props;
        let value = this.props.pageActive + 1;
        if (pageActive < pageLen){
            this.props.setPage({active: value});
        }
    }

    pre() {
        let { pageActive } = this.props;
        let value = pageActive - 1;
        if (pageActive > 1){
            this.props.setPage({active: value});
        }
    }

    sure(e, type) {
        let { pageLen, pageActive } = this.props;
        let value = parseInt(this.refs.pageInput.value, 10);
        if (type === "click"){
            if (!isNaN(value) && value <= pageLen && value !== pageActive) {
                this.props.setPage({active: value});
            }
        }else {
            if (e.keyCode === 13) {
                if (!isNaN(value) && value <= pageLen && value !== pageActive) {
                    this.props.setPage({active: value});
                }
            }
        }

    }

    choice(e, inx) {
        let value = inx + 1;
        this.props.setPage({active: value});
    }

}

Pages.propTypes = {
    pageLen: PropTypes.number,//总长度
    pageActive: PropTypes.number//当前激活页
};
