var share = require('../share/share');

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

        if (!data || !data.selector || !data.shareLink) {
            return;
        }

        var selector = data.selector;
        var shareLink = data.shareLink;
        var width = data.width || 500;


        $(selector).find('.share-qrcode').empty().qrcode({
            text: shareLink,
            width: 200,
            height: 200
        });

        $(selector).dialog({
            resizable: false,
            width: width,
            title: '通过链接分享'
        });

        $(selector).on('click', '.socials span', function() {
            var webid = $(this).data('webid');
            share({
                webid: webid,
                url: shareLink
            })
        })
    }
}