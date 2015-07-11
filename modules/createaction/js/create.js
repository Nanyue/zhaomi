require('../../../common/pkgs/button/button');
require('../../../common/pkgs/progress/progress');
require('../css/create');

var header = require('../../header/js/header');

$(function() {

    var $saveDialog = $('#save-dialog');
    var $publishDialog = $('#publish-dialog');
    var $form = $('#create-action-final');
    
    $('#publish').click(function() {
        $form.ajaxForm({
            dataType: 'json',
            success: function(res) {
                var success = res && res.success;
                var data = res && res.data;
                
                if (success) {
                    if (data.url) {
                        location.href = data.url;  
                    } 
                } else {
                    for (var key in data) {
                        $('#' + key).removeClass('focus').addClass('err');
                        utils.warn(data[key]);
                        break;
                    }
                }
            }
        })

        $form.submit();
    });

    $('#save').click(function() {
        var actionUrl = $(this).data('action');

        $form.ajaxForm({
            url: actionUrl,
            dataType: 'json',
            success: function(res) {
                var success = res && res.success;
                var data = res && res.data;
                
                if (success) {
                    // $saveDialog.dialog({
                    //     resizable: false,
                    //     width: 600,
                    //     title: ''
                    // });
                } else {
                    for (var key in data) {
                        $('#' + key).removeClass('focus').addClass('err');
                        utils.warn(data[key]);
                        break;
                    }
                }
            }
        })

        $form.submit();
    });
    
});