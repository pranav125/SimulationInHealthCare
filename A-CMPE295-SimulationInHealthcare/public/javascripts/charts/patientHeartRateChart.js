$(function () {
    $(document).ready(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        $('#patientheartrate').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
//                        	var x = function randomDate() {
//                        		  var date = new Date(2012 +Math.random() * (2015 - 2012));
//                        		  //var hour = startHour + Math.random() * (endHour - startHour) | 0;
//                        		  //date.setHours(hour);
//                        		  return date;
//                        		};
                        	//var x = new Date(2012 +Math.random() * (2015 - 2012)),
                            y = Math.round((Math.random() * 61)) + 100;
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: "Patient's Last Visit Blood Pressure (ECG machine readings)"
            },
            credits: false,
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Blood Pressure (BPS)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        //Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 0);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Blood Pressure',
                data: (function () {
                	// generate an array of random data
//                    var startDate = new Date(2012,0,1).getTime();
//                    var endDate =  new Date(2015,0,1).getTime();
//   				    var spaces = (endDate - startDate);
//   					var timestamp = Math.round(Math.random() * spaces);
//   					timestamp += startDate;
                	var data = [],
                        time = (new Date()).getTime(),
                        //prev = new Date().getTime(),
                        
                        //time = getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.round((Math.random() * 61)) + 100
                        });
                    }
                    return data;
                }())
            }]
        });
    });
});