showAllPlayer()
function showAllPlayer() {
    $.ajax({
        // Bổ sung headers cho AJAX request để thực hiện phân quyền
        // headers: {
        //     "Authorization": "Bearer " + token
        // },
        url: "http://localhost:8080/api/player",
        
        success: function (data) {
            console.log(data);
            let arrPlayer = data.map((player, i, arrp) => {
                return `
                <tr>
                <td>${player.code}</td>
                <td><img src="${'http://localhost:8080/static/' + player.img}" alt=""></td>
                <td>${player.name}</td>
                <td>${player.dob}</td>
                <td>${player.address}</td>
                <td>${player.position}</td>
                <td>

                <a href="javascript:void(0)" onclick="showPlayerDetail(${player.id})">View</a>
                <a href="javascript:void(0)" onclick="showFormDelete(${player.id})">Delete</a>
                <a href="javascript:void(0)" onclick="showFormUpdate(${player.id})">Update</a>
                </td>
             </tr>
                `;
            });
            $("#tb-player").html(arrPlayer.join(""));
        },

        error: function(jqXHR, status, e){
            console.log(e);
            
        }
    });
}

function showFormCreate(){
    $("#form-create").show();
    $("#tb-player").hide();
}

function createNewPlayer(){
    let code = document.getElementById("code").value;
    let img = document.getElementById("img");
    let name = document.getElementById("name").value;
    let dob = document.getElementById("dob").value;
    let address = document.getElementById("address").value;
    let position = document.getElementById("position").value;
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let ranking = document.getElementById("ranking").value;
    let salary = document.getElementById("salary").value;
    let Performence = document.getElementById("Performence").value;
    let status = document.getElementById("status").value;

    let formData = new FormData();
    formData.append("code", code);
    formData.append("img", img.files[0]);
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("address", address);
    formData.append("position", position);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("ranking", ranking);
    formData.append("salary", salary);
    formData.append("per.id", Performence);
    formData.append("status.id", status);

    $.ajax({
        data: formData,
        method: "post",
        processData: false,
        contentType: false,
        url: "http://localhost:8080/api/player/upload",
        success: function (data) {
            console.log("Player added successfully. Redirecting to tables.html", data);
            window.location.href = "tables.html";
        },
        error: function(jqXHR, status, e){
            console.log(e);
            
        }
    })
}

function showFormUpdate(id){
    $.ajax({
        url: "http://localhost:8080/api/player/" + id,
        method: "get",
        
        success: function (data){
            $("#code-update").val(data.code);
            // $("#img-update").val(data.img);
            $("#name-update").val(data.name);
            $("#dob-update").val(data.dob);
            $("#address-update").val(data.address);
            $("#position-update").val(data.position);
            $("#height-update").val(data.height);
            $("#weight-update").val(data.weight);
            $("#ranking-update").val(data.ranking);
            $("#salary-update").val(data.salary);
            $("#performence-update-id").val(data.per.id);
            $("#status-update-id").val(data.status.id);
            $("#save-update-button").on("click", function() {
                updatePlayer(id);
        });

            $("#form-update").show();
            $("#tb-player").hide();

        }
    });
}

function updatePlayer(id){
    let code = document.getElementById("code-update").value;
    let img = document.getElementById("img-update");
    let name = document.getElementById("name-update").value;
    let dob = document.getElementById("dob-update").value;
    let address = document.getElementById("address-update").value;
    let position = document.getElementById("position-update").value;
    let height = document.getElementById("height-update").value;
    let weight = document.getElementById("weight-update").value;
    let ranking = document.getElementById("ranking-update").value;
    let salary = document.getElementById("salary-update").value;
    let performence = document.getElementById("performence-update-id").value;
    let status = document.getElementById("status-update-id").value;

    let formData = new FormData();
    formData.append("code", code);
    formData.append("img", img.files[0]);
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("address", address);
    formData.append("position", position);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("ranking", ranking);
    formData.append("salary", salary);
    formData.append("per.id", performence);
    formData.append("status.id", status);
    
    $.ajax({
        data: formData,
        url: "http://localhost:8080/api/player/" + id,
        method: "put",
        processData: false,
        contentType: false,

        success: function () {
            console.log("Player updated successfully. Redirecting to index.html");
            window.location.href = "tables.html";
        },
        error: function(jqXHR, status, e){
            console.log(e);
            
        }
    });
}

function hideFormUpdate() {
    $("#form-update").hide();
}

function showFormDelete(id){
    $.ajax({
        url: "http://localhost:8080/api/player/" + id,
        method: "get",
        success: function (data){
            
            $("#delete-player-info").html(`
                <strong>Code:</strong> ${data.code} <br>
                <strong>Image:</strong><img src="${'http://localhost:8080/static/' + data.img}" alt=""> <br>
                <strong>Name:</strong> ${data.name} <br>
                <strong>Dob:</strong> ${data.dob} <br>
                <strong>Address:</strong> ${data.address}<br>
                <strong>Position:</strong> ${data.position}<br>
                <strong>Height:</strong> ${data.height}<br>
                <strong>Weight:</strong> ${data.weight}<br>
                <strong>Ranking:</strong> ${data.ranking}<br>
                <strong>Performence:</strong> ${data.per.id}<br>
                <strong>Status:</strong> ${data.status.id}<br>
            `);

            $("#delete-confirmation").show();

            $("#confirm-delete-button").on("click", function() {
                confirmDelete(id);
            });

            $("#tb-player").hide();
        },
        
        error: function(jqXHR, status, e) {
            console.log(e);
        }
    });
}

function confirmDelete(id){
    console.log("Preparing to delete player with id:", id);

    $.ajax({
        url: "http://localhost:8080/api/player/" + id,
        method: "delete",
        
        success: function () {
            console.log("Player deleted successfully. Redirecting to index.html");
            window.location.href = "tables.html";
        },
        error: function(jqXHR, status, e) {
            console.log("Error deleting player:", e);
        }
    });
}

function hideDeleteConfirmation(){
    $("#delete-confirmation").hide();
}

function showPlayerDetail(id){
    $.ajax({
        url: "http://localhost:8080/api/player/" + id,
        method: "get",
        success: function (data){
            
            $("#player-info").html(`
                <strong>Code:</strong> ${data.code} <br>
                <strong>Image:</strong><img src="${'http://localhost:8080/static/' + data.img}" alt=""> <br>
                <strong>Name:</strong> ${data.name} <br>
                <strong>Dob:</strong> ${data.dob} <br>
                <strong>Address:</strong> ${data.address}<br>
                <strong>Position:</strong> ${data.position}<br>
                <strong>Height:</strong> ${data.height}<br>
                <strong>Weight:</strong> ${data.weight}<br>
                <strong>Ranking:</strong> ${data.ranking}<br>
                <strong>Performence:</strong> ${data.per.id}<br>
                <strong>Status:</strong> ${data.status.id}<br>
            `);

            $("#player_detail").show();

            // $("#confirm-delete-button").on("click", function() {
            //     confirmDelete(id);
            // });

            $("#tb-player").hide();
        },
        
        error: function(jqXHR, status, e) {
            console.log(e);
        }
    });
}