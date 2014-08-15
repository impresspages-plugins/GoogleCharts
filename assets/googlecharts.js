google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart() {

    $('.ipWidget-PieChart').each(function(key, $chartWidget) {
        var $chartWidget = $($chartWidget);
        var chartData = $chartWidget.find('.ipsGoogleChartsChart').data();

        if ( typeof chartData.chartdatatable!== "undefined" && chartData.chartdatatable) {

            var dataArr = [['', '']];

            chartData.chartdatatable.forEach(function(val) {

                var arr = $.map(val, function(el) { return el; });
                arr[1] = Number(arr[1]);
                dataArr.push( arr);

            });

            var data = google.visualization.arrayToDataTable(dataArr);

            var options = {
                title: chartData.title
            };

            var chartContainer = $chartWidget.find('.ipsGoogleChartsChart')
            var $chart = new google.visualization.PieChart(chartContainer[0]);
            $chart.draw(data, options);

            $chartWidget.trigger('chartDrawn');
        }
    });

}
