/**
 * Created by jin on 16/6/22.
 */
function getSelfInfo() {
    return fetch('/scoreweb/user/getSelfInfo', {credentials: 'include'})
}

function postSelfInfo(data) {
    return fetch('/scoreweb/user/updateSelfInfo', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
}

//验证原始密码
function postOldPassWord(data) {
    return fetch('/scoreweb/user/checkPassword', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
}

//验证码
function postVerify(data) {
    return fetch('/scoreweb/user/checkValidateCode', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
}

//修改密码
function postPassWord(data) {
    return fetch('/scoreweb/user/updatePassword', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
}

module.exports = {
    userInfoList: function () {
        return function (dispatch) {
            return getSelfInfo().then(
                function (res) {
                    res.json().then(function (json) {
                        if (json.result === "0") {
                            dispatch(userMessage(json.data))
                        }
                    })
                }
            )
        }
    },
    modifySelfInfo: function (data) {
        let info = data;
        return function (dispatch) {
            return postSelfInfo(info).then(
                function (res) {
                    res.json().then(function (json) {

                    })
                }
            )
        }
    },
    verifyOldPassWord: function (data) {
        let info = data;
        return function (dispatch) {
            return postOldPassWord(info).then(
                function (res) {
                    res.json().then(function (json) {
                        dispatch(modifyReturn(json.result))
                    })
                }
            )
        }
    },
    verifyCode: function (data) {
        let info = data;
        return function (dispatch) {
            return postVerify(info).then(
                function (res) {
                    res.json().then(function (json) {
                        if (json.result !== "0") {
                            let newSrc = "/scoreweb/user/createCaptcha?" + new Date().getTime();
                            dispatch(tryCode(newSrc));
                        } else {
                            dispatch(inputCode(info))
                        }
                    })
                }
            )
        }
    },
    modifyPassWord: function (data) {
        let info = data;
        return function (dispatch) {
            return postPassWord(info).then(
                function (res) {
                    res.json().then(function (json) {
                        console.log(json)
                    })
                }
            )
        }
    }
};