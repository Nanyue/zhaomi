require('../../../common/pkgs/button/button');
require('../css/mine');

var header = require('../../header/js/header');
var zhaomi = require('../../../lib/common/common');
var shareBox = require('../../../common/pkgs/shareBox/shareBox');
var exchangeBox = require('../../../common/pkgs/exchange/exchange');
var utils = require('../../../common/utils');
var applyList = require('./apply-list');
var personalMod = require('./personal-info');

$(function() {
    applyList.init();
    personalMod.init();

    var $list = $('#list');
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
    $list.on('click', '.action-card .title', function() {
        var $actionCard = $(this).closest('.action-card');
        var shareLink = $actionCard.data('link');
        var detailLink = $actionCard.data('detail');

        if (shareLink || detailLink) {
            window.open(shareLink || detailLink, '_blank');
        }
    }).on('click', '.action-card .edit', function() {
        var action = $(this).data('action');
        if (action) {
            window.location.href = action;    
        }
    }).on('click', '.action-card .duplicate, .action-card .delete', function() {
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
    }).on('click', '.action-card .c-share, .action-card .b-share, .action-card .share', function() {
        var $actionCard = $(this).closest('.action-card');
        var shareLink = $actionCard.data('link');

        if (shareLink) {
            shareBox.show({
                shareLink: shareLink
            })
        }
    }).on('click', '.action-card .like', function() {
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
    }).on('click', '.action-card .publish', function() {
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
        
    }).on('click', '.action-card .apply-forbidden', function() {
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
    }).on('click', '.action-card .apply-resume', function() {
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
    }).on('click', '.action-card .unapply', function() {
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
    $('#personal-info-origin').on('click', '.exchange', function() {
        exchangeBox.show()
    });

    var fullDataReturned = true;
    var from = 12, size = 12;

    utils.loadMore(function() {

        if (!fullDataReturned) {
            return;
        }

        $.ajax({
            url: utils.getJSONPUrl(from, size),
            dataType: 'jsonp',
            success: function(data) {
                data = data || {};
                if (data.size === size) {
                    fullDataReturned = true;
                    from = from + size;
                } else {
                    fullDataReturned = false;
                }
                
                $('#list ul').append(data.html);
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown)
            }
        });

    })

});