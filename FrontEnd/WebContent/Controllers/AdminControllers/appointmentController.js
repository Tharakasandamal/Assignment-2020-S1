var $username = "";
var $pw = "";
var appointment = {
    doctorId: 0,
    userId: 0,
    hospitalId: 0,
    date: "",
    paid: ""
};
var appointments = [];
var Doctors = [];
var Users = [];
var Hospitals = [];
var appointments2 = [];
var appointments3 = [];
var appointments4 = [];
var SearchAppointments = [];
var apointmenttable = ["doctorId", "userId", "hospitalId", "date", "paid"];
var appointDocTable = ["doctorId", "date"];

var $rootUrl = "http://localhost:8080/demorest/webapi/adminlogin/appointment/";
var $globalUrl = "";

$(document).ready(function() {
    $username = sessionStorage.getItem("username");
    $pw = sessionStorage.getItem("pw");

    $.ajax({
        url: $rootUrl,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            appointments = data;
            $.ajax({
                url: "http://localhost:8080/demorest/webapi/adminlogin/doctor",
                headers: {
                    "Authorization": "Basic " + btoa($username + ":" + $pw)
                },
                contentType: 'application/json',
                dataType: 'json',
                type: 'GET',
                success: function(data1) {
                    Doctors = data1;
                    addDoc();
                    $.ajax({
                        url: "http://localhost:8080/demorest/webapi/adminlogin/users",
                        headers: {
                            "Authorization": "Basic " + btoa($username + ":" + $pw)
                        },
                        contentType: 'application/json',
                        dataType: 'json',
                        type: 'GET',
                        success: function(data2) {
                            Users = data2;
                            addUser();

                            $.ajax({
                                url: "http://localhost:8080/demorest/webapi/adminlogin/hospital",
                                headers: {
                                    "Authorization": "Basic " + btoa($username + ":" + $pw)
                                },
                                contentType: 'application/json',
                                dataType: 'json',
                                type: 'GET',
                                success: function(data) {
                                    Hospitals = data;
                                    addHosptl();
                                    tableCreation(appointments4);
                                }
                            });

                        }
                    });
                }
            });

        }
    });


});


function ViewbuttonClick(para) {
    appointments4.forEach(function(item) {
        if (item["id"] == para) {
            appointment = item;
        }
    });
    setViewData();
}




$(document).on("click", "#searchBtn", function() {
    SearchAppointments = [];
    removetble();
    var searchinput = document.getElementById("inputSearch").value;
    document.getElementById("inputSearch").value = '';
    Users.forEach(function(item) {
        if (item["fname"] == searchinput || item["lname"] == searchinput) {
            appointments4.forEach(function(item2) {
                if (item2["userId"] == item["fname"] + " " + item["lname"]) {
                    SearchAppointments.push(item2)
                }
            });
        }
    });
    Doctors.forEach(function(item) {
        if (item["fname"] == searchinput || item["lname"] == searchinput) {
            appointments4.forEach(function(item2) {
                if (item2["doctorId"] == item["fname"] + " " + item["lname"]) {
                    SearchAppointments.push(item2)
                }
            });
        }
    });
    Hospitals.forEach(function(item) {
        if (item["name"] == searchinput) {
            appointments4.forEach(function(item2) {
                if (item2["hospitalId"] == item["name"]) {
                    SearchAppointments.push(item2)
                }
            });
        }
    });
    tableCreation(SearchAppointments);

});

$(document).on("click", "#ResetBtn", function() {
    removetble();
    tableCreation(appointments4)
});

function tableCreation(para) {
    if (document.getElementById("listtable") != null) {
        var table = document.getElementById("listtable");
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        para.forEach(function(item) {
            userSelect = item["id"];
            var row = document.createElement("tr");
            apointmenttable.forEach(function(key) {
                var cell = document.createElement("td");
                if (key == "date") {
                    cell.textContent = item[key].replace('Z', '');;
                } else {
                    cell.textContent = item[key];
                }
                row.appendChild(cell);
            });
            var cellview = document.createElement("td");
            cellview.innerHTML = "<a href='#viewModal' onclick='ViewbuttonClick(" + userSelect + ")' class='view' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>visibility</i></a>";
            row.appendChild(cellview);
            var celledit = document.createElement("td");
            celledit.innerHTML = "<a href='#editModal' onclick='editbuttonClick(" + userSelect + ")' class='edit' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i></a>";
            row.appendChild(celledit);
            var celldelete = document.createElement("td");
            celldelete.innerHTML = "<a href='#deleteModal' onclick='deletebuttonClick(" + userSelect + ")' class='delete' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i></a>";
            row.appendChild(celldelete);
            tbody.appendChild(row);
        });
    }
}


function setViewData() {
    document.getElementById("doctorId").innerHTML = appointment.doctorId;
    document.getElementById("userId").innerHTML = appointment.doctorId;
    document.getElementById("hospitalId").innerHTML = appointment.hospitalId;
    document.getElementById("paid").innerHTML = appointment.paid;
    document.getElementById("date").innerHTML = appointment.date.replace('Z', '');
}

function addDoc() {
    appointments.forEach(function(appointment1) {
        var docid = appointment1["doctorId"];
        Doctors.forEach(function(doc) {
            if (doc["id"] == docid) {
                appointment1["doctorId"] = doc["fname"] + " " + doc["lname"];
            }
        });
        appointments2.push(appointment1);
    });
}

function addUser() {
    appointments2.forEach(function(appointment1) {
        var usrid = appointment1["userId"];
        Users.forEach(function(user) {
            if (user["id"] == usrid) {
                appointment1["userId"] = user["fname"] + " " + user["lname"];
            }
        });
        appointments3.push(appointment1);
    });
}

function addHosptl() {
    appointments3.forEach(function(appointment1) {
        var hsptlid = appointment1["hospitalId"];
        Hospitals.forEach(function(hsptl) {
            if (hsptl["id"] == hsptlid) {
                appointment1["hospitalId"] = hsptl["name"];
            }
        });
        appointments4.push(appointment1);
    });
}

function docChange() {
    removeDoctble();
    var doc = document.getElementById("inputdoctorId").value;
    var table = document.getElementById("appointmntDatetable");
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    appointments4.forEach(function(item) {
        if (item["doctorId"] == doc) {
            console.log(item["doctorId"]);
            console.log(item["date"]);
            var row = document.createElement("tr");
            var cell = document.createElement("td");
            cell.textContent = item["doctorId"];
            row.appendChild(cell);

            var cell = document.createElement("td");
            cell.textContent = item["date"].replace('Z', '');
            row.appendChild(cell);

            tbody.appendChild(row);
        }
    });

}

function hsptlChange() {
    removeDoctble();
    var hsptlname = document.getElementById("inputhospitalId").value;
    var hsptlId = '';
    Hospitals.forEach(function(item) {
        if (item["name"] == hsptlname) {
            hsptlId = item["id"];
        }
    });
    var select = document.getElementById("inputdoctorId");
    var i, L = select.options.length - 1;
    for (i = L; i >= 0; i--) {
        select.remove(i);
    }
    var el = document.createElement("option");
    el.text = "";
    el.value = "";
    select.add(el);
    Doctors.forEach(function(item) {
        if (item["hospitalId"] == hsptlId) {
            el = document.createElement("option");
            el.text = item["fname"] + " " + item["lname"];
            el.value = item["fname"] + " " + item["lname"];
            select.add(el);
        }

    });

}

function signOut() {
    sessionStorage.clear();
    window.location = "/FrontEnd/views/login.jsp";
}

$(document).on("click", "#sidebarCollapse", function() {
    $('#sidebar').toggleClass('active');
});

function removetble() {
    var myTable = document.getElementById('listtable');
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        myTable.deleteRow(x);
    }

}

function removeDoctble() {
    var myTable = document.getElementById('appointmntDatetable');
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        myTable.deleteRow(x);
    }

}
$(document).on("click", "#CloseBtn", function(event) {
    window.location.reload();
});

function alertModifier(para1, para2) {
    if (para2 == 'success') {
        document.getElementById('alertTitle').innerHTML = "Succeed";
        switch (para1) {
            case 'create':
                document.getElementById('AlertMsg').innerHTML = "Record Added Successfully";
                break;
            case 'update':
                document.getElementById('AlertMsg').innerHTML = "Record Updated Successfully";
                break;
            case 'delete':
                document.getElementById('AlertMsg').innerHTML = "Record Deleted Successfully";
                break;
        }
    } else {
        document.getElementById('alertTitle').innerHTML = "Failed";
        document.getElementById('AlertMsg').innerHTML = para2;

    }
}