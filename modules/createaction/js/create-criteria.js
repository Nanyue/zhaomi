require('../../../common/pkgs/button/button');
require('../../../common/pkgs/progress/progress');
require('../css/create');

var header = require('../../header/js/header');

$(function() {
    $('#criteria-operation').on('click', 'ul li', function() {

    })

    $('#action-container').on('mouseenter', '.criteria-q, ul li', function() {
        $(this).find('.criteria-del').show();
    }).on('mouseleave', '.criteria-q, ul li', function() {
        $(this).find('.criteria-del').hide();
    });


});