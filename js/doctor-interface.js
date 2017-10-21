var apiKey = require('./../.env').apiKey;
import { Doctor } from './../js/doctor.js';

$(document).ready(function() {

  $('#find-by-issue').submit(function(event) {
    event.preventDefault();
    let doctor = new Doctor();
    let issue = $('#issue').val();
    doctor.getDoctorsByIssue(issue);
  });

  $('#find-by-name').submit(function(event) {
    event.preventDefault();
    let doctor = new Doctor();
    let name = $('#name').val();
    doctor.getDoctorsByName(name);
  });

  $('#reset-button').click(function() {
    $('#show-doctors').text("");
  });

  window.findADoctor = window.findADoctor || {};

  $('#show-doctors').on('click', function(event) {
    event.originalEvent.srcElement.handleDoctorRowClick();
  });
});
