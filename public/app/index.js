// Load config and render page
$(document).ready(function () {
    console.log('>>>>Load config', appConfig);
    // Handle load config error
    var handleLoadConfigError = function (error) {
        console.log('>>>>Load config error', error);
        var dialog = $('#dialog');
        dialog.kendoDialog({
            width: '450px',
            title: 'Error',
            closable: true,
            modal: true,
            content: 'Failed to connect to server'
        });
        dialog.data('kendoDialog').open();
    };
    // Handle load config success
    var handleLoadConfig = function (data) {
        console.log('>>>>Load config success', data);
        // Enhance data of appConfig
        appConfig.comms.apiSearch = data.commsSearchUrl;
        appConfig.comms.defaultMaxRows = data.commsDefaultMaxRows;
        //Initialise search filters and buttons
        var dsCities = [
            { name: '--Please Select--', value: '' },
            { name: 'Sydney', value: 'SYD' },
            { name: 'Melbourne', value: 'MEL' },
            { name: 'Brisbane', value: 'BNE' }
        ];
        $('#filter-origin').kendoDropDownList({
            dataSource: dsCities,
            dataTextField: 'name',
            dataValueField: 'value',
            label: 'Departure Port'
        });
        $('#filter-dest').kendoDropDownList({
            dataSource: dsCities,
            dataTextField: 'name',
            dataValueField: 'value',
            label: 'Arrival Port'
        });
        $('#filter-flight').kendoTextBox({
            placeholder: 'Flight Number',
            label: 'Flight Number'
        });
        $('#filter-date').kendoDatePicker({
            label: 'Travel Date'
        });
        $('#filter-max').kendoTextBox({
            placeholder: 'Max Rows',
            value: appConfig.comms.defaultMaxRows,
            label: 'Max Rows'
        });
        //Initialise search buttons
        $('#btn-reset').kendoButton();
        $('#btn-search').kendoButton();
        //Register click handler for button Reset
        var handleBtnReset = function () {
            //Reset origin
            var fOrigin = $('#filter-origin').data('kendoDropDownList');
            fOrigin.value('');
            fOrigin.trigger('change');
            //Reset destination
            var fDest = $('#filter-dest').data('kendoDropDownList');
            fDest.value('');
            fDest.trigger('change');
            //Reset flight number
            var fFlight = $('#filter-flight').data('kendoTextBox');
            fFlight.value('');
            fFlight.trigger('change');
            //Reset date picker
            var fDate = $('#filter-date').data('kendoDatePicker');
            fDate.value(null);
            //Reset max rows
            var fMax = $('#filter-max').data('kendoTextBox');
            fMax.value(data.commsDefaultMaxRows);
            fMax.trigger('change');
            //Reset data table
            dataGrid.render([]);
        };
        $('#btn-reset').click(handleBtnReset);
        //Register click handler for button Search
        var handleBtnSearch = function () {
            var filter = {};
            //Get value of origin
            filter.origin = $('#filter-origin').data('kendoDropDownList').value();
            //Get value of destination
            filter.dest = $('#filter-dest').data('kendoDropDownList').value();
            //Get value of flight number
            filter.flightNumber = $('#filter-flight').data('kendoTextBox').value();
            //Get value of max rows
            filter.maxRows = $('#filter-max').data('kendoTextBox').value();
            //Function to append 0 if input value is less than 10
            var formatNum = function (input) {
                if (input < 10) {
                    return '0' + input;
                } else {
                    return String(input);
                }
            };
            //Get value of date picker
            var valDate = $('#filter-date').data('kendoDatePicker').value();
            if (valDate) {
                filter.flightDate = formatNum(valDate.getDate()) + formatNum(valDate.getMonth() + 1) + valDate.getFullYear();
            } else {
                filter.flightDate = '';
            }
            console.log('>>>>Search Comms History', filter);
            // Handle search error
            var handleSearchError = function (error) {
                console.log('>>>>Search error', error);
                var dialog = $('#dialog');
                dialog.kendoDialog({
                    width: '450px',
                    title: 'Error',
                    closable: true,
                    modal: true,
                    content: 'Failed to connect to Search API, using dummy data.'
                });
                dialog.data('kendoDialog').open();
                //Dummy data for test
                data = [
                    {
                        'transactionId': 2,
                        'createdAt': '2019-10-25T11:11:00.000Z',
                        'SenderID': '123456',

                        'flight': {
                            'origin': 'SYD',
                            'destination': 'MEL',
                            'carrier': 'QF',
                            'flightNumber': '111',
                            'flightDate': '2019-11-20'
                        },
                        'paxCount': 100,
                        'nonContactablePaxCount': 100
                    }
                ];
                handleSearch(data);
            };
            // Handle search success
            var handleSearch = function (data) {
                console.log('>>>>Process search result', data);
                var ds = [];
                for (var i = 0; data && i < data.length; i++) {
                    ds.push(data[i].flight);
                }
                dataGrid.render(ds);

            };
            // Input of ajax to load config
            var formatUrl = function(url, filter) {
                if(filter) {
                    var apdx = '';
                    if(filter.origin) apdx = apdx + 'origin=' + filter.origin;
                    if(filter.dest) apdx = apdx + (apdx ? '&' : '') + 'Dest=' + filter.dest;
                    if(filter.flightNumber) apdx = apdx + (apdx ? '&' : '') + 'flightNumber=' + filter.flightNumber;
                    if(filter.flightDate) apdx = apdx + (apdx ? '&' : '') + 'flightDate=' + filter.flightDate;
                    if(filter.maxRows) apdx = apdx + (apdx ? '&' : '') + 'limit=' + filter.maxRows;
                }
                return apdx ? (url + '?' + apdx) : url
            };
            var urlSearch = formatUrl(appConfig.comms.apiSearch, filter);
            var paramSearch = {
                url: urlSearch,
                type: 'GET',
                success: handleSearch,
                error: handleSearchError
            };
            // Trigger Ajax call to comms history search api
            $.ajax(paramSearch);
        };
        $('#btn-search').click(handleBtnSearch);
    };
    //Initialise result table
    var paramDataGrid = {
        parent: '#search-result',
        fields: [
            { field: 'origin', title: 'Departure Port' }, 
            { field: 'destination', title: 'Arrival Port' }, 
            { field: 'carrier', title: 'Carrier' }, 
            { field: 'flightNumber', title: 'Flight Number' }, 
            { field: 'flightDate', title: 'Flight Date' }
        ]
    };
    var dataGrid = new DataGrid(paramDataGrid);
    dataGrid.render([]);
    // input of ajax to load config
    var paramLoadConfig = {
        url: appConfig.comms.apiReference,
        type: 'GET',
        success: handleLoadConfig,
        error: handleLoadConfigError
    };
    // Call ajax service to load app configs
    $.ajax(paramLoadConfig);

});