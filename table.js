showAllPlayer()
function showAllPlayer() {
    $.ajax({
        // Bổ sung headers cho AJAX request để thực hiện phân quyền
        // headers: {
        //     "Authorization": "Bearer " + token
        // },
        method: "GET",
        url: "http://localhost:8080/api/player",
        success: function (data) {
            console.log(data);

            // Xử lý dữ liệu khách hàng và hiển thị lên bảng
            let table = $('table');

            let strRow = "";
            data.forEach(function (player) {
                let row = `
                         <tr>
                            <td>${player.id}</td>
                            <td>${player.code}</td>
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
                strRow += row;

            });
            $("#tb-player").html(strRow);

            // let strRow = "";
            // for(let i = 0; i< data.length;i++){
            //     strRow += `
            //         <tr data-id="2">
            //             <td>${data[i].id}</td>
            //             <td>${data[i].name}</td>
            //             <td>${data[i].age}</td>
            //             <td>${data[i].gender}</td>
            //             <td>${data[i].address}</td>
            //             <td>
            //                 <button onclick="showEditForm(2)">Sửa</button>
            //                 <button onclick="deleteCustomer(2)">Xóa</button>
            //             </td>
            //         </tr>
            //     `
            // }
        }
    });
}