showformTracking()
function showformTracking(){
    $.ajax({
        method: "get",
        url: "http://localhost:8080/api/player",
        success: function (data){
            let str = data.map((c,i,arr) => {
                return `
                <tr data-id="${c.id}">
                    <td>${c.name}</td>
                    <td><input type="number" id="weak1"></td>
                    <td><input type="number" id="weak2"></td>
                    <td><input type="number" id="weak3"></td>
                    <td><input type="number" id="weak4"></td>
                    <td><input type="number" id="bonus"></td>
                </tr>
                `;
            })
            $("#hpw").html(str.join(""))
        }
    })
}
function payRoll() {
    let year = +document.getElementById("year").value;
    let month = +document.getElementById("month").value;
    let table = document.getElementById("hpw");
    let rows = table.getElementsByTagName("tr");
    let tableData = [];
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let playerID = row.getAttribute("data-id")
        let cell = row.getElementsByTagName("td")
        let rowData = {
            player: playerID,
            weak1:  cell[1].querySelector("input").value,
            weak2: cell[2].querySelector("input").value,
            weak3: cell[3].querySelector("input").value,
            weak4: cell[4].querySelector("input").value,
            month: month,
            year: year,
            bonus: cell[5].querySelector("input").value,
            performence: 2
        }
        tableData.push(rowData);
    }
    console.log(tableData)
    $.ajax({
        method: "post",
        url: "http://localhost:8080/api/playertracking",
        contentType: "application/json",
        data: JSON.stringify(
            tableData),
    })

}
function showAllSalaryinMonth(){
    let year = +document.getElementById("year").value;
    let month = +document.getElementById("month").value;
    $.ajax({
        method: "get",
        url: "http://localhost:8080/api/playertracking/"+month+"/"+year,
        success: function (data){
            console.log(data)
            let str = data.map((c,i,array) => {
                return `
                <tr>
                    <td>${c.player.name}</td>
                    <td>${c.totalSalary}</td>
                </tr>
                `
            })
            $("#salary").html(str.join(""))
        }
    })
}