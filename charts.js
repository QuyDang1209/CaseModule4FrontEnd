const ctx = document.getElementById("mychart");
let mychartPlayer = null;
function formatNumber(number) {
    return number.toLocaleString('en-US');
}
function showchartPlayerin3month(){
    let currentDate = new Date()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    $.ajax({
        url: "http://localhost:8080/api/playertracking/"+ month+"/"+year,
        method: "GET",
        success: function (data){
            console.log(data)
            let arrNamePlayer = [];
            let totalPlayerSalary = []
            let total = 0;
            for (let i = 0; i < data.length; i++) {
                arrNamePlayer.push(data[i].player.name)
                totalPlayerSalary.push(data[i].totalSalary)
                total += data[i].totalSalary;
            }
            if(mychartPlayer != null){
                mychartPlayer.destroy()
            }
            mychartPlayer = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: arrNamePlayer,
                    datasets: [{
                        label: "Total Salaty in " + month+"th"+year+ " is " + formatNumber(total),
                        data: totalPlayerSalary,
                        fill: false,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(24,78,187)',
                            'rgb(229,8,45)',
                            'rgb(93,5,93)',
                            'rgb(21,33,56)',
                            'rgb(9,44,115)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(24,78,187)',
                            'rgb(229,8,45)',
                            'rgb(93,5,93)',
                            'rgb(21,33,56)',
                            'rgb(9,44,115)'
                        ],
                        borderWidth: 1
                    }]
                }
            })
        }
    })
}
function showchrtCoachin3Month(){
    let currentDate = new Date()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    $.ajax({
        url: "http://localhost:8080/api/coach_tracking/"+month+"/"+year,
        method: "GET",
        success: function (data){
            console.log(data)
            let arrCoach = [];
            let totalCoachSalary = []
            let total = 0;
            for (let i = 0; i < data.length; i++) {
                arrCoach.push(data[i].coach.name)
                totalCoachSalary.push(data[i].totalsalary)
                total += data[i].totalsalary
            }
            if(mychartPlayer != null){
                mychartPlayer.destroy()
            }
            mychartPlayer = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: arrCoach,
                    datasets: [{
                        label: "Total Salaty in " +month+"th"+year+ " is " +formatNumber(total),
                        data: totalCoachSalary,
                        fill: false,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(24,78,187)',
                            'rgb(229,8,45)',
                            'rgb(93,5,93)',
                            'rgb(21,33,56)',
                            'rgb(9,44,115)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(24,78,187)',
                            'rgb(229,8,45)',
                            'rgb(93,5,93)',
                            'rgb(21,33,56)',
                            'rgb(9,44,115)'
                        ],
                        borderWidth: 1
                    }]
                }
            })
        }
    })
}
