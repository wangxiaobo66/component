/**
 * Created by jin on 16/6/22.
 */
const BOXY_SHOW = 'BOXY_SHOW';
const BOXY_HIDE = 'BOXY_HIDE';

module.exports = {
    BOXY_SHOW: BOXY_SHOW,
    boxyShow: function (showMsg) {
        return {
            type: BOXY_SHOW,
            showMsg
        }
    },
    BOXY_HIDE: BOXY_HIDE,
    boxyHide: function () {
        return {
            type: BOXY_HIDE
        }
    }
};