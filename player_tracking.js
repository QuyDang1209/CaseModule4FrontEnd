showAllPlayerTracking();

function showAllPlayerTracking() {
    $.ajax({
        url: "http://localhost:8080/api/playertracking",
        method: "get",

        success: function (data) {
            console.log(data);
            let arrPlayerTracking = data.map((p, i, arrp) => {
                return`
                    <tr>
                        <td>${p.player.name}</td>
                        <td>${p.totalSalary}</td>
                        <td>${p.month}</td>
                        <td>${p.year}</td>
                    </tr>
                `;
            });

            console.log(arrPlayerTracking.join(""));
            $("#player-tracking-list").html(arrPlayerTracking.join(""));
            $("#player-tracking-list").show();
            $("#table").show();
            $("#form-tracking").hide();
            $("#btn-add").show();
            
        },

        error: function(jqXHR, status, e){
            console.log(e);
        }
    });
}
function showFormTracking(){
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
                    <td data-id="${c.per.id}" id="performence">${c.per.quality}</td>
                    <td><input type="number" id="bonus"></td>
                </tr>
                `;
            })
            $("#hpw").html(str.join(""))
            $("#form-tracking").show();
            $(".table").hide();
            $(".btn-primary").hide();
        }
    })
}
function payRoll() {
    let year = +document.getElementById("year").value;
    let month = +document.getElementById("month").value;
    let table = document.getElementById("hpw");
    let rows = table.getElementsByTagName("tr");
    let tableData = [];
    let per = document.querySelector("#performence")
    let perform = per.dataset.id
    
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
            bonus: cell[6].querySelector("input").value,
            performence: perform
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
        success: function(data) {
            showAllPlayerTracking()
        }
    })
}

function showAllSalaryInMonth(){
    let year = +document.getElementById("year-option").value;
    let month = +document.getElementById("month-option").value;
    console.log(year);
    console.log(month);
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
                    <td>${c.month}</td>
                    <td>${c.year}</td>
                </tr>
                `
            })
            $("#salary").html(str.join(""))
            $("#player-tracking-list").hide();
        }
    })
}