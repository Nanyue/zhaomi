require('../../../common/pkgs/button/button');
require('../css/list');

var header = require('../../header/js/header');
var shareBox = require('../../../common/pkgs/shareBox/shareBox');
var zhaomi = require('../../../lib/common/common');
var utils = require('../../../common/utils');

$(function() {

    var $win = $(window);
    var $doc = $(document);
    var $hotWrapper = $('#hot-wrapper');
    var $categoryWrapper = $('#category-wrapper');
    var $actionCard = $('.action-card');
    var $banner = $('#banner');

    $banner.unslider({
        speed: 600,
        delay: 3000, 
        dots: true
    });
    // 伪延迟图片加载
    $banner.find('img').each(function() {
        if (!$(this).attr('src')) {
            $(this).attr('src', $(this).data('src'));
        }
    })

    $('.share').click(function() {
        
    });

    $actionCard.on('click', '.title', function() {
        var $actionCard = $(this).closest('.action-card');
        var shareLink = $actionCard.data('link');
        var detailLink = $actionCard.data('detail');

        if (shareLink || detailLink) {
            window.open(shareLink || detailLink, '_blank');
        }
    }).on('click', '.like', function() {
        var $like = $(this);
        var $actionCard = $(this).closest('.action-card');
        var actionId = $actionCard.data('id');
        
        zhaomi.postData('/action/like', {
            id: actionId
        }, function(res) {
            var success = res && res.success;

            if (success) {
                $like.toggleClass('selected');
            }
        })
    }).on('click', '.share', function() {
        var $actionCard = $(this).closest('.action-card');
        var shareLink = $actionCard.data('link');

        shareBox.show({
            id: 'share-dialog',
            shareLink: shareLink
        })
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

    utils.loadMore(function() {
        $.ajax({
            url: location.href,
            dataType: 'jsonp',
            success: function(html) {
                $('body').append('<p>加载更多</p>')        
            },
            error: function() {
                $('body').append('<p>加载失败</p>') 
            }
        })
        
    })
});