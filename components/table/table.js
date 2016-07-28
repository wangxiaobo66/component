/* 
 * Created by ping on 16/5/19.
 * 组件所需数据:
 *   i. [来自服务器的表格数据props(范例)] tableData: [{
 *       id: 1,
 *       moduleName: '评分模型',
 *       createTime: '2016-03-26',
 *       username: 'admin',
 *       statusStr: '已激活',
 *       ksStr: '43.1%',
 *       operation: [
 *           {name: 'sure', status: 1},
 *           {name: 'modify', status: 0},
 *           {name: 'delete', status: 1}
 *       ]
 *    }]
 *   ii. 入口文件componentWillMount中dispatch action: TABLE_QUERY_DATA
 *   iii. props:
 *       1. dispatch action: btnGroupSure
 *       2. dispatch action: btnGroupModify
 *       3. dispatch action: btnGroupDelete
 *       4. columns: [ //表头配置项，数组长度等于表格列数
 *              {name: 'tabaleData键名', desc: '表头显示名', width: '表头宽度(百分比)'}
 *          ]
 */

require('table.scss');
const util = require('util');
const React = require('react');
const render = require('react-dom').render;
let PropTypes = React.PropTypes;

const {BtnGroup} = require('btn-group');
const {TablePlugins} = require('table-plugins');

export class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    createTableHead() { //创建tHead
        let tableHeadNode = [];
        let {columns} = this.props;
        if (!columns) {
            columns = [];
        }
        for (let i = 0, len = columns.length; i < len; i++) {
            tableHeadNode.push(
                <th className="table-head" key={i}>{columns[i].desc}</th>
            );
        }
        return tableHeadNode;
    }
    
    createTableBody() { //利用后端tableData创建tBody
        let {tableData} = this.props;
        if (!tableData) {
            tableData = [];
        }
        let tableBodyNode = [];
        for (let i = 0, len = tableData.length; i < len; i++) {
            tableBodyNode.push(
                <tr className="table-row" key={i}>{this.createTableCell(tableData[i])}</tr>
            );
        }
        return tableBodyNode;
    }

    createTableCell(rowList) { //运行在createTableBody()里，负责依据columns生成对应的单元格
        let {tableMsg} = this.props;
        rowList.operation = [
            {name: 'sure', status: 0},
            {name: 'modify', status: 1}
        ];
        let {columns, btnGroupSure, btnGroupModify, btnGroupDelete, timestamp} = this.props;
        let tableCellNode = [];
        for (let i = 0, len = columns.length; i < len; i++) {
            let { name } = columns[i];
            if ( name === 'operation' ) {
                tableCellNode.push(
                    <td className="table-cell" key={i}>
                        <BtnGroup
                            rowList={rowList}
                            btnGroupSure={btnMsg => btnGroupSure(btnMsg)}
                            btnGroupModify={btnMsg => btnGroupModify(btnMsg)}
                            btnGroupDelete={btnMsg => btnGroupDelete(btnMsg)} />
                    </td>
                );
            } else if (name === 'btns') {
                tableCellNode.push(
                    <td className="table-cell" key={i}>
                        <TablePlugins
                            rowList={rowList}
                            btnsMsg={tableMsg.btnsMsg} />
                    </td>
                );
            } else if (name === 'input') {
                tableCellNode.push(
                    <td className="table-cell" key={i}>
                        <TablePlugins
                            rowList={rowList}
                            inputMsg={tableMsg.inputMsg} />
                    </td>
                );
            } else if (name === timestamp) {
                let timeValue = util.getLocalTime(rowList[name], 'dateTime')
                tableCellNode.push(
                    <td className="table-cell" key={i}>{timeValue}</td>
                );
            } else {
                tableCellNode.push(
                    <td className="table-cell" key={i}>{rowList[name]}</td>
                );
            }
        }
        return tableCellNode;
    }

    render() {
        return(
            <div className="module-table">
                <table className="table-container">
                    <thead className="table-head-container">
                        <tr>
                            {this.createTableHead()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.createTableBody()}
                    </tbody>
                </table>
            </div>
        );
    }
}

Table.propTypes = {
        tableData: PropTypes.array,
        btnGroupSure: PropTypes.func,
        btnGroupDelete: PropTypes.func,
        btnGroupModify: PropTypes.func
}