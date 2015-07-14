var noop = function() {};

module.exports = {
    postData: function(url, data, successCallback, errorCallback) {

        var csrfToken = $('input[name=csrfmiddlewaretoken]').val();
        return $.ajax({
            url: url,
            type: 'post',
            data: $.extend(data, {csrfmiddlewaretoken: csrfToken}), 
            success: successCallback || noop,
            error: errorCallback || noop
        })
    }
}