/**
 * Created by jin on 16/6/22.
 */
const LEFT_NAV_FIRST = 'LEFT_NAV_FIRST';
const LEFT_NAV_NEXT = 'LEFT_NAV_NEXT';
const LEFT_NAV_ROLE = 'LEFT_NAV_ROLE';
module.exports = {
    LEFT_NAV_FIRST: LEFT_NAV_FIRST,
    leftNavFirst: function (selectFirst) {
        return {
            type: LEFT_NAV_FIRST,
            selectFirst
        }
    },
    LEFT_NAV_NEXT: LEFT_NAV_NEXT,
    leftNavNext: function (selectNext) {
        return {
            type: LEFT_NAV_NEXT,
            selectNext
        }
    },
    LEFT_NAV_ROLE: LEFT_NAV_ROLE,
    leftNavRole: function (role) {
        return {
            type: LEFT_NAV_ROLE,
            role
        }
    }
};