/**
 * Created by wang on 16/6/22.
 */
const LIST_FRAME = 'LIST_FRAME';
const LIST_FRAME_ACTIVE = 'LIST_FRAME_ACTIVE';
const LIST_FRAME_DIV = 'LIST_FRAME_DIV';
const LIST_FRAME_DIV_REMOVE = 'LIST_FRAME_DIV_REMOVE';
const LIST_FRAME_DIV_PAGE = 'LIST_FRAME_DIV_PAGE';
const LIST_FRAME_LI_REMOVE = 'LIST_FRAME_LI_REMOVE';
const LIST_REAME_LI_ADD = 'LIST_REAME_LI_ADD';


module.exports = {
    LIST_FRAME: LIST_FRAME,
    listFrame: function (listFrame) {
        return {
            type: LIST_FRAME,
            listFrame
        }
    },
    LIST_FRAME_ACTIVE: LIST_FRAME_ACTIVE,
    listFrameActive: function (active) {
        return {
            type: LIST_FRAME_ACTIVE,
            active
        }
    },
    LIST_FRAME_DIV: LIST_FRAME_DIV,
    listFrameDiv: function (listDiv) {
        return {
            type: LIST_FRAME_DIV,
            listDiv
        }
    },
    LIST_FRAME_DIV_REMOVE: LIST_FRAME_DIV_REMOVE,
    listFrameDivRemove: function (index) {
        return {
            type: LIST_FRAME_DIV_REMOVE,
            index
        }
    },
    LIST_FRAME_DIV_PAGE: LIST_FRAME_DIV_PAGE,
    listFrameDivRage: function (page) {
        return {
            type: LIST_FRAME_DIV_PAGE,
            page
        }
    },
    LIST_FRAME_LI_REMOVE: LIST_FRAME_LI_REMOVE,
    listFrameLiRemove: function (indexLi) {
        return {
            type: LIST_FRAME_LI_REMOVE,
            indexLi
        }
    },
    LIST_REAME_LI_ADD: LIST_REAME_LI_ADD,
    listFrameLiAdd: function (ObjLi) {
        return {
            type: LIST_REAME_LI_ADD,
            ObjLi
        }
    }
};