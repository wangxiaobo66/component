/**
 * Created by wang on 16/6/22.
 */
const QUERY_BOX_CHECKBOX = 'QUERY_BOX_CHECKBOX';
module.exports = {
    QUERY_BOX_CHECKBOX: QUERY_BOX_CHECKBOX,
    queryBoxCheckbox: function (active) {
        return {
            type: QUERY_BOX_CHECKBOX,
            active
        }
    }
};