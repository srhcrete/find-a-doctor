var apiKey = require('./../.env').apiKey;
export class Doctor {
  constructor () {

  }

  getApiRoot() {
    return 'https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland';
  }

  getDoctorsByIssue(issue) {
    var errorString = `We could not find any doctors who specialize in that issue. Please try your search again.`;
    return this.getFromApi(`&user_key=${apiKey}&query=${issue}`)
      .then((response) => this.handleDoctorApiSuccess(errorString, response));
  }

  getDoctorsByName(name) {
    var errorString = `We could not find any doctors by that name. Please try your search again.`;
    return this.getFromApi(`&user_key=${apiKey}&name=${name}`)
      .then((response) => this.handleDoctorApiSuccess(errorString, response));
  }

  getFromApi(queryParams) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `${this.getApiRoot()}${queryParams}`;

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    })
      .catch(this.handleDoctorApiFail);
  }

  handleDoctorApiSuccess(errorString, response) {
    let body = JSON.parse(response);
    let doctors = [];
    body.data.forEach(function(practice) {
      doctors.push(practice);
    });

    makeDoctorRows(doctors, errorString);
  }

  handleDoctorApiFail(error) {
    alert("error");
    $('.showErrors').text(`There was an error processing your request: ${error.message}`);
  }
} //end of Doctor class

function makeDoctorRows(doctors, errorString) {
  if (doctors) {
    doctors.forEach(function(practice) {

      var appended = $(`<li class="openIt dr-row">${practice.practices[0].name}</li>`)
      .appendTo('#show-doctors');

      appended[0].handleDoctorRowClick = function() {
        console.log(practice);
        if(practice.practices[0].accepts_new_patients === true){
          $('#doctor-info').append('<p><strong>Currently accepting new patients</strong></p>');
        }
        if(practice.practices[0].website) {
          $('#doctor-info').append(`<p><strong>Website: </strong><a href=${practice.practices[0].website}>${practice.practices[0].website}</a></p>`);
        }
        $('#doctor-info').append(`<p><strong>Address: </strong>${practice.practices[0].visit_address.street} ${practice.practices[0].visit_address.city}, ${practice.practices[0].visit_address.state} ${practice.practices[0].visit_address.zip}</p>`);
        $('#doctor-info').append(`<p><strong>Phone: </strong>${practice.practices[0].phones[0].number}</p>`);
        $('#doctor-info').append('');
      };
    });
  } else {
    $('.showErrors')
      .text(errorString);

    setTimeout(function(){
      $('.showErrors').empty();
    }, 5000);
  }
}
