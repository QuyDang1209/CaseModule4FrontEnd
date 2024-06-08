        showAllCoach()
        function showAllCoach() {
            $.ajax({
                // Bổ sung headers cho AJAX request để thực hiện phân quyền
                // headers: {
                //     "Authorization": "Bearer " + token
                // },
                method: "GET",
                url: "http://localhost:8080/api/coaches",
                success: function (data) {
                    console.log(data);

                    // Xử lý dữ liệu khách hàng và hiển thị lên bảng
                    let table = $('table');

                    let strRow = "";
                    data.forEach(function (coaches) {
                        let row = `
                                 <tr>
                                    <td>${coaches.id}</td>
                                    <td>${coaches.code}</td>
                                    <td>${coaches.name}</td>
                                    <td>${coaches.dob}</td>
                                    <td>${coaches.address}</td>
                                    <td>${coaches.salary}</td>
                                     <td><img src="${'http://localhost:8080/static/' + coaches.img}" alt=""></td>
                                    <td>
                                    <button class="btn-view">View</button>
                                     <button class="btn-update" type="button" onclick="updateCoach(${coaches.id})">Update</button>
                                     <button class="btn-delete" data-id="${coaches.id}">Delete</button>
                                    </td>
                                 </tr>
                                    `;
                        strRow += row;

                    });
                    $("#tb-coach").html(strRow);
                }
            });

        }

        function addCoach(){
            $("#mdCreate").modal();
        }
        function submitCreateCoach() {
            let code = $("#code").val();
            let name = $("#fullName").val();
            let dob = $("#dob").val()
            let address = $("#addess").val()
            let salary = $("#salary").val()
            let img = document.getElementById("img")
            let formData = new FormData();
            formData.append("code",code);
            formData.append("name",name);
            formData.append("dob",dob);
            formData.append("address",address);
            formData.append("salary",salary);

            formData.append("img",img.files[0]);
            console.log(img.files[0])
            console.log(formData)
            $.ajax({
                data: formData,
                method: "post",
                processData: false,
                contentType: false,
                url: "http://localhost:8080/api/coaches",
                success: function (data) {
                    console.log("Player added successfully. Redirecting to tables.html", data);
                    window.location.href = "tableCoach.html";
                },
                error: function (jqXHR, status, e) {
                    console.log(e);

                }
            })}

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
                    // $("#imgUpdate").val(data.img);
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
                    console.log("Coach updated successfully. Redirecting to tables.html", data);
                    window.location.href = "tableCoach.html";
                },
                error: function (jqXHR, status, e) {
                    console.log("Error updating Coach:", e);
                }
            });
        }

        // Thêm sự kiện click vào nút "Update"
        $('#tb-coach').on('click', '.btn-update', function() {
            let id = $(this).closest('tr').find('td:first-child').text();
            updateCoach(id);
        });
        // function deleteCoach(id) {
        //     $.ajax({
        //         method: "DELETE",
        //         url: `http://localhost:8080/api/coaches/${id}`,
        //         success: function (data) {
        //             console.log("Coach deleted successfully.");
        //             showAllCoach(); // Gọi lại hàm showAllCoach() để cập nhật lại bảng
        //         },
        //         error: function (jqXHR, status, e) {
        //             console.log("Error deleting Coach:", e);
        //         }
        //     });
        // }
        // // Thêm sự kiện click vào nút "Delete"
        // $('#tb-coach').on('click', '.btn-delete', function() {
        //     let id = $(this).data('id');
        //     deleteCoach(id);
        // });
        function showFormDelete(id){
            $.ajax({
             url:"http://localhost:8080/api/coaches/" + id,
            })
        }