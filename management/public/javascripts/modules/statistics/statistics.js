angular.module("AsifHayir").controller("statistics", function ($scope) {

    var ctx = document.getElementById('v').getContext('2d');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: data = {
            datasets: [{
                data: [10, 20, 30],
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)']
            }],
            labels: [
                'צופן',
                'ניב',
                'עמית'
                ]
        },
        options: {
            title: {
                display: true,
                text: 'כמות תרומות לפי תורם'
            },
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontSize: 24,
                    bodyFontSize: 22,
                    titleFontSize: 22,
                    fontColor: 'white'
                }
            }
        }
    });

    ctx = document.getElementById('d').getContext('2d');
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data = {
            datasets: [{
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                label: "כמות תרומות לאיסוף",
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)']
            }],
            labels: [
                "ינואר",
                "פברואר",
                "מרץ",
                "אפריל",
                "מאי",
                "יוני",
                "יולי",
                "אוגוסט",
                "ספטמבר",
                "אוקטובר",
                "נובמבמר",
                "דצמבר"
                ]
        },
        options: {title: {
                display: true,
                text: 'כמות תרומות לפי חודש'
            },
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontSize: 24,
                    bodyFontSize: 22,
                    titleFontSize: 22,
                    fontColor: 'white'
                }
            }
        }
    });

    ctx = document.getElementById('f').getContext('2d');
    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['ירקות', 'פירות', 'מבושל', 'גבינות', 'מזון יבש', 'בשר'],
            datasets: [{
                    label: "תרומה 1 שלמה נתניה",
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    data: [13, 10, 4, 2, 1, 12]
            },
                {
                    label: "תרומה 2 שלמה נתניה",
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    data: [5, 2, 0, 13, 4, 12]
            },
                {
                    label: "תרומה 1 משה חיפה",
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    data: [12, 12, 2, 0, 12, 5]
            }]
        },
        options: {title: {
                display: true,
                text: 'הרכב התרומה לפי סוג מזון'
            },
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontSize: 24,
                    bodyFontSize: 22,
                    titleFontSize: 22,
                    fontColor: 'white'
                }
            }
        }
    });

});
