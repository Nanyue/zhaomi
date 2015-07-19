require('../../../common/pkgs/button/button');
require('../../../common/pkgs/progress/progress');
require('../css/create');

var header = require('../../header/js/header');
var utils = require('../../../common/utils');

$(function() {
    $('#addr').citySelect({
        prov: '北京',
        nodata: 'none'
    });

    $('#form_datetime_start').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        autoclose: 1,
        startView: 1,
        forceParse: 0,
        showMeridian: 1,
        minView: 0,
        maxView: 4,
        format: 'yyyy-mm-dd hh:ii',
        initialDate: new Date()
    }).on('changeDate', function(ev) {
        var startDate = $('#startdate').val();

        $('#form_datetime_end').datetimepicker({
            language: 'zh-CN',
            weekStart: 1,
            autoclose: 1,
            startView: 1,
            forceParse: 0,
            showMeridian: 1,
            minView: 0,
            maxView: 4,
            format: 'yyyy-mm-dd hh:ii',
            startDate: startDate,
            initialDate: startDate
        })
    });

    $('#poster').change(function() {
        $('#poster-hint').text($(this).val());
    });

    var $actionTypeContainer = $('#action-type-c');
    var $actionTypeDroplist = $actionTypeContainer.find('#action-type-droplist');
    var $actionType = $actionTypeContainer.find('#action-type');

    $('#action-type-c').on('mouseenter', function() {
        $actionTypeDroplist.show();
    }).on('mouseleave', function() {
        $actionTypeDroplist.hide();
    }).on('click', 'ul li', function() {
        var actionTypeTxt = $(this).data('txt');
        var actionType = $(this).data('val');
        $actionTypeContainer.find('p').text(actionTypeTxt);
        $actionType.val(actionType);
        $actionTypeDroplist.hide();
    });

    $('#create-action-first').submit(function() {
        var name = $('#name').val();
        var host = $('#host').val();
        var prov = $('#prov').val();
        var city = $('#city').val();
        var addr = $('#detail-addr').val();
        var durationDay = $('#id_day').val();
        var durationHour = $('#id_hour').val();
        var durationMin = $('#id_minute').val();
        var maxAttendee = $('#id_max_attend').val();
        var bonus = $('#id_reward').val();
        var desc = $('#desc').val();
        var actionType = $('#action-type').val();
        var poster = $('#poster').val();

        $(this).ajaxSubmit({
            beforeSubmit: function(formData, jqForm, options) {
                if (!name) {
                    utils.warn('请填写活动名称!');
                    return false;
                }

                if (!host) {
                    utils.warn('请填写主办方!');
                    return false;
                }

                if (!prov) {
                    utils.warn('请选择省份!');
                    return false;
                }

                if (!city) {
                    utils.warn('请选择城市!');
                    return false;
                }

                if (!addr) {
                    utils.warn('请填写具体的地址!');
                    return false;
                }

                if (durationDay === '') {
                    utils.warn('请填写持续天数!');
                    return false;
                }

                if (+durationDay < 0) {
                    utils.warn('天数应该大于等于0天!');
                    return false;
                }

                if (durationHour === '') {
                    utils.warn('请填写持续小时数!');
                    return false;
                }

                if (+durationHour < 0 || +durationHour > 23) {
                    utils.warn('小时数不合法!');
                    return false;
                }

                if (durationMin === '') {
                    utils.warn('请填写持续分钟数!');
                    return false;
                }

                if (+durationMin < 0 || +durationMin > 59) {
                    utils.warn('分钟数不合法!');
                    return false;
                }

                if (maxAttendee === '') {
                    utils.warn('请填写持续分钟数!');
                    return false;
                }

                if (maxAttendee <= 0) {
                    utils.warn('参与人数应该大于0!');
                    return false;
                }

                if (bonus < 0) {
                    utils.warn('奖励金额值不合法!');
                    return false;
                }

                if (!desc) {
                    utils.warn('请填写活动简介!');
                    return false;
                }

                if (actionType === '') {
                    utils.warn('请选择活动类型!');
                    return false;
                }

                if (/create/.test(location.href)) {
                    if (!poster) {
                        utils.warn('请选择活动海报!');
                        return false;
                    }

                    if (!/\.(jpg|png)$/.test(poster)) {
                        utils.warn('活动海报海报仅支持png/jpg格式的文件!');
                        return false;
                    }
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
                        $('#' + key).removeClass('focus').addClass('err');
                        utils.warn(data[key]);
                        break;
                    }
                }
            },
            error: function() {
                console.error('擦了，创建活动提交失败~')
            }
        });

        return false;
    })

    $('input').focus(function() {
        $(this).removeClass('err').addClass('focus');
    }).blur(function() {
        $(this).removeClass('focus');
    })
});