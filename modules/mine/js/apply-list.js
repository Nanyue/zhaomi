var zhaomi = require('../../../lib/common/common');
var utils = require('../../../common/utils');

exports.init = function() {
    var btnMapper = {
        'approve': '<button class="z-btn green" data-optype="approve">通过</button>',
        'approve_cancel': '<button class="z-btn green" data-optype="approve_cancel">取消通过</button>',
        'deny': '<button class="z-btn red" data-optype="deny">拒绝</button>',
        'deny_cancel': '<button class="z-btn green" data-optype="deny_cancel">取消拒绝</button>',
        'finish': '<button class="z-btn green" data-optype="finish">确认完成</button>',
        'finished': '<button class="z-btn green" data-optype="finished">已完成</button>',
        'denied': '<button class="z-btn red">已谢绝</button>'
    }

    $('#apply-list').on('click', '.apply-item-content button', function() {
        var $applyItemCon = $(this).closest('.apply-item-content');
        var $applyItem = $applyItemCon.parent('.apply-item');
        var $container = $applyItem.closest('#mine-container');
        var opType = $(this).data('optype');
        var actionId = $container.data('action');
        var targetId = $applyItem.data('target');

        switch (opType) {
            case 'deny':
                post(opType, actionId, targetId, function() {
                    addBtns(['deny_cancel', 'denied']);
                });
                break;
            case 'deny_cancel':
                post(opType, actionId, targetId, function() {
                    addBtns(['approve', 'deny']);
                });
                break;
            case 'approve':
                post(opType, actionId, targetId, function() {
                    addBtns(['finish', 'approve_cancel']);
                });
                break;
            case 'approve_cancel':
                post(opType, actionId, targetId, function() {
                    addBtns(['approve', 'deny']);
                });
                break;
            case 'finish':
                post(opType, actionId, targetId, function() {
                    addBtns(['finished']);
                });
                break;
        }

        function removeBtns(opType) {
            if (btnMapper[opType]) {
                $applyItemCon.find('button').remove();
            }
        }

        function addBtns(typeArr) {
            for (var i = 0, leni = typeArr.length; i < leni; i++) {
                $applyItemCon.append($(btnMapper[typeArr[i]]));
            }
        }

        function post(opType, actionId, target, callback) {
            zhaomi.postData('/mine/manage', {
                action: actionId,
                target: target,
                optype: opType,
            }, function(res) {
                var success = res && res.success;
                var data = res.data;

                if (res.success) {
                    removeBtns(opType);
                    callback();
                } else {
                    for (var i in data) {
                        utils.warn(data[i]);
                        break;
                    }
                    
                }
            });
        }
    })

    $('#apply-extra').on('click', '.export', function() {
        var $container = $('#mine-container');
        var action = $container.data('action');

        zhaomi.postData('/mine/manage', {
            optype: 'excel',
            action: action
        }, function(res) {
            var success = res && res.success;
            var data = res && res.data;
            
            if (success) {
                if (data.url) {
                    location.href = data.url;  
                } 
            }
        })
    })

}