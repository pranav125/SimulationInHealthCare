$(function () {
    function seriesdata() {
        var a = [];
        for (var i = 0; i < 300; i++) {
            a.push(Math.round((Math.random() * 81)) + 100)
        }
        return a;
    }

        $('#patientheartrate').highcharts({
            title: {
                text: "Patient's Last Visit Heart Rate",
                x: -20 //center
            },
            exporting: {enabled: false},
            credits: false,
            xAxis: {
                title: {
                    text: 'Time Interval (sec)'
                }
            },
            yAxis: {
                title: {
                    text: 'Heart Beat (BPS)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                headerFormat: '<span style="font-size: 12px">Time Interval: {point.key} seconds</span><br/>',
                valueSuffix: ' BPS'
            },
            series: [{
                showInLegend: false,
                name: 'Heart Beat',
                data: seriesdata()
            }]
        });
    });