require('../../../common/pkgs/button/button');
require('../css/detail');

var header = require('../../header/js/header');
var shareBox = require('../../../common/pkgs/shareBox/shareBox');
var utils = require('../../../common/utils');

var RADIO = 'radio';
var CHECKBOX = 'checkbox';
var QUESTION = 'question';
var UPLOAD = 'upload';

$(function() {

    var $detailContainer = $('#detail-container');

    $('#detail-questions').on('click', '.detail-answers li', function() {
        var $detailItem = $(this).closest('.detail-item');
        var type = $detailItem.data('type');

        if (type === RADIO) {
            $(this).parents('.detail-answers').find('span').removeClass('selected');
            $(this).find('span').addClass('selected');
        } else if (type === CHECKBOX) {
            $(this).find('span').toggleClass('selected');
        }
    })

    $('.share-bonus').click(function() {
        var id = $detailContainer.data('id');
        var code = $actionCard.data('code');
        var shareLink = 'http://zhaomi.biz/action/' + id + '?code=' + code;

        shareBox.show({
            selector: '#share-dialog',
            shareLink: shareLink
        })
    })

    $('#apply-form').submit(function() {
        var data = collectData();

        $(this).ajaxSubmit({
            beforeSubmit: function() {
                if ($('.detail-item').length !== data.length) {
                    utils.warn('有题目未作答！')
                    return false;
                }
            },
            success: function() {

            }
        })

        return false;
    })

})
window.collectData = collectData;
function collectData() {
    var data = [];

    $('.detail-item').each(function(idx, elem) {
        var q, type , opts = [];
        var $detailItem = $(elem);
        var singleRet;
        var arr = [];
        var question;

        type = $detailItem.data('type');
        
        if (type === RADIO || type === CHECKBOX) {
            $detailItem.find('.detail-answers li')
                .each(function(idx, elem) {
                    if ($(elem).children('span').hasClass('selected')) {
                        arr.push(idx);
                    }
                })

            if (arr.length) {
                data.push({
                    result: arr.join(',')
                })
            }
            
        } else if (type === QUESTION) {
            question = $detailItem.find('textarea').val();

            if (question) {
                data.push({
                    result: question
                })
            }
        } else if (type === UPLOAD) {
            if ($detailItem.find('input').val()) {
                data.push({
                    result: 'whatever'
                })
            }
        }
    })

    return data;
}