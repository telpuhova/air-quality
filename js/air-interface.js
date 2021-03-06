import { apiKey } from './../.env';

let getState = function(country) {
  $.ajax({
    url: `http://api.airvisual.com/v2/states?country=${country}&key=${apiKey}`,
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(response) {
      let states = response.data;
      for(let i=0; i < states.length; i++) {
        $('#states').append(`
          <option value="${states[i].state}">${states[i].state}</option>
          `);
      }
      return states;
    },
    error: function() {
      $('#errors').text("There was an error processing your request. Please try again.");
    }
  });
}


let getCities = function(state, country) {
  $.ajax({
    url: `http://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=${apiKey}`,
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(response) {
      let cities = response.data;
      for(let i=0; i < cities.length; i++) {
        $('#cities').append(`
          <option value="${cities[i].city}">${cities[i].city}</option>
          `);
      }
      return cities;
    },
    error: function() {
      $('#errors').text("There was an error processing your request. Please try again.");
    }
  });
}

let getPolution = function(city, state, country) {

  $.ajax({
    url: `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${apiKey}`,
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(response) {
      let polutionLvl = response.data;
      $('#pollutionLvl').html(`
        <ul>
        <li>CITY: ${polutionLvl.city}</li>
        <li>AQIUS: ${polutionLvl.current.pollution.aqius}</li>
        </ul>
        `);
    },
    error: function() {
      $('#errors').text("There was an error processing your request. Please try again.");
    }
  });
}


$(document).ready(function() {
  console.log(apiKey);
  // let url = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=7LRyPFW5Ei3JYTJin`;

  let countries = [];
  let states;
  let cities = [];
  let country;
  let state;
  let city;

  $.ajax({
    url: `http://api.airvisual.com/v2/countries?key=${apiKey}`,
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(response) {
      countries = response.data;
      for(let i=0; i < countries.length; i++) {
        $('#countries').append(`
          <option value="${countries[i].country}">${countries[i].country}</option>
          `);
      }
    },
    error: function() {
      $('#errors').text("There was an error processing your request. Please try again.");
    }
  });


  $('#queryAirData').submit(function(event){
    // alert("submit event!");
    event.preventDefault();

    country = $("#countries").val();
    state = $('#states').val();
    city = $('#cities').val();
    if(city != null) {
      getPolution(city, state, country);
    } else if(state != null) {
      getCities(state, country);
    } else if(country != null) {
      getState(country);
    } else {
      console.log("Reached Else");
    }

  });

});
