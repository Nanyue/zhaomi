require('../../../common/pkgs/button/button');
require('../css/register');

var zhaomi = require('../../../lib/common/common');
var utils = require('../../../common/utils');

$(function() {
    // 处理在ff下的bug
    if ($.browser.mozilla) {
        $(document).on('click', 'label', function(e) {
            if (e.currentTarget === this && e.target.nodeName !== 'INPUT') {
                $(this.control).click();
            }
        });
    }

    // 第一步注册值校验
    $('#register-form').submit(function() {

        var username = $('#username').val();
        var pwd = $('#pwd').val();
        var confirmedPwd = $('#pwd-confirm').val();

        $(this).ajaxSubmit({
            beforeSubmit: function(formData, jqForm, options) {
                if (!username) {
                    utils.warn('请填写邮箱/用户名!');
                    return false;
                }

                if (!pwd) {
                    utils.warn('请填写密码!');
                    return false;
                }

                if (pwd !== confirmedPwd) {
                    utils.warn('两次密码输入不相同!');
                    return false;
                }
            },
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
                        $('#' + key).parent().removeClass('focus').addClass('err');
                        utils.warn(data[key]);
                        break;
                    }
                }
            }
        });

        return false;
    });

    $('input').focus(function() {
        $(this).parent().removeClass('err').addClass('focus');
    }).blur(function() {
        $(this).parent().removeClass('focus');
    })
    
    // 第二步注册
    $('#sendcode').click(function() {
        var mobile = $('#mobile').val();

        zhaomi.postData('/sendcode', {
            mobile: mobile
        }, function() {
            utils.warn('已发送验证码!');
        })
    })
    
    // $('#register-pre').click(function() {

    //     zhaomi.postData('//zhaomi.biz/login', {
    //         username: username,
    //         pwd: pwd,
    //         confirmedPwd: confirmedPwd
    //     }, function() {
    //         // location.href = '//zhaomi.biz/register';
    //     })
    // });

    $('#register').click(function() {

    })

    if ($('.form_datetime').datetimepicker) {
        $('.form_datetime').datetimepicker({
            language: 'zh-CN',
            weekStart: 1,
            autoclose: 1,
            startView: 4,
            forceParse: 0,
            showMeridian: 1,
            minView: 2,
            maxView: 4,
            format: 'yyyy-mm-dd',
            initialDate: new Date('1990-01-01')
        });
    }

    var $genderContainer = $('#gender-c');
    var $genderDroplist = $genderContainer.find('#gender-droplist');
    var $gender = $genderContainer.find('#gender');

    $('#gender-c').on('mouseenter', function() {
        $genderDroplist.show();
    }).on('mouseleave', function() {
        $genderDroplist.hide();
    }).on('click', 'ul li', function() {
        var genderTxt = $(this).data('txt');
        var gender = $(this).data('val');
        $genderContainer.find('p').text(genderTxt);
        $gender.val(gender);
        $genderDroplist.hide();
    });
});