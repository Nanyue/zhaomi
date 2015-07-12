require('./sharebox.less');
var share = require('../share/share');
var utils = require('../../utils');

module.exports = {
    /**
     * 展示分享框
     *
     * @param data
     *  - selector
     *  - shareLink
     *  - width
     */
    show: function(data) {

        if (!data || !data.shareLink) {
            return;
        }

        var id = data.id || 'share-dialog';
        var idSelector = '#' + id;
        var $dialog = $(idSelector);
        var shareLink = data.shareLink;
        var width = data.width || 500;
        var compiledTpl;

        if (shareLink.indexOf('/') === 0) {
            shareLink = 'http://zhaomi.biz' + shareLink;
        }

        compiledTpl = utils.compileTpl(SHAREBOX_TPL, {
            id: id,
            shareLink: shareLink
        })

        if (!$dialog.length) {
            $('body').append($(compiledTpl));
            $dialog = $(idSelector);
        }

        $dialog.find('.share-qrcode').empty().qrcode({
            render: 'table',
            text: shareLink,
            width: 200,
            height: 200
        });

        $dialog.dialog({
            resizable: false,
            width: width,
            title: '通过链接分享'
        }); 

        $dialog.on('click', '.socials span', function() {
            var webid = $(this).data('webid');
            share({
                webid: webid,
                url: shareLink
            })
        })
    }
}

var SHAREBOX_TPL = '<div id="{id}" class="z-dialog share-dialog">' +
            '<span class="share-link">{shareLink}</span>' +
            '<p class="dialog-txt">通过二维码分享</p>' +
            '<span class="share-qrcode"></span>' +
            '<p class="dialog-txt">通过社交网络分享</p>' +
            '<div class="socials">' +
                '<span id="wechat" title="请用微信扫描上方二维码后分享"></span>' +
                '<span id="wechat-group" title="请用微信扫描上方二维码后分享"></span>' +
                '<span id="qq" data-webid="cqq"></span>' +
                '<span id="sina" data-webid="tsina" class="last"></span>' +
            '</div>' +
        '</div>';