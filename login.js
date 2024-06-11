/*function login(){
    //lay du lieu
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
//     tao object
    let u ={
        "username": username,
        "password": password
    }
//     goi ajax
    $.ajax({
        // quy dinh du lieu gui len la json
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",
        // chuyen object -> json
        data: JSON.stringify(u),
        url: "http://localhost:8080/api/auth/login",
        success: function (dulieu) {
            // ghi vao localstorage
            localStorage.setItem("u", JSON.stringify(dulieu));
            window.location.href = "tables.html"
        }
    })
}
}

 */


function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(username,password)

    // Validate input
    if (!username && !password && (password.length < 6 && password.length > 8)) {
        alert("Username should not be empty, password must be limited by 6-8 characters");
        return;
    }

    const user = {
        username: username,
        password: password
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",
        data: JSON.stringify(user),
        url: "http://localhost:8080/api/auth/login",
        success: function (response) {
            console.log(response)
            localStorage.setItem("user", JSON.stringify(response));

            if(response.authorities[0].authority === "role_admin"){
                window.location.href = "tablesPlayer.html";
            }else if(response.authorities[0].authority === "role_user"){
                window.location.href = "tableCoach.html";
            }else{
                alert("Invalid credentials");
            }
            },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Login error:", textStatus, errorThrown);
            alert("Login failed. Please check your credentials.");
        },
    });
}
