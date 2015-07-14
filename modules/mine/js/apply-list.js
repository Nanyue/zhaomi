var zhaomi = require('../../../lib/common/common');

exports.init = function() {
    var btnMapper = {
        'approve': '<button class="z-btn green" data-optype="approve">通过</button>',
        'approve_cancel': '<button class="z-btn red" data-optype="approve_cancel">取消通过</button>',
        'deny': '<button class="z-btn red" data-optype="deny">拒绝</button>',
        'deny_cancel': '<button class="z-btn red" data-optype="deny_cancel">取消拒绝</button>',
        'finish': '<button class="z-btn green" data-optype="finish">确认完成</button>',
        'finished': '<button class="z-btn green" data-optype="finished">已完成</button>'
    }

    $('#apply-list').on('click', '.apply-item-content button', function() {
        var $applyItemCon = $(this).closest('.apply-item-content');
        var opType = $(this).data('optype');

        if (btnMapper[opType]) {
            $applyItemCon.find('button').remove();
        }

        switch (opType) {
            case 'deny':
                $applyItemCon
                    .append($(btnMapper['deny_cancel']));
                break;
            case 'deny_cancel':
                $applyItemCon
                    .append($(btnMapper['approve']))
                    .append($(btnMapper['deny']));
                break;
            case 'approve':
                $applyItemCon
                    .append($(btnMapper['finish']))
                    .append($(btnMapper['approve_cancel']));
                break;
            case 'approve_cancel':
                $applyItemCon
                    .append($(btnMapper['approve']))
                    .append($(btnMapper['deny']));
                break;
            case 'finish':
                $applyItemCon
                    .append($(btnMapper['finished']));
                break;
        }
    })
    
    function post(opType, actionId, target) {
        zhaomi.postData('/mine/manage', {
            action: actionId,
            target: target,
            optype: opType
        }, function(ret) {
            
        })
    }

}