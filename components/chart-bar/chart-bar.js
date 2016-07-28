/**
 * Created by ping on 16/6/30.
 */

require('chart-bar.scss');
const React = require('react');
const render = require('react-dom').render;
const util = require('util');

let chartBar = null;

export class ChartBar extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div className="module-chart-bar">
                <div id="chart-bar" ref="chartBody"></div>
            </div>
        );
    }

    componentDidMount () {
        let {chartBarReturn} = this.props;
        chartBar = echarts.init(document.getElementById('chart-bar'));
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
            series: [{
                type: 'bar',
                barWidth: 50,
                itemStyle: {
                    normal: {
                        color: '#2AC5C9'
                    }
                },
                data: []
            }]
        });
        
        chartBar.on('click', function (params) {
            if (params.componentType === 'series') {
                chartBarReturn();
            }
        })
    }

    componentWillReceiveProps (nextProps) {
        let {barData} = nextProps;
        if (this.refs.chartBody && barData.xAxis) {
            chartBar.setOption({
                xAxis: {
                    data: barData.xAxis
                },
                series: [{
                    data: barData.yAxis
                }]
            });
        }
    }
}