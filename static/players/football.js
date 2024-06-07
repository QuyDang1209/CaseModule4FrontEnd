/*
$(document).ready(function() {
    // Thêm người chơi mới
    $("#addPlayerForm").submit(function(event) {
        event.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/api/add_player",
            data: formData,
            success: function(response) {
                // Xử lý kết quả thành công
                console.log("Add players successfully !!!");
                // Thực hiện các hành động cần thiết sau khi thêm
            },
            error: function(xhr, status, error) {
                // Xử lý lỗi
                console.error("Error adding players:", error);
            }
        });
    });

    // Sửa thông tin người chơi
    $(".editPlayerForm").submit(function(event) {
        event.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: "PUT",
            url: "/api/edit_player",
            data: formData,
            success: function(response) {
                // Xử lý kết quả thành công
                console.log("Updating players successfully");
                // Thực hiện các hành động cần thiết sau khi sửa
            },
            error: function(xhr, status, error) {
                // Xử lý lỗi
                console.error("Error adding players:", error);
            }
        });
    });

    // Xóa người chơi
    $(".deletePlayerBtn").click(function() {
        var playerId = $(this).data("player-id");
        $.ajax({
            type: "DELETE",
            url: "/api/delete_player/" + playerId,
            success: function(response) {
                // Xử lý kết quả thành công
                console.log("Người chơi đã được xóa thành công");
                // Thực hiện các hành động cần thiết sau khi xóa
            },
            error: function(xhr, status, error) {
                // Xử lý lỗi
                console.error("Lỗi khi xóa người chơi:", error);
            }
        });
    });

    // Tìm kiếm người chơi
    $("#searchForm").submit(function(event) {
        event.preventDefault();
        var searchTerm = $("#searchInput").val();
        $.ajax({
            type: "GET",
            url: "/api/search_players?term=" + searchTerm,
            success: function(response) {
                // Xử lý kết quả tìm kiếm
                console.log("Searching:", response);
            },
            error: function(xhr, status, error) {
                // Xử lý lỗi
                console.error("Searching players error!!", error);
            }
        });
    });
});

 */
// coding ajax for the players
let jwtToken = null;
let modalCredit = {
    id: null,
    edit: false
};

function getUser(){
    let user = localStorage.getItem("user");
    if(user != null){
        let idUser = JSON.parse(user).id;
        $.ajax({
            url:"null",
            method:"GET",
            success:function(data){
                data.salary = undefined;
                data.ranking = undefined;
                data.performence = undefined;
                data.bmi = undefined;
                console.log(data);
                localStorage.setItem("object", JSON.stringify(data));
                let userHTML =`
                    <tr>
                        <td>${data.name}</td>
                        <td>${data.code}</td>
                        <td>${data.date}</td>
                        <td>${data.address}</td>
                        <td>${data.position}</td>
                        <td>${data.performence}</td>
                        <td>${data.height}</td>
                        <td>${data.bmi}</td>
                        <td>${data.salary}</td>
                        <td>${data.ranking}</td>
                        <td>${data.image}</td>
                        <td>${data.status}</td>
                        <td>
                            <a data-id="${data.id}" class="btn btn-primary btn-edit"></a>
                        </td>
                    </tr>
                `;
                $('#tb-user').html(userHtml);
                $(".btn-edit").on("click", function (evt){
                    modalCreEdit.id = $(this).data("id");
                    let modalCreEdit;
                    modalCreEdit.edit = true;
                    $.ajax({
                        url: "null",
                        method: 'GET',
                        success:function(data){
                            $("#code").val(data.code);
                            $("#name").val(data.name);
                            $("date").val(data.date);
                            $("#address").val(data.address);
                            $("#position").val(data.position);
                            $("#performence").val(data.performence);
                            $("#height").val(data.height);
                            $("#bmi").val(data.bmi);
                            $("#salary").val(data.salary);
                            $("#ranking").val(data.ranking);
                            $("#image").val(data.image);
                            $("#status").val(data.status);
                            $("#myModal").modal();
                        }
                    })
                });
            },
            error:function(err){
                console.log("Error when finding player name", err);
            }
        })
    }
}
getUser();