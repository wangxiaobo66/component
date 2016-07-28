/**
 * Created by jin on 16/6/22.
 */
const TABS_SWITCH = 'TABS_SWITCH';

module.exports = {
    tabsSwitch: function (tabsData, i) {
        return {
            type: TABS_SWITCH,
            index: i,
            tabsData
        }
    }
};