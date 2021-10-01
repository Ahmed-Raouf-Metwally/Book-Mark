var bookMarktNameInput = document.getElementById('siteName');
var bookMarkUrlInput = document.getElementById('siteUrl');
var btnAddButton = document.getElementById('btnAdd');
var inputs = document.getElementsByClassName('form-control');
var nameAlert = document.getElementById('nameAlert');
var urlAlert = document.getElementById('urlAlert');
var nameAlertAccepted = document.getElementById('nameAlertAccepted');
var urlAlertAccepted = document.getElementById('urlAlertAccepted');
var allInputsAlert = document.getElementById('allInputsAlert');
var bookMarksContainer = [];
var indexUpdate = 0;
var nameRegx = /^[A-Z]{1}[A-Za-z]{3,9}$/;
var urlRegx = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/
let validFlag1;
let validFlag2;
if (localSbookMark = JSON.parse(localStorage.getItem("bookMarksList")) != null) {
    bookMarksContainer = JSON.parse(localStorage.getItem("bookMarksList"));
    displayData();
}

btnAddButton.onclick = function addSite() {
    if (bookMarktNameInput.value == "" || bookMarkUrlInput.value == "") {
        allInputsAlert.classList.remove("d-none")
        btnAddButton.disabled = "true";
    }
    else {
        var bookMark = {
            name: bookMarktNameInput.value,
            url: bookMarkUrlInput.value,
        }
        if (document.getElementById("btnAdd").innerHTML == `submit <i class="fas fa-plus ps-2"></i>`) {
            bookMarksContainer.push(bookMark);
            localStorage.setItem("bookMarksList", JSON.stringify(bookMarksContainer));
            displayData();
            clearForm();
            allInputsAlert.classList.add("d-none")
            nameAlertAccepted.classList.add("d-none")
            urlAlertAccepted.classList.add("d-none")
        }
        else if (document.getElementById("btnAdd").innerHTML == `update <i class="far fa-edit ps-2"></i>`) {
            updateData(indexUpdate);
            clearForm();
            document.getElementById("btnAdd").innerHTML = `submit <i class="fas fa-plus ps-2"></i>`
        }
    }
}

function updateData(index) {
    bookMarksContainer[index].name = bookMarktNameInput.value;
    bookMarksContainer[index].url = bookMarkUrlInput.value;
    localStorage.setItem("bookMarksList", JSON.stringify(bookMarksContainer));
    displayData();
}

function displayData() {
    var trs = '';
    for (var i = 0; i < bookMarksContainer.length; ++i) {
        trs +=
            `<tr>
            <td>${i + 1}</td>
            <td>${bookMarksContainer[i].name}</td>
            <td>${bookMarksContainer[i].url}</td>
            <td><a class="btn btn-outline-success" href="${bookMarksContainer[i].url}" target="_blank">visit</a></td>
            <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
            </tr>`;
    }
    document.getElementById("tableBody").innerHTML = trs;
    clearForm();
}

function clearForm() {
    for (var i = 0; i < inputs.length; ++i) {
        inputs[i].value = "";
    }
}

function sarech(val) {
    var trs = '';
    for (var i = 0; i < bookMarksContainer.length; ++i) {
        if (bookMarksContainer[i].name.toLowerCase().includes(val.toLowerCase())) {
            trs +=
                `<tr>
                <td>${i + 1}</td>
                <td>${bookMarksContainer[i].name}</td>
                <td>${bookMarksContainer[i].url}</td>
                <td><a class="btn btn-outline-success" href="${bookMarksContainer[i].url.JSON}"target="_blank">Visit</a></td>
                <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
                </tr>`;
            document.getElementById("tableBody").innerHTML = trs;
        }
    }
    if (trs == '') {
        trs =
            `<h1 class="text-black-50"> Not Found </h1>`;
        document.getElementById("tableBody").innerHTML = trs;
    }
}

function deleteProduct(index) {
    document.getElementById("btnAdd").innerHTML = `submit <i class="fas fa-plus ps-2"></i>`;
    bookMarksContainer.splice(index, 1);
    localStorage.setItem("bookMarksList", JSON.stringify(bookMarksContainer))
    displayData();

}

function updateProduct(index) {
    bookMarktNameInput.value = bookMarksContainer[index].name;
    bookMarkUrlInput.value = bookMarksContainer[index].url;
    document.getElementById("btnAdd").innerHTML = `update <i class="far fa-edit ps-2"></i>`;
    indexUpdate = index;
}

function checkName() {
    if (nameRegx.test(bookMarktNameInput.value)) {
        validFlag1 = true;
        return true;
    }
    else {
        validFlag1 = false;
        return false;
    }
}
function isEmpty() {
    if (bookMarktNameInput.value == "" || bookMarkUrlInput.value == "") {
        return true;
    }
    else {
        return false;
    }
}
bookMarktNameInput.onkeyup = function () {
    if (checkName() == true) {
        nameAlertAccepted.classList.remove("d-none");
        nameAlert.classList.add("d-none")
    } else if (checkName() == false) {
        nameAlertAccepted.classList.add("d-none");
        nameAlert.classList.remove("d-none");
    }
    if (isEmpty() == true) {
        allInputsAlert.classList.remove("d-none")
    } else {
        allInputsAlert.classList.add("d-none")
    }
    isValid();
}


function checkUrl() {
    if (urlRegx.test(bookMarkUrlInput.value)) {
        validFlag2 = true;

        return true;
    }
    else {
        validFlag2 = false;
        return false;
    }
}

bookMarkUrlInput.onkeyup = function () {
    if (checkUrl() == true) {
        urlAlertAccepted.classList.remove("d-none");
        urlAlert.classList.add("d-none")
    } else if (checkUrl() == false) {
        urlAlertAccepted.classList.add("d-none");
        urlAlert.classList.remove("d-none");    
    }
    if (isEmpty() == true) {
        allInputsAlert.classList.remove("d-none")
    } else {
        allInputsAlert.classList.add("d-none")
    }
    isValid();
}

function isValid() {
    if (validFlag1 == true && validFlag2 == true) {
        btnAddButton.removeAttribute("disabled");
    }
    else {
        btnAddButton.disabled = "true";
    }
}

