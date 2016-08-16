/**
 * Created by wang on 16/7/12.
 */

require('chart-bargroup.scss');
const React = require('react');
const render = require('react-dom').render;
const util = require('util');

let chartBar = null;

export class ChartBargroup extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div className="module-chart-bargroup">
                <div id="chart-bargroup" ref="chartBody"></div>
            </div>
        );
    }

    componentDidMount () {
        chartBar = echarts.init(document.getElementById('chart-bargroup'));
        chartBar.setOption({
            backgroundColor: '#fff',
            grid: {
                left: 40,
                right: 20
            },
            tooltip : {},    
            xAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                data: []
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }  
                },
                splitLine: {
                    lineStyle: {
                        color: '#f0f0f0',
                    }
                },
                splitNumber: 6
            },
            series: [],
            color: ['#e74c3c', '#29c7ca', '#2f363a', '#ededed', '#ff775c']
        });
    }

    componentWillReceiveProps (nextProps) {
        let {bargroupData} = nextProps;
        let barData = [];
        let legend = [];
        for (let i = 0, len = bargroupData.moduleData.length; i < len; i++) {
            let data = bargroupData.moduleData[i];
            let group = {
                type: 'bar',
                barGap: '15%',
                barCategoryGap: '50%'
            };
            group.name = data.moduleName;
            group.data = data.data;
            legend.push(data.moduleName);
            barData.push(group);
        }
        if (this.refs.chartBody && bargroupData.dateData) {
            let formatDateData = [];
            for (let i = 0, len = bargroupData.dateData.length; i < len; i++) {
                formatDateData.push(util.getLocalTime(bargroupData.dateData[i], 'date'));
            }
            chartBar.setOption({
                title: {
                    text: bargroupData.companyName,
                    left: 10,
                    textStyle: {
                        color: '#666',
                        fontWeight: 'lighter'
                    }
                },
                legend: {
                    right: 0,
                    itemGap: 30,
                    data: legend
                },
                xAxis: {
                    data: formatDateData
                },
                series: barData
            });
        }
    }
}