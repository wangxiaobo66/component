require('progress-bar.scss');
const React = require('react');
const render = require('react-dom').render;
const util = require('util');

export class ProgressBar extends React.Component {
    constructor (props) {
        super(props);
    }

    createSVGMarking (color) {
        var svgString = '<svg class="svg" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"'
            +'width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">'
            +'<g> <path fill="' + color + '" d="M25.976,17.288H25.95c0.988-1.699,1.563-3.667,1.563-5.774C27.514,5.155,22.359,0,16,0'
            +'C9.641,0,4.486,5.155,4.486,11.514c0,2.685,0.926,5.148,2.467,7.106L16.013,32l9.31-13.749c0.142-0.197,0.278-0.397,0.409-0.603'
            +'L25.976,17.288z"/>'
            +'<circle  opacity="1" fill="#FFFFFF"cx="16" cy="11.514" r="8.859"/>'
            +'<g><path fill="#FFFEFD" d="M14.955,21.889c0.188,0.266,0.29,0.627,0.29,1.073c0,0.439-0.102,0.799-0.29,1.073'
            +'c-0.219,0.305-0.524,0.461-0.931,0.461c-0.407,0-0.712-0.156-0.924-0.461c-0.196-0.266-0.29-0.627-0.29-1.073'
            +'s0.094-0.806,0.29-1.073c0.211-0.305,0.517-0.454,0.924-0.454C14.431,21.436,14.736,21.585,14.955,21.889z M13.436,22.117'
            +'c-0.125,0.203-0.18,0.485-0.18,0.845c0,0.36,0.055,0.642,0.18,0.845c0.125,0.228,0.321,0.345,0.587,0.345'
            +'c0.266,0,0.462-0.117,0.595-0.352c0.118-0.203,0.18-0.477,0.18-0.837c0-0.36-0.062-0.642-0.18-0.845'
            +'c-0.133-0.228-0.329-0.337-0.595-0.337C13.757,21.78,13.562,21.889,13.436,22.117z M17.757,21.326l-3.123,5.808h-0.399'
            +'l3.123-5.808H17.757z M18.9,24.418c0.188,0.266,0.29,0.627,0.29,1.073c0,0.439-0.102,0.799-0.29,1.072'
            +'c-0.219,0.305-0.525,0.462-0.931,0.462s-0.72-0.157-0.931-0.462c-0.196-0.266-0.29-0.626-0.29-1.072s0.094-0.806,0.29-1.073'
            +'c0.211-0.305,0.525-0.454,0.931-0.454S18.681,24.112,18.9,24.418z M17.374,24.645c-0.125,0.203-0.18,0.485-0.18,0.845'
            +'c0,0.36,0.055,0.642,0.18,0.845c0.125,0.227,0.329,0.345,0.595,0.345c0.258,0,0.454-0.118,0.595-0.352'
            +'c0.117-0.203,0.18-0.477,0.18-0.837c0-0.36-0.063-0.642-0.188-0.845c-0.133-0.228-0.329-0.337-0.587-0.337'
            +'C17.703,24.308,17.499,24.418,17.374,24.645z"/>'
            +'</g>'
            +'</g>'
            +'</svg>';
        return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
    }

    createBar () {
        let barNode = [];
        let {progressBarData} = this.props;
        if (!progressBarData) {
            progressBarData = [];
        }
        for (let i = 0, len = progressBarData.length; i < len; i ++) {
            let data = progressBarData[i];
            let status = '';
            let color = '';
            let warningPercent = Math.ceil((data.thresholdValue / data.total)*100);
            let usedPercent = Math.ceil((data.thresholdUsed / data.total)*100);
            switch (data.status) {
                case 0:
                    status = '正常';
                    color = '#2AC5C9';
                    break;
                case 1:
                    status = '预警';
                    color = '#FD4F00';
                    break;
                case 2:
                    status = '锁定';
                    color = '#b5b5b5';
                    break;
                case 3:
                    status = '停用';
                    color = '#C93E2B';
                    break;
            }
            barNode.push(
                <li className="item" key={'progressBar' + i}>
                    <div className="bar-background">
                        <div className="bar-value" style={{width: usedPercent + '%', backgroundColor: color}}></div>
                        <div className="marking" style={{left: usedPercent + '%'}}>
                            <div className="marking-container">
                                <div className="marking-value" style={{color: color}}>
                                    <span className="value">{(usedPercent === 100) ? 'X' : usedPercent}</span>
                                </div>
                                {this.createSVGMarking(color)}
                            </div>
                        </div>
                        <span className="warning-mark" style={{left: warningPercent + '%'}}></span>
                        <span className="status" style={{color: color}}>{status}</span>
                    </div>
                    <div className="label">
                        <span className="name">{data.name}</span>
                        <span className="proportion" style={{color: color}}>{data.thresholdUsed}/{data.total}</span>
                    </div>
                </li>
            );
        }
        return barNode;
    }

    render () {
        return (
            <div className="module-progress-bar">
                <ul className="bar-container">
                    {this.createBar()}
                </ul>
            </div>
        );
    }
}