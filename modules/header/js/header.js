require('../css/header');
var _ = require('../../../lib/lodash/lodash.min');

// export something which is related to header
module.exports = function() {}

$(function() {

    var $win = $(window);
    var $doc = $(document);
    var $area = $('#area');
    var $areaDroplist = $area.find('#area-droplist');
    var $hotWrapper = $('#hot-wrapper');
    var $categoryWrapper = $('#category-wrapper');
    var $search = $('#search');
    // 查询开始下标
    var from = 0;
    // 查询的记录数
    var size = 20;

    // 初始化地区筛选列表
    $areaDroplist.citySelect({
        prov: '北京',
        nodata: 'none'
    });

    // 获取地区数据
    $areaDroplist.find('.city').change(function() {
        goTo({
            loc: $(this).val()
        })
    });

    $area.on('mouseenter', function() {
        $areaDroplist.show();
    });

    // 处理搜索
    $doc.click(function(ev) {
        if (!$(ev.target).closest('#area').length) {
            $areaDroplist.hide();
        }
    }).on('keypress', function(ev) {
        var q = $search.find('input').val();
        if (ev.keyCode === 13) {
            if (q) {
                goTo({
                    q: q
                })
            }
        }
    })

    // 处理过滤找米热门
    $hotWrapper.on('click', 'ul li', function() {
        goTo({
            hot: $(this).data('type')
        });
    })

    // 处理过滤类别
    $categoryWrapper.on('click', 'ul li', function() {
        goTo({
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

    // 根据传入参数拼装url，并跳转到该url
    function goTo(params) {
        var oldParams = getUrlParameter();
        var newParams = _.extend({}, oldParams, params);

        location.href = '/search?' + $.param(newParams);
    }

    function getUrlParameter() {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        var pairs;
        var ret = {};
        for (var i = 0; i < sURLVariables.length; i++) {
            var pairs = sURLVariables[i].split('=');
            if (pairs[0]) {
                ret[pairs[0]] = decodeURIComponent(pairs[1]);
            }
        }
        return ret;
    }
});