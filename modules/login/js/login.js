require('../../../common/pkgs/button/button');
require('../css/login');

var zhaomi = require('../../../lib/common/common');
var utils = require('../../../common/utils');

$(function() {
    $doc = $(document);

    $('body').height($doc.height());

    $('#login-form').on('submit', function() {
        var username = $('#username').val();
        var pwd = $('#pwd').val();

        if (!username) {
            utils.warn('请填写邮箱/用户名!');
            return false;
        }

        if (!pwd) {
            utils.warn('请填写密码!');
            return false;
        }

        return true;
    });
});