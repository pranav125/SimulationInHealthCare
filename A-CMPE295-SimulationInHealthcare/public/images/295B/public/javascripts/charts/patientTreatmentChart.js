$(function () {
    $('#patienttreatment').highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        exporting: { enabled: false },
        credits: false,
        title: {
            text: 'Patient Treatment Chart'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Years'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Dosage'
            }
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 6,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: true
                        }
                    }
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '{point.x} , {point.y} '
                }
            }
        },
        series: [{
            showInLegend: false,
            color: 'rgba(255, 0, 0, .8)',
            data: [[2012, 65.6], [2012, 71.8], [2012, 80.7], [2012, 72.6], [2013, 78.8],
                [2013, 74.8], [2013, 86.4], [2013, 78.4], [2014, 62.0], [2014, 81.6],
                [2014, 76.6], [2015, 83.6], [2015, 90.0], [2015, 74.6], [2015, 71.0]]
        }]
    });
});

