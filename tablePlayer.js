
let arrPlayerStatus = [];
showAllPlayer();
hideButtonStatusUpdateCancel();

function showAllPlayer() {
    $.ajax({
        method: "get",
        url: "http://localhost:8080/api/player",
        success: function (data) {
            let arrPlayer = data.map((player) => {
                arrPlayerStatus.push({
                    id: player.id,
                    statusId: player.status.id
                });
                return `
                <tr>

                    <td>${player.code}</td>
                    <td><img src="${'http://localhost:8080/static/' + player.img}" alt=""></td>
                    <td>${player.name}</td>
                    <td>${player.dob}</td>
                    <td>${player.address}</td>
                    <td>${player.position}</td>
                    <td>
                        <select name="status-update-id" class="status-update" data-player-id="${player.id}">
                            <option value="1" ${player.status.id === 1 ? "selected" : ""}>Active</option>
                            <option value="2" ${player.status.id === 2 ? "selected" : ""}>Injure</option>
                            <option value="3" ${player.status.id === 3 ? "selected" : ""}>Retire</option>
                        </select>
                    </td>
                    <td>
                        <a href="#player_detail" onclick="showPlayerDetail(${player.id})">View</a>
                        <a href="javascript:void(0)" onclick="showFormDelete(${player.id})">Delete</a>
                        <a href="javascript:void(0)" onclick="showFormUpdate(${player.id})">Update</a>
                    </td>
                </tr>`;
            });
            $("#tb-player").html(arrPlayer.join(""));
            $(".modal").hide();
            $('th:nth-child(7), td:nth-child(7)').hide();
            registerStatusChangeEvents();
        },
        error: function(jqXHR, status, e){
            console.log(e);
        }
    });
}

function registerStatusChangeEvents() {
    $(".status-update").change(function() {
        let playerId = $(this).data("player-id");
        let newStatusId = $(this).val();
        let playerStatus = arrPlayerStatus.find(player => player.id === playerId);
        if (playerStatus) {
            playerStatus.statusId = newStatusId;
        } else {
            arrPlayerStatus.push({ id: playerId, statusId: newStatusId });
        }
    });
}

function hideButtonStatusUpdateCancel(){
    $("#btnStatusUpdate").hide();
    $("#btnStatusCancel").hide();
}

function showFormCreate(){
    $("#form-create").show();
    $("#tb-player").hide();
    $("#th-player").hide();
    $("#frm-search").hide();
    $("#frm-status").hide();
}

function createNewPlayer(){
    let formData = new FormData();
    formData.append("code", $("#code").val());
    formData.append("img", $("#img")[0].files[0]);
    formData.append("name", $("#name").val());
    formData.append("dob", $("#dob").val());
    formData.append("address", $("#address").val());
    formData.append("position", $("#position").val());
    formData.append("height", $("#height").val());
    formData.append("weight", $("#weight").val());
    formData.append("ranking", $("#ranking").val());
    formData.append("salary", $("#salary").val());
    formData.append("per.id", $("#Performence").val());
    formData.append("status.id", $("#status").val());

    $.ajax({
        data: formData,
        method: "post",
        processData: false,
        contentType: false,
        url: "http://localhost:8080/api/player/upload",
        success: function (data) {
            console.log("Player added successfully. Redirecting to tables.html", data);
            window.location.href = "tablesPlayer.html";
        },
        error: function(jqXHR, status, e){
            console.log(e);
        }
    });
}

function showFormUpdate(id){
    $.ajax({
        url: "http://localhost:8080/api/player/" + id,
        method: "get",
        success: function (data){
            $("#code-update").val(data.code);
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
            $("#player-info").hide();
            $(".modal").hide();
        }
    });
}

function updatePlayer(id){
    let formData = new FormData();
    formData.append("code", $("#code-update").val());
    formData.append("img", $("#img-update")[0].files[0]);
    formData.append("name", $("#name-update").val());
    formData.append("dob", $("#dob-update").val());
    formData.append("address", $("#address-update").val());
    formData.append("position", $("#position-update").val());
    formData.append("height", $("#height-update").val());
    formData.append("weight", $("#weight-update").val());
    formData.append("ranking", $("#ranking-update").val());
    formData.append("salary", $("#salary-update").val());
    formData.append("per.id", $("#performence-update-id").val());
    formData.append("status.id", $("#status-update-id").val());

    $.ajax({
        data: formData,
        url: "http://localhost:8080/api/player/" + id,
        method: "put",
        processData: false,
        contentType: false,
        success: function () {
            console.log("Player updated successfully. Redirecting to index.html");
            window.location.href = "tablesPlayer.html";
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
                <strong>Address:</strong> ${data.address} <br>
                <strong>Position:</strong> ${data.position} <br>
                <strong>Height:</strong> ${data.height} <br>
                <strong>Weight:</strong> ${data.weight} <br>
                <strong>Ranking:</strong> ${data.ranking} <br>
                <strong>Performence:</strong> ${data.per.id} <br>
                <strong>Status:</strong> ${data.status.id} <br>
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
    $.ajax({
        url: "http://localhost:8080/api/player/" + id,
        method: "delete",
        success: function () {
            console.log("Player deleted successfully. Redirecting to index.html");
            window.location.href = "tablesPlayer.html";
        },
        error: function(jqXHR, status, e) {
            console.log(e);
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
                <div class="profile-card">
                    <div class="image">
                        <img src="${'http://localhost:8080/static/' + data.img}" alt="" class="profile-img">
                    </div>
                    <div class="text-data">
                        <span class="name">${data.name}</span>
                        <span class="code">${data.code}</span>
                    </div>
                    <div class="info">
                        <div class="data">
                            <strong>Dob:</strong><span class="dob">${data.dob}</span><br>
                            <strong>Address:</strong><span class="address">${data.address}</span><br>
                            <strong>Position:</strong><span class="position">${data.position}</span><br>
                        </div>
                        <div class="data">
                            <strong>Height:</strong><span class="height">${data.height}</span><br>
                            <strong>Weight:</strong><span class="weight">${data.weight}</span><br>
                            <strong>Bmi:</strong><span class="bmi">${(data.weight * 10000 / (data.height * data.height)).toFixed(2)}</span><br>
                        </div>
                        <div class="data">
                            <strong>Ranking:</strong><span class="ranking">${data.ranking}</span><br>
                            <strong>Performence:</strong><span class="performence">${data.per.quality}</span><br>
                            <strong>Status:</strong><span class="status">${data.status.status}</span><br>
                        </div>
                    </div>
                </div>
                <div class="buttons">
                    <button class="button" onclick="showFormUpdate(${data.id})">Udate</button>
                    <button class="button" onclick="window.location.href = 'tablesPlayer.html'">Back</button>
                </div>
            `);

            $("#player_detail").show();
            $("#tb-player").hide();
        },
        error: function(jqXHR, status, e) {
            console.log(e);
        }
    });
}

function changeStatus(){
    $('th:nth-child(8), td:nth-child(8)').hide();
    $('th:nth-child(7), td:nth-child(7)').show();
    $("#btnStatusUpdate").show();
    $("#btnStatusCancel").show();
    $("#btnStatus").hide();
}

function updatePlayerStatus(){
    $.ajax({
        url: "http://localhost:8080/api/player/change-status",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(arrPlayerStatus),
        success: function () {
            showAllPlayer();
            window.location.href ="tablesPlayer.html"

        },
        error: function (jqXHR, status, e){
            console.log(e);
        }
    });
}
