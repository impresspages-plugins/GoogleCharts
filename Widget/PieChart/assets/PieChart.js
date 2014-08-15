/* Place the code below into MySamplePlugin/Widget/HelloWorld/assets/MyWidget.js file */
IpWidget_PieChart = function () {
    "use strict";
    this.widgetObject = null;
    this.$widgetOverlay = null;

    this.init = function (widgetObject, data) {
        this.widgetObject = widgetObject;
        this.data = data;
        var context = this; // set this so $.proxy would work below

        this.$widgetOverlay = $('<div></div>');
        this.widgetObject.prepend(this.$widgetOverlay);
        this.$widgetOverlay.on('click', $.proxy(openPopup, this));

        $(document).on('ipWidgetResized', function () {
            $.proxy(fixOverlay, context)();
        });
        $(window).on('resize', function () {
            $.proxy(fixOverlay, context)();
        });
        this.widgetObject.on('chartDrawn', $.proxy(fixOverlay, context));


        $.proxy(fixOverlay, context)();

        drawChart();
    };

    this.onAdd = function () {
        $.proxy(openPopup, this)();
    }


    var fixOverlay = function () {
        this.$widgetOverlay
            .css('position', 'absolute')
            .css('z-index', 1000) // should be higher enough but lower than widget controls
            .width(this.widgetObject.width())
            .height(this.widgetObject.height());
    };

    var fillTable = function (data) {
        this.popup = $('.ipsGoogleChartsPopup');

        //this.popup.find("._dataTable").handsontable('destroy');
        this.popup.find("._dataTable").remove();
        this.popup.find('.modal-body').append('<div class="_dataTable"></div>');

        if (typeof data.chartData == 'undefined') {
            var chartFillData = [
//                ["Dogs", 26000],
//                ["Cats", 25000],
//                ["Other", 100000]
            ];

        } else {
            var rowsCount = data.chartData.length;
            var chartFillData = ['', 0];

            for (var i = 0; i < rowsCount; i++) {
                var itemObj = data.chartData[i];

                if (itemObj.legend!=''){
                    var item = [itemObj.legend, Number(itemObj.value)];
                    chartFillData[i] = item;
                }

            }
        }


        this.popup.find("._dataTable").handsontable({
            data: chartFillData,
            colHeaders: ["Label", "Value"],
            minSpareRows: 1,
            removeRowPlugin: true,
            startRows: rowsCount,
            startCols: 2,
            columns: [
                {type: 'text'},
                {type: 'numeric'}
            ]
        });

        this.popup.find("._dataTable").handsontable('render');


    }


    var openPopup = function () {
        var context = this;
        this.popup = $('.ipsGoogleChartsPopup');
        this.confirmButton = this.popup.find('.ipsConfirm');

        this.popup.find('input[name=title]').val(context.data.title)

        $.proxy(fillTable, this)(context.data);

        this.popup.modal(); // open modal popup

        this.popup.find('.ipsConfirm').off().on('click', $.proxy(save, this));

    };


    var save = function (e) {
        e.preventDefault();

        var ht = this.popup.find('._dataTable').data().handsontable;
        var rows = ht.countRows(); //Exclude spare row

        var chartData = [];

        for (var i = 0; i < rows; i++) {

            var item = Object();
            item.legend = ht.getDataAtCell(i, 0);
            item.value = ht.getDataAtCell(i, 1);

            chartData.push(item);

        }

        var title = this.popup.find('input[name=title]').val();

        var data = {
            chartData: chartData,
            title: title
        };

        this.popup.modal('hide');

        this.widgetObject.save(data, 1); // save and reload widget

    };


};

