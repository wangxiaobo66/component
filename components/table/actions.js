/**
 * Created by jin on 16/6/22.
 * Modified by ping on 16/7/7.
 */

const util = require('util');

// applyCompany
const TABLE_LIST = 'TABLE_LIST';
function tableList(tableData) {
    return {
        type: TABLE_LIST,
        tableData
    }
}

// businessList
const BUSINESS_LIST = 'BUSINESS_LIST';
function businessList(tableData) {
    return {
        type: BUSINESS_LIST,
        tableData
    }
}

// selfModules
const WRITE_SELF_MODULES = 'WRITE_SELF_MODULES';
function writeSelfModules(data) {
    return {
        type: WRITE_SELF_MODULES,
        data
    }
}

// combineModules
const WRITE_COMBINE_MODULES = 'WRITE_COMBINE_MODULES';
function writeCombineModules(data) {
    return {
        type: WRITE_COMBINE_MODULES,
        data
    }
}

// eventLogManagement
const WRITE_EVENT_LOG_MANAGEMENT = 'WRITE_EVENT_LOG_MANAGEMENT';
function writeEventLogManagement(data) {
    return {
        type: WRITE_EVENT_LOG_MANAGEMENT,
        data
    }
}

// eventLog
const WRITE_EVENT_LOG = 'WRITE_EVENT_LOG';
function writeEventLog(data) {
    return {
        type: WRITE_EVENT_LOG,
        data
    }
}

module.exports = {

    // applyCompany
    TABLE_LIST: TABLE_LIST,
    applyCompanyList: function (requestData) {
        const url = '/scoreweb/company/getApplyList';
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let tableData = json.data.data.list;
                            dispath(tableList(tableData))
                        }
                    )
                },
                error => {
                    console.log("error");
                }
            )
        }
    },

    // businessList
    BUSINESS_LIST: BUSINESS_LIST,
    getBusinessList: function (requestData) {
        const url = '/scoreweb/company/getCooperationCompanyList';
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let tableData = json.data.data.list;
                            dispatch(businessList(tableData));
                        }
                    )
                }
            )
        }
    },

    // selfModules
    WRITE_SELF_MODULES: WRITE_SELF_MODULES,
    achieveSelfModules: function (requestData) {
        const url = '/scoreManagement/module/getSelfModules';
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let {data} = json;
                            dispatch(writeSelfModules(data));
                        }
                    );
                },
                error => {
                    console.log("error");
                }
            );
        };
    },

    // combineModules
    WRITE_COMBINE_MODULES: WRITE_COMBINE_MODULES,
    achieveCombineModules: function (requestData) {
        const url = '/scoreManagement/module/getCombineModules';
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let {data} = json;
                            dispatch(writeCombineModules(data));
                        }
                    );
                },
                error => {
                    console.log("error");
                }
            );
        };
    },

    // eventLogManagement
    WRITE_EVENT_LOG_MANAGEMENT: WRITE_EVENT_LOG_MANAGEMENT,
    achieveEventLogManagement: function (requestData) {
        const url = '/scoreManagement/eventlog/getEventlog';
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let {data} = json;
                            dispatch(writeEventLog(data));
                        }
                    );
                },
                error => {
                    console.log("error");
                }
            );
        };
    },

    // eventLog
    WRITE_EVENT_LOG: WRITE_EVENT_LOG,
    achieveEventLog: function (requestData) {
        const url = '/scoreweb/eventlog/getEventlog';
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let {data} = json;
                            dispatch(writeEventLog(data));
                        }
                    );
                },
                error => {
                    console.log("error");
                }
            );
        };
    }

};