var apiKey = require('./../.env').apiKey;
export class Doctor {
  constructor () {

  }

  makePromise(issue) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&user_key=${apiKey}&query=${issue}`;

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }

  issueCallApi(promise) {
    promise.then(function(response) {
      let body = JSON.parse(response);
      let arr = [];
      body.data.forEach(function(object) {
        arr.push(object);
      });
      console.log(arr);
      arr.forEach(function(object) {
        $('#show-doctors').append(`<li>${object.practices[0].name}</li>`);
      });
      if(arr.length === 0) {
        $('.showErrors').text(`We could not find any doctors who specialize in that issue. Please try your search again.`);
        setTimeout(function(){
          $('.showErrors').empty();
        }, 5000);
      }
    }, function(error) {
      alert("error");
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  }

  makeAnotherPromise(name) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&user_key=${apiKey}&name=${name}`;

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }

  nameCallApi(promise) {
    promise.then(function(response) {
      let body = JSON.parse(response);
      let arr = [];
      body.data.forEach(function(object) {
        arr.push(object);
      });
      console.log(arr);
      arr.forEach(function(object) {

        var appended = $(`<li class="openIt dr-row">${object.practices[0].name}</li>`)
          .appendTo('#show-doctors');

        appended[0].handleDoctorRowClick = function() {
          console.log(object);
          if(object.practices[0].accepts_new_patients === true){
            $('#doctor-info').append('<p><strong>Currently accepting new patients</strong></p>');
          }
          if(object.practices[0].website) {
            $('#doctor-info').append(`<p><strong>Website: </strong><a href=${object.practices[0].website}>${object.practices[0].website}</a></p>`);
          }
          $('#doctor-info').append(`<p><strong>Address: </strong>${object.practices[0].visit_address.street} ${object.practices[0].visit_address.city}, ${object.practices[0].visit_address.state} ${object.practices[0].visit_address.zip}</p>`);
          $('#doctor-info').append(`<p><strong>Phone: </strong>${object.practices[0].phones[0].number}</p>`);
          $('#doctor-info').append('');
        };
      });
      if(arr.length === 0) {
        $('.showErrors').text(`We could not find any doctors by that name. Please try your search again.`);
        setTimeout(function(){
          $('.showErrors').empty();
        }, 5000);
      }
    }, function(error) {
      alert("error");
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  }
} //end of Doctor class
