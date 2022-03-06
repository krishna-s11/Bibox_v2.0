var modal1 = document.getElementById("myModal1");
var modal2 = document.getElementById("myModal2");

var btn1 = document.getElementsByClassName("acpt")[0];
var btn2 = document.getElementsByClassName("acpt")[1];

var span1 = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];

btn1.onclick = function() {
  modal1.style.display = "block";
}
btn2.onclick = function() {
    modal2.style.display = "block";
}
  
span1.onclick = function() {
  modal1.style.display = "none";
}
span2.onclick = function() {
  modal2.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}