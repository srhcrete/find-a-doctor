var apiKey = require('./../.env').apiKey;
import { Doctor } from './../js/doctor.js';

$(document).ready(function() {

  $('#find-by-issue').submit(function(event) {
    event.preventDefault();
    let doctor = new Doctor();
    let issue = $('#issue').val();
    let promise = doctor.makePromise(issue);
    doctor.issueCallApi(promise);
  });

  $('#find-by-name').submit(function(event) {
    event.preventDefault();
    let doctor = new Doctor();
    let name = $('#name').val();
    let promise = doctor.makeAnotherPromise(name);
    doctor.nameCallApi(promise);
  });

  $('#reset-button').click(function() {
    $('#show-doctors').text("");
  });

  $('body').on('click', ".openIt", function (e) {
    console.log("clicky");
    $(this).children('.info').show();
  });

//   $("#delalist").live('click',function (e) {
//     e.stopImmediatePropagation();
//     e.preventDefault();
//     alert ('in delalist') ;
// });
});
