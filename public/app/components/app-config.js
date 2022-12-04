var appConfig = (function() {
    var pathname = window.location.pathname;
    var baseUrl = window.location.origin + pathname + 'api';

    return {
        comms: {
            apiReference: baseUrl+'/reference',
            apiSearch: ''
        }
    };
})();