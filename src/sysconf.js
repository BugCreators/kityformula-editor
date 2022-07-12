/*!
 * 系统配置文件
 */

define( function (require) {
    var i18n = require( "i18n");

    return {

        // 光标符号
        cursorCharacter: "\uF155",

        // 根占位符内容与颜色
        rootPlaceholder: {
            color: "#666",
            content: i18n.localize("在此处键入公式"),
            fontsize: 16
        },

        scrollbar: {
            padding: 5,
            step: 150
        }

    };

} );