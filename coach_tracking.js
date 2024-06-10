showAllCoachTracking();
function showAllCoachTracking() {
    $.ajax({
        url: "http://localhost:8080/api/coach_tracking",
        method: "get",

        success: function (data){
            console.log(data)
            let arrCoachTracking = data.map((c,i,arrc) => {
                return `
                <tr>
                    <td>${c.coach.name}</td>
                    <td>${c.totalsalary}</td>
                    <td>${c.month}</td>
                    <td>${c.year}</td>
                </tr>
                `
            });

            console.log(arrCoachTracking.join(""));
            $("#coach-tracking-list").html(arrCoachTracking.join(""));
            $("#coach-tracking-list").show();
            $("#table").show();
            $("#frm-tracking").hide();
            
    },

    error: function(jqXHR, status, e){
        console.log(e);
    }
});
}

function showFormTracking(){
    $.ajax({
        method: "get",
        url: "http://localhost:8080/api/coaches",
        success: function (data){
            let str = data.map((c,i,arr) =>{
                return `
                <tr data-id="${c.id}">
                    <td>${c.name}</td>
                    <td><input type="number" id="weak1"></td>
                    <td><input type="number" id="weak2"></td>
                    <td><input type="number" id="weak3"></td>
                    <td><input type="number" id="weak4"></td>
                </tr>
                `;
            })
            $("#bpw").html(str.join(""))
            $("#frm-tracking").show();
            $(".table").hide();
        }
    })
}
function payRoll() {
    let year = +document.getElementById("year").value;
    let month = +document.getElementById("month").value;
    let table = document.getElementById("bpw");
    let rows = table.getElementsByTagName("tr");
    let tableData = [];
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let coachID = row.getAttribute("data-id")
        let cell = row.getElementsByTagName("td")
        let rowData = {
            coach: coachID,
            bonusweak1:  cell[1].querySelector("input").value,
            bonusweak2: cell[2].querySelector("input").value,
            bonusweak3: cell[3].querySelector("input").value,
            bonusweak4: cell[4].querySelector("input").value,
            month: month,
            year: year,
        }
        tableData.push(rowData);
    }
    console.log(tableData)
    $.ajax({
        method: "post",
        url: "http://localhost:8080/api/coach_tracking",
        contentType: "application/json",
        data: JSON.stringify(
            tableData),
        success: function(data) {
            showAllCoachTracking()
        }
    })

}
