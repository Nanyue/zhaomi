require('../../../common/pkgs/button/button');
require('../css/list');

var header = require('../../header/js/header');
var shareBox = require('../../../common/pkgs/shareBox/shareBox');
var utils = require('../../../common/utils');

$(function() {

    var $win = $(window);
    var $doc = $(document);
    var $hotWrapper = $('#hot-wrapper');
    var $categoryWrapper = $('#category-wrapper');
    var $actionCard = $('.action-card');

    $('#banner').unslider({
        speed: 600,
        delay: 3000, 
        dots: true
    });

    $('.share').click(function() {
        var $actionCard = $(this).closest('.action-card');
        var id = $actionCard.data('id');
        var code = $actionCard.data('code');
        var shareLink = 'http://zhaomi.biz/action/' + id + '?code=' + code;

        shareBox.show({
            selector: '#share-dialog',
            shareLink: shareLink
        })
    });

    $actionCard.on('click', '.title', function() {
        window.open('/demo/detail.html', '_blank');
    })

    // 处理过滤找米热门
    $hotWrapper.on('click', 'ul li', function() {
        utils.goTo({
            hot: $(this).data('type')
        });
    })

    // 处理过滤类别
    $categoryWrapper.on('click', 'ul li', function() {
        utils.goTo({
            type: $(this).data('type')
        });
    })

    // 处理加载更多
    $doc.scroll(function() {
        var LOADING_GAP = 200;
        if ($doc.height() < $doc.scrollTop() + $win.height() + LOADING_GAP) {
            $('body').height($('body').height() + 500)
            console.log('加载更多')
        }
    })
});