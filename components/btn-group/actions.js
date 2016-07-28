/**
 * Created by jin on 16/6/22.
 */
const BTN_GROUP_SURE = 'BTN_GROUP_SURE';
const BTN_GROUP_MODIFY = 'BTN_GROUP_MODIFY';
const BTN_GROUP_DELETE = 'BTN_GROUP_DELETE';
module.exports = {
    BTN_GROUP_SURE: BTN_GROUP_SURE,
    btnGroupSure: function (btnMsg) {
        return {
            type: BTN_GROUP_SURE,
            btnMsg
        }
    },
    BTN_GROUP_MODIFY: BTN_GROUP_MODIFY,
    btnGroupModify: function (btnMsg) {
        return {
            type: BTN_GROUP_MODIFY,
            btnMsg
        }
    },
    BTN_GROUP_DELETE: BTN_GROUP_DELETE,
    btnGroupDelete: function (btnMsg) {
        return {
            type: BTN_GROUP_DELETE,
            btnMsg
        }
    }
};