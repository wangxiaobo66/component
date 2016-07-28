/**
 * Created by jin on 16/6/22.
 */
const MASK_SHOW = 'MASK_SHOW';
const MASK_HIDE = 'MASK_HIDE';


module.exports = {
    MASK_SHOW: MASK_SHOW,
    maskShow: function (showMsg) {
        return {
            type: MASK_SHOW,
            showMsg
        }
    },
    MASK_HIDE: MASK_HIDE,
    maskHide: function () {
        return {
            type: MASK_HIDE
        }
    }
};