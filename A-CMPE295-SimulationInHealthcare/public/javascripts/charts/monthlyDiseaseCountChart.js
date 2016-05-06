$(function () {
    $('#monthlydiseasechart').highcharts({
        chart: {
            type: 'line'
        },
        credits: false,
        exporting: { enabled: false },
        title: {
            text: 'Monthly National Patients'
        },
        xAxis: {
            categories: [monthlyDiseases.monthlyDiseaseCount[0].month,
                monthlyDiseases.monthlyDiseaseCount[1].month,
                monthlyDiseases.monthlyDiseaseCount[2].month,
                monthlyDiseases.monthlyDiseaseCount[3].month,
                monthlyDiseases.monthlyDiseaseCount[4].month,
                monthlyDiseases.monthlyDiseaseCount[5].month,
                monthlyDiseases.monthlyDiseaseCount[6].month,
                monthlyDiseases.monthlyDiseaseCount[7].month,
                monthlyDiseases.monthlyDiseaseCount[8].month,
                monthlyDiseases.monthlyDiseaseCount[9].month,
                monthlyDiseases.monthlyDiseaseCount[10].month,
                monthlyDiseases.monthlyDiseaseCount[11].month]
        },
        yAxis: {
            title: {
                text: 'Number of Patients'
            },
            min: 0,
            max: 10000
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Patients',
            data: [monthlyDiseases.monthlyDiseaseCount[0].count,
                monthlyDiseases.monthlyDiseaseCount[1].count,
                monthlyDiseases.monthlyDiseaseCount[2].count,
                monthlyDiseases.monthlyDiseaseCount[3].count,
                monthlyDiseases.monthlyDiseaseCount[4].count,
                monthlyDiseases.monthlyDiseaseCount[5].count,
                monthlyDiseases.monthlyDiseaseCount[6].count,
                monthlyDiseases.monthlyDiseaseCount[7].count,
                monthlyDiseases.monthlyDiseaseCount[8].count,
                monthlyDiseases.monthlyDiseaseCount[9].count,
                monthlyDiseases.monthlyDiseaseCount[10].count,
                monthlyDiseases.monthlyDiseaseCount[11].count]
        }]
    });
});