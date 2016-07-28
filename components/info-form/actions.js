/**
 * Created by jin on 16/6/22.
 */
const INFOFORM_SUBMIT = 'INFOFORM_SUBMIT';

module.exports = {
    infoFormSubmit: function (submitList) {
        return {
            type: INFOFORM_SUBMIT,
            submitList
        }
    }
};