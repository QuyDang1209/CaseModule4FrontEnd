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
                <button>View</button>
                <button>Update</button>
                <button>Delete</button>
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