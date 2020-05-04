var $username = "";
var $pw = "";
var $id = "";
var appointment = {
    doctorId: 0,
    userId: 0,
    hospitalId: 0,
    date: "",
    paid: "no"
};
var appointments = [];
var Doctors = [];
var Hospitals = [];
var appointments2 = [];
var appointments3 = [];
var sortedappointments = [];
var apointmenttable = ["doctorId", "hospitalId", "date", "paid", ""];
var appointDocTable = ["doctorId", "date"];

var $rootUrl = "http://localhost:8080/demorest/webapi/userlogin/appointment/";
var $globalUrl = "";

$(document).ready(function() {
    $username = sessionStorage.getItem("username");
    $pw = sessionStorage.getItem("pw");
    $id = sessionStorage.getItem("id");
    $.ajax({
        url: $rootUrl + $id,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            appointments = data;
            $.ajax({
                url: "http://localhost:8080/demorest/webapi/userlogin/doctor",
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
                        url: "http://localhost:8080/demorest/webapi/userlogin/hospital",
                        headers: {
                            "Authorization": "Basic " + btoa($username + ":" + $pw)
                        },
                        contentType: 'application/json',
                        dataType: 'json',
                        type: 'GET',
                        success: function(data) {
                            Hospitals = data;
                            addHosptl();
                            tableCreation(appointments3);
                        }
                    });
                }
            });

        }
    });


});

function sortTable(para) {
    sortedappointments = [];
    removetble();
    var todayDate = new Date().toISOString().slice(0, 10);
    switch (para) {
        case 'all':
            appointments3.forEach(function(appointment1) {
                sortedappointments.push(appointment1);
            });
            break;
        case 'today':
            appointments3.forEach(function(appointment1) {
                if (appointment1["date"].replace('Z', '') == todayDate) {
                    sortedappointments.push(appointment1);
                }
            });
            break;
        case 'up':
            appointments3.forEach(function(appointment1) {
                if (appointment1["date"].replace('Z', '') > todayDate) {
                    sortedappointments.push(appointment1);
                }
            });
            break;
        case 'past':
            appointments3.forEach(function(appointment1) {
                if (appointment1["date"].replace('Z', '') < todayDate) {
                    sortedappointments.push(appointment1);
                }
            });
            break;
    }
    tableCreation(sortedappointments)
}

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
            tbody.appendChild(row);
        });
    }
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

function addHosptl() {
    appointments2.forEach(function(appointment1) {
        var hsptlid = appointment1["hospitalId"];
        Hospitals.forEach(function(hsptl) {
            if (hsptl["id"] == hsptlid) {
                appointment1["hospitalId"] = hsptl["name"];
            }
        });
        appointments3.push(appointment1);
    });
}

function signOut() {
    sessionStorage.clear();
    window.location = "/FrontEnd/views/login.jsp";
}

$(document).on("click", "#sidebarCollapse", function(event) {
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
$(document).on("click", "#CloseBtn1", function(event) {
    window.location.reload();
});
$(document).on("click", "#CloseBtn2", function(event) {
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
            case 'payment':
            	document.getElementById('AlertMsg2').innerHTML = "Payment Successfull";
            	break
        }
    } else {
        document.getElementById('alertTitle').innerHTML = "Failed";
        document.getElementById('AlertMsg').innerHTML = para2;

    }
}
function paymentAlertModifier(para1, para2) {
    if (para2 == 'success') {
        document.getElementById('alertTitle2').innerHTML = "Succeed";
        switch (para1) {
            case 'create':
                document.getElementById('AlertMsg2').innerHTML = "Record Added Successfully";
                break;
            case 'update':
                document.getElementById('AlertMsg2').innerHTML = "Record Updated Successfully";
                break;
            case 'delete':
                document.getElementById('AlertMsg2').innerHTML = "Record Deleted Successfully";
                break;
           
        }
    } else {
        document.getElementById('alertTitle2').innerHTML = "Failed";
        document.getElementById('AlertMsg2').innerHTML = para2;

    }
}
