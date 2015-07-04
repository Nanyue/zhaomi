require('../../../common/pkgs/button/button');
require('../css/mine');

var header = require('../../header/js/header');
var share = require('../../../common/pkgs/share/share');

$(function() {
    $('#apply-list').on('click', '.detail', function() {
        var $content = $(this).closest('.apply-item').find('.detail-content');

        if ($(this).hasClass('on')) {
            $content.hide();
            $(this).removeClass('on');
        } else {
            $content.show();
            $(this).addClass('on');
        }   
    })
});