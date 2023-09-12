//fetching data from api
function fetchData() {
  $.ajax({
    url: " http://numbersapi.com/1/30/date?json",
    success: function (data) {
      $("li:first").text(data.text);
      $("li:nth-child(2)").text(data.year);
      $("li:nth-child(3)").text(data.found);
      $("li:nth-child(4)").text(data.number);
      $("li:nth-child(5)").text(data.type);
      console.log(data);
    },
  });
}

// function to upload images
function upload_images(data) {
  $.ajax({
    url: "http://localhost:3001/upload",
    type: "POST",
    data: data,
    contentType: false,
    processData: false,
    success: function (data) {
      if (data != 0) {
        alert("file uploaded");
      } else alert("uploaded error");
    },
  });
}

function addUser() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const role1 = document.querySelector("#role1");
  const role2 = document.querySelector("#role2");
  const type = role1.checked ? role1.value : role2.value;

  let formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("type", type);
  //const name = nameInput.value;
  // const email = emailInput.value;

  $.ajax({
    url: "http://localhost:3001/adduser",
    method: "POST",
    processData: false,
    contentType: "application/json",
    data: JSON.stringify({ email, password, type }),
    success: function (data) {
      console.log(data);
    },
  });
}

$(document).ready(function () {
  // submit image with form
  fetchData();

  $("#submitimage").click(function (e) {
    e.preventDefault();
    let formData = new FormData();
    let file = $("#imagefile")[0].files[0];
    formData.append("image", file);
    upload_images(formData);
  });

  $("#submituser").click(function (e) {
    e.preventDefault();
    // $(this).hide()
    addUser();
  });

  $("#animate").animate(
    {
      left: "100px",
      width: "100px",
      height: "100px",
      margin: "15px",
      duration: 2000,
      easing: "swing",

      // iterationCount: infinite,
    },
    function () {
      $(this).animate({
        left: "0px",
        width: "100px",
        height: "auto",
        margin: "15px",
        duration: 2000,
      });
    }
  );
});

const dropzone = document.querySelector(".drop");
dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("hover");
});

dropzone.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropzone.classList.remove("hover");
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  let file = e.dataTransfer.files[0];
  let formData = new FormData();
  formData.append("image", file);
  upload_images(formData);
});
