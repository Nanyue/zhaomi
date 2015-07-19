require('../css/header');
var _ = require('../../../lib/lodash/lodash.min');
var utils = require('../../../common/utils');

// export something which is related to header
module.exports = function() {}

$(function() {

    var $win = $(window);
    var $doc = $(document);
    var $area = $('#area');
    var $areaDroplist = $area.find('#area-droplist');
    var $search = $('#search');
    // 查询开始下标
    var from = 0;
    // 查询的记录数
    var size = 20;

    // 初始化地区筛选列表
    if ($areaDroplist.citySelect) {
        $areaDroplist.citySelect({
            prov: '北京',
            nodata: 'none'
        });
    }

    // 获取地区数据
    $areaDroplist.find('.city').change(function() {
        utils.goTo({
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
                utils.goTo({
                    q: q
                }, true)
            }
        }
    })

    $doc.on('click', '.cancel-create', function() {
        
    })
});