require('../../../common/pkgs/button/button');
require('../css/mine');

var header = require('../../header/js/header');
var zhaomi = require('../../../lib/common/common');
// var share = require('../../../common/pkgs/share/share');
var shareBox = require('../../../common/pkgs/shareBox/shareBox');
var applyList = require('./apply-list');

$(function() {
    applyList.init();

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

    var $personalInfo = $('#personal-info');
    var $modifiedInfo = $('#personal-info-modify');
    $personalInfo.on('click', '.edit', function() {
        $personalInfo.hide();
        $modifiedInfo.show();
    })

    $modifiedInfo.on('click', '.save-info', function() {
        // 提交数据
        $('#personal-info-form').ajaxForm({
            beforeSubmit: function() {
                console.log('ajaxForm')
                // return false;
            },
            success: function(data) {

            }
        })
        $personalInfo.show();
        $modifiedInfo.hide(); 
    })

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
    }).on('click', '.c-share, .b-share', function() {
        var $actionCard = $(this).closest('.action-card');
        var shareLink = $actionCard.data('link');

        if (shareLink) {
            shareBox.show({
                shareLink: shareLink
            })
        }
    }).on('click', '.publish', function() {
        zhaomi.postData();
    }).on('click', '.apply-forbidden', function() {
        zhaomi.postData();
    });

    $('#personal-info').on('click', '.recommend', function() {
        var shareLink = $(this).data('link');

        if (shareLink) {
            shareBox.show({
                shareLink: shareLink
            })
        }
    });
});