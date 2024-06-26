function showAllCoach() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/coaches",
        success: function (data) {
            console.log(data);

            // Xử lý dữ liệu huấn luyện viên và hiển thị lên bảng
            let table = $('table');

            let strRow = "";
            data.forEach(function (coach) {
                let row = `
                    <tr>
                        <td>${coach.code}</td>
                        <td>${coach.name}</td>
                        <td>${coach.dob}</td>
                        <td>${coach.address}</td>
                        <td>${coach.salary}</td>
                        <td><img src="${'http://localhost:8080/static/' + coach.img}" alt=""></td>
                        <td>
                            <button class="btn btn-info " type="button"onclick="showOfCoach(${coach.id})">View</button>
                            <button class="btn btn-danger" type="button" onclick="updateCoach(${coach.id})">Update</button>
                             <button class="btn btn-secondary" type="button" onclick="showFormDelete(${coach.id})">Delete</button>
                        </td>
                    </tr>
                `;
                strRow += row;
            });
            $("#tb-coach").html(strRow);
            $("#mdDelete").hide()
        }
    });
}

function showCoachByName() {
    let name = document.getElementById("search-coach").value;
    console.log(name);

    $.ajax({
        url: "http://localhost:8080/api/coaches?name=" + name,
        method: "get",

        success: function(data){
            console.log(data);

            let table = $('table');

            let strRow = "";
            data.forEach(function (coach) {
                let row = `
                    <tr>
                        <td>${coach.code}</td>
                        <td>${coach.name}</td>
                        <td>${coach.dob}</td>
                        <td>${coach.address}</td>
                        <td>${coach.salary}</td>
                        <td><img src="${'http://localhost:8080/static/' + coach.img}" alt=""></td>
                        <td>
                            <button class="btn-view" type="button"onclick="showOfCoach(${coach.id})">View</button>
                            <button class="btn-update" type="button" onclick="updateCoach(${coach.id})">Update</button>
                             <button class="btn-delete" type="button" onclick="showFormDelete(${coach.id})">Delete</button>
                        </td>
                    </tr>
                `;
                strRow += row;
            });
            $("#tb-coach").html(strRow);
            $("#mdDelete").hide()
        }
    })
}

function addCoach() {
    $("#mdCreate").modal();
}

function submitCreateCoach() {
    $(".modal-dialog").show();

    let code = $("#code").val();
    let name = $("#fullName").val();
    let dob = $("#dob").val();
    let address = $("#address").val();
    let salary = $("#salary").val();
    let img = document.getElementById("img");
    let formData = new FormData();
    formData.append("code", code);
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("address", address);
    formData.append("salary", salary);
    formData.append("img", img.files[0]);

    $.ajax({
        data: formData,
        method: "POST",
        processData: false,
        contentType: false,
        url: "http://localhost:8080/api/coaches/upload",
        success: function (data) {
            console.log("Coach added successfully. Redirecting to tableCoach.html", data);
            window.location.href = "tableCoach.html";
        },
        error: function (jqXHR, status, e) {
            console.log(e);
        }
    });
}

// Hàm hiển thị modal để cập nhật Coach
function updateCoach(id) {
    $.ajax({
        method: "GET",
        url: `http://localhost:8080/api/coaches/${id}`,
        success: function (data) {
            $("#idUpdate").val(id);
            $("#idCoachUpdate").val(data.id);
            $("#codeUpdate").val(data.code);
            $("#fullNameUpdate").val(data.name);
            $("#dobUpdate").val(data.dob);
            $("#addressUpdate").val(data.address);
            $("#salaryUpdate").val(data.salary);
            $("#mdUpdate").modal();
        },
        error: function (jqXHR, status, e) {
            console.log("Error getting Coach details:", e);
        }
    });
}

// Hàm xử lý việc cập nhật Coach
function submitUpdateCoach() {
    let id = $("#idCoachUpdate").val();
    let code = $("#codeUpdate").val();
    let name = $("#fullNameUpdate").val();
    let dob = $("#dobUpdate").val();
    let address = $("#addressUpdate").val();
    let salary = $("#salaryUpdate").val();
    let img = document.getElementById("imgUpdate");
    let formData = new FormData();
    formData.append("code", code);
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("address", address);
    formData.append("salary", salary);
    formData.append("img", img.files[0]);

    $.ajax({
        data: formData,
        method: "PUT",
        processData: false,
        contentType: false,
        url: `http://localhost:8080/api/coaches/${id}`,
        success: function (data) {
            console.log("Coach updated successfully. Redirecting to tableCoach.html", data);
            window.location.href = "tableCoach.html";
        },
        error: function (jqXHR, status, e) {
            console.log("Error updating Coach:", e);
        }
    });
}

function showFormDelete(id) {
    // preventDefault();
    $.ajax({
        url: "http://localhost:8080/api/coaches/" + id,
        method: "GET",
        success: function (data) {
            $("#idDelete").val(id);
            $("#mdDelete").modal();

        },
        error: function (jqXHR, status, e) {
            console.log("Error getting Coach details:", e);
        }
    });

}


function submitDeleteCoach() {
    let id = $("#idDelete").val();
    $.ajax({
        method: "DELETE",
        url: `http://localhost:8080/api/coaches/${id}`,
        success: function (data) {
            console.log("Coach deleted successfully.");
            showAllCoach(); // Gọi lại hàm showAllCoach() để cập nhật lại bảng
            $("#mdDelete").modal("hide");
        },
        error: function (jqXHR, status, e) {
            console.log("Error deleting Coach:", e);
        }
    });
}

showAllCoach()

let mychart = null;
const ctx = document.getElementById('myChart');
function showOfCoach(id) {
    
    $.ajax({
        url: "http://localhost:8080/api/coaches/" + id,
        method: "GET",
        success: function (data) {
            let coachDetail = `
                <div data-id="${data.id}" id="coachtracking">
                    
                    <strong>Code:</strong> ${data.code} <br>
                    <strong>Image:</strong> <img src="${'http://localhost:8080/static/' + data.img}" alt="Coach Image"> <br>
                    <strong>Name:</strong> ${data.name} <br>
                    <strong>Dob:</strong> ${data.dob} <br>
                    <strong>Address:</strong> ${data.address} <br>
                    <strong>Salary:</strong> ${data.salary} <br>
                </div>
            `;

            $("#coachDetail").html(coachDetail);
            $("#coachDetailModal").modal('show');
            if(mychart !== null){
                mychart.destroy()
            }
            getCoachTracking()
        },
        error: function (jqXHR, status, e) {
            console.log("Error getting Coach details:", e);
        }
    });
}


function getCoachTracking() {

    let eCoachTracking = document.querySelector("#coachtracking")
    let idcoach = eCoachTracking.dataset.id
    let currentDate = new Date()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    $.ajax({
        method: "get",
        url: "http://localhost:8080/api/coach_tracking/" + idcoach + "/" + month + "/" + year,
        success: function (data) {
            let arrMonth = []
            let arrSalary = [];
            let name = "";
            for (let i = 0; i < data.length; i++) {
                arrMonth.push("tháng " + data[i].month)
                arrSalary.push(data[i].totalsalary)
                name = data[i].coach.name
            }
            mychart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: arrMonth,
                    datasets: [{
                        label: name,
                        data: arrSalary,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                }
            })
        }
    })


}

// function hideDeleteConfirmation(){
//     $("#delete-confirmation").hide();
// }
// function showCoachDetail(id){
//     $.ajax({
//         url: "http://localhost:8080/api/coaches/" + id,
//         method: "get",
//         success: function (data){
//
//             $("#player-info").html(`
//                 <strong>Code:</strong> ${data.code} <br>
//                 <strong>Image:</strong><img src="${'http://localhost:8080/static/' + data.img}" alt=""> <br>
//                 <strong>Name:</strong> ${data.name} <br>
//                 <strong>Dob:</strong> ${data.dob} <br>
//                 <strong>Address:</strong> ${data.address}<br>
//                 <strong>Salary:</strong> ${data.salary}<br>
//             `);
//
//             $("#coach_detail").show();
//
//             $("#tb-coach").hide();
//         },
//
//         error: function(jqXHR, status, e) {
//             console.log(e);
//         }
//     });
// }
