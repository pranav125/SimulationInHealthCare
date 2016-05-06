$(function () {
    $('#agegroupchart').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        credits: false,
        exporting: { enabled: false },
        title: {
            text: 'Age Groups'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Age Group Share',
            data: [
                [ages.ages[0].age_group, ages.ages[0].count],
                {
                    name: ages.ages[1].age_group,
                    y: ages.ages[1].count,
                    sliced: true,
                    selected: true
                },
                [ages.ages[2].age_group, ages.ages[2].count],
                [ages.ages[3].age_group, ages.ages[3].count],
                [ages.ages[4].age_group, ages.ages[4].count],
                [ages.ages[5].age_group, ages.ages[5].count],

            ]
        }]
    });
});