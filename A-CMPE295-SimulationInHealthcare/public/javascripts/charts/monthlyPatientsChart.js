$(function () {
    $('#monthlypatientschart').highcharts({
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 22,
                beta: 19,
                depth: 64,
                viewDistance: 45
            }
        },
        credits: false,
        exporting: { enabled: false },

        title: {
            text: 'Monthly Patients This Year'
        },

        xAxis: {
            categories: [
                monthlyPatients.monthlyCount[0].month,
                monthlyPatients.monthlyCount[1].month,
                monthlyPatients.monthlyCount[2].month,
                monthlyPatients.monthlyCount[3].month,
                monthlyPatients.monthlyCount[4].month,
                monthlyPatients.monthlyCount[5].month,
                monthlyPatients.monthlyCount[6].month,
                monthlyPatients.monthlyCount[7].month,
                monthlyPatients.monthlyCount[8].month,
                monthlyPatients.monthlyCount[9].month,
                monthlyPatients.monthlyCount[10].month,
                monthlyPatients.monthlyCount[11].month

            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            max: 20,
            title: {
                text: 'Number of Patients'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Patients',
            data: [monthlyPatients.monthlyCount[0].count,
                monthlyPatients.monthlyCount[1].count,
                monthlyPatients.monthlyCount[2].count,
                monthlyPatients.monthlyCount[3].count,
                monthlyPatients.monthlyCount[4].count,
                monthlyPatients.monthlyCount[5].count,
                monthlyPatients.monthlyCount[6].count,
                monthlyPatients.monthlyCount[7].count,
                monthlyPatients.monthlyCount[8].count,
                monthlyPatients.monthlyCount[9].count,
                monthlyPatients.monthlyCount[10].count,
                monthlyPatients.monthlyCount[11].count]

        }]
    });
});