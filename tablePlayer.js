
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
                <td>${player.name}</td>
                <td>${player.dob}</td>
                <td>${player.address}</td>
                <td>${player.position}</td>
                <td><img src="${'http://localhost:8080/static/' + player.img}" alt="" class="player-img"></td>
                <td>
                    <select name="status-update-id" class="status-update" data-player-id="${player.id}">
                        <option value="1" ${player.status.id === 1 ? "selected" : ""}>Active</option>
                        <option value="2" ${player.status.id === 2 ? "selected" : ""}>Injure</option>
                        <option value="3" ${player.status.id === 3 ? "selected" : ""}>Retire</option>
                    </select>
                </td>
                <td>             
                    <button type="button" class="btn btn-info"><a href="#player_detail"  onclick="showPlayerDetail(${player.id})" style="color: white;">View</a></button>
                    <button type="button" class="btn btn-danger"><a href="javascript:void(0)" onclick="showFormDelete(${player.id})" style="color: white;">Delete</a></button>
                    <button type="button" class="btn btn-secondary"><a href="javascript:void(0)" onclick="showFormUpdate(${player.id})" style="color: white;">Update</a></button>
                </td>
             </tr>
                `;

            });
            $("#tb-player").html(arrPlayer.join(""));
            $(".modal").hide();
            $('th:nth-child(7), td:nth-child(7)').hide();
            $("#head-action").show();
            registerStatusChangeEvents();
        },
        error: function(jqXHR, status, e){
            console.log(e);
        }
    });
}

function showPlayerByName() {
    let name = document.getElementById("search-player").value;
    console.log(name);

    $.ajax({
        url: "http://localhost:8080/api/player?name=" + name,
        method: "get",

        success: function(data){
            console.log(data);

            let arrPlayer = data.map((player, i, arrp) => {
                return `
                <tr>
                <td>${player.code}</td>
                <td>${player.name}</td>
                <td>${player.dob}</td>
                <td>${player.address}</td>
                <td>${player.position}</td>
                <td><img src="${'http://localhost:8080/static/' + player.img}" alt="" class="player-img"></td>
                <td>
                
                <button type="button" class="btn btn-info"><a href="#player_detail"  onclick="showPlayerDetail(${player.id})" style="color: white;">View</a></button>
                <button type="button" class="btn btn-danger"><a href="javascript:void(0)" onclick="showFormDelete(${player.id})" style="color: white;">Delete</a></button>
                <button type="button" class="btn btn-secondary"><a href="javascript:void(0)" onclick="showFormUpdate(${player.id})" style="color: white;">Update</a></button>
                </td>
             </tr>
                `;
            });
            $("#tb-player").html(arrPlayer.join(""));
            $(".modal").hide();
        },
    })
}

function showPlayerByStatus() {
    let id = document.getElementById("status-option").value;
    console.log(id);

    $.ajax({
        url: "http://localhost:8080/api/player/status/" + id,
        method: "get",

        success: function(data){
            console.log(data);

            let arrPlayer = data.map((player, i, arrp) => {
                return `
                <tr>
                <td>${player.code}</td>
                <td>${player.name}</td>
                <td>${player.dob}</td>
                <td>${player.address}</td>
                <td>${player.position}</td>
                <td><img src="${'http://localhost:8080/static/' + player.img}" alt="" class="player-img"></td>
                <td>
                
                <button type="button" class="btn btn-info"><a href="#player_detail"  onclick="showPlayerDetail(${player.id})" style="color: white;">View</a></button>
                <button type="button" class="btn btn-danger"><a href="javascript:void(0)" onclick="showFormDelete(${player.id})" style="color: white;">Delete</a></button>
                <button type="button" class="btn btn-secondary"><a href="javascript:void(0)" onclick="showFormUpdate(${player.id})" style="color: white;">Update</a></button>
                </td>
             </tr>
                `;
            });
            $("#tb-player").html(arrPlayer.join(""));
            $(".modal").hide();
        },
    })
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
    $(".btn").hide();
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
            $("#th-player").hide();
            $("#frm-search").hide();
            $("#frm-status").hide();
            $(".btn").hide();
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
            <div class="player-info">
            <div class="info-item">
                <strong>Code:</strong> <span>${data.code}</span>
            </div>
            <div class="info-item">
                <strong>Image:</strong> <img src="${'http://localhost:8080/static/' + data.img}" alt="Player Image">
            </div>
            <div class="info-item">
                <strong>Name:</strong> <span>${data.name}</span>
            </div>
            <div class="info-item">
                <strong>Dob:</strong> <span>${data.dob}</span>
            </div>
            <div class="info-item">
                <strong>Address:</strong> <span>${data.address}</span>
            </div>
            <div class="info-item">
                <strong>Position:</strong> <span>${data.position}</span>
            </div>
            <div class="info-item">
                <strong>Height:</strong> <span>${data.height}</span>
            </div>
            <div class="info-item">
                <strong>Weight:</strong> <span>${data.weight}</span>
            </div>
            <div class="info-item">
                <strong>Ranking:</strong> <span>${data.ranking}</span>
            </div>
            <div class="info-item">
                <strong>Performance:</strong> <span>${data.per.id}</span>
            </div>
            <div class="info-item">
                <strong>Status:</strong> <span>${data.status.id}</span>
            </div>
        </div>
            `);

            $("#delete-confirmation").show();
            $("#confirm-delete-button").on("click", function() {
                confirmDelete(id);
            });
            $("#tb-player").hide();
            $("#th-player").hide();
            $("#frm-search").hide();
            $("#frm-status").hide();
            $(".btn-primary").hide();
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
                    <div class="buttons">
                        <button class="button" onclick="showFormUpdate(${data.id})">Udate</button>
                        <button class="button" onclick="window.location.href = 'tablesPlayer.html'">Back</button>
                    </div>
                </div>
               
            `);

            $("#player_detail").show();
            
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

function showPreviousPlayerStatus(){
    showAllPlayer();
    $("#btnStatusCancel").hide();
    $("#btnStatusUpdate").hide();
    $("#btnStatus").show();
}
