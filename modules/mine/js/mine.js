require('../../../common/pkgs/button/button');
require('../css/mine');

var header = require('../../header/js/header');
var zhaomi = require('../../../lib/common/common');
var shareBox = require('../../../common/pkgs/shareBox/shareBox');
var applyList = require('./apply-list');
var personalMod = require('./personal-info');

$(function() {
    applyList.init();
    personalMod.init();

    // 展示报名列表中的申请人详细信息
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

    // 活动信息中的各种操作
    $('.action-card').on('click', '.edit', function() {
        var action = $(this).data('action');
        if (action) {
            window.location.href = action;    
        }
    }).on('click', '.duplicate, .delete', function() {
        var action = $(this).data('action');
        if (action) {
            zhaomi.postData(action, {}, function(res) {
                var success = res && res.success;
                var data = res && res.data;
                
                if (success) {
                    if (data.url) {
                        location.href = data.url;  
                    } 
                }
            });
        }
    }).on('click', '.c-share, .b-share, .share', function() {
        var $actionCard = $(this).closest('.action-card');
        var shareLink = $actionCard.data('link');

        if (shareLink) {
            shareBox.show({
                shareLink: shareLink
            })
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
    }).on('click', '.publish', function() {
        var $actionCard = $(this).closest('.action-card');
        var actionId = $actionCard.data('id');

        if (actionId) {
            zhaomi.postData('/action/' + actionId + '/publish', {
                from: 'start'
            }, function(res) {
                var success = res && res.success;

                if (success) {
                    location.href = '/mine/start';
                }
            });    
        }
        
    }).on('click', '.apply-forbidden', function() {
        var $actionCard = $(this).closest('.action-card');
        var actionId = $actionCard.data('id');

        if (actionId) {
            zhaomi.postData('/action/' + actionId + '/stop', {
                
            }, function(res) {
                var success = res && res.success;

                if (success) {
                    location.href = '/mine/start';
                }
            });    
        }
    }).on('click', '.apply-resume', function() {
        var $actionCard = $(this).closest('.action-card');
        var actionId = $actionCard.data('id');

        if (actionId) {
            zhaomi.postData('/action/' + actionId + '/start', {
                
            }, function(res) {
                var success = res && res.success;

                if (success) {
                    location.href = '/mine/start';
                }
            });    
        }
    }).on('click', '.unapply', function() {
        var $actionCard = $(this).closest('.action-card');
        var actionId = $actionCard.data('id');

        if (actionId) {
            zhaomi.postData('/action/' + actionId + '/unapply', {
                
            }, function(res) {
                var success = res && res.success;

                if (success) {
                    location.href = '/mine/apply';
                }
            });    
        }
    });

    // 推荐注册
    $('#personal-info').on('click', '.recommend', function() {
        var shareLink = $(this).data('link');

        if (shareLink) {
            shareBox.show({
                shareLink: shareLink
            })
        }
    });

    utils.loadMore(function() {
        $.ajax({
            url: location.href,
            dataType: 'jsonp',
            success: function(html) {
                $('body').append('<p>加载更多</p>')        
            },
            error: function() {
                console.log('失败')
            }
        })
        
    })

});