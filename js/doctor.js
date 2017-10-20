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

  callApi(promise) {
    promise.then(function(response) {
      let body = JSON.parse(response);
      let arr = [];
      body.data.forEach(function(object) {
        arr.push(object);
      });
      arr.forEach(function(object) {
        $('#show-doctors').append(`<li>${object.practices[0].name}</li>`);
      });
      if(arr.length === 0) {
        $('.showErrors').text(`There are no doctors available who specialize in that issue. Please try your search again.`);
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
