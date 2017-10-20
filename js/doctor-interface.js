var apiKey = require('./../.env').apiKey;
import { Doctor } from './../js/doctor.js';

$(document).ready(function() {

  $('#find-a-doctor').submit(function(event) {
    event.preventDefault();
    let doctor = new Doctor();
    let issue = $('#issue').val();
    let name = $('#name').val();
    let promise = doctor.makePromise(issue);
    doctor.callApi(promise);
  });

  $('#reset-button').click(function() {
    $('#show-doctors').text("");
  });
});
