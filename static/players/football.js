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
