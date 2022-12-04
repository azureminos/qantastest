function DataGrid(params) {
    this.parent = params.parent;
    this.fields = params.fields || [];
}

DataGrid.prototype.render = function(ds) {
    var divDataGrid = '<table class="result-table"><tr class="result-row">';
    for(var i=0; i<this.fields.length; i++) {
        divDataGrid = divDataGrid + '<th class="result-head">' + this.fields[i].title + '</th>';
    }
    divDataGrid = divDataGrid + '</tr>'
    for(var m=0; m<ds.length; m++) {
        divDataGrid = divDataGrid + '<tr class="result-row">';
        for(var n=0; n<this.fields.length; n++) {
            divDataGrid = divDataGrid + '<td class="result-data">' + ds[m][this.fields[n].field] + '</td>';
        }
        divDataGrid = divDataGrid + '</tr>';
    }
    var divDataGrid = divDataGrid + '</table>';
    $(this.parent).html('');
    $(this.parent).append(divDataGrid);
}