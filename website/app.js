/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=fc8a05bbddadaf9abb7d2492b94b02e5&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();
console.log(newDate);

document
  .getElementById('generate')
  .addEventListener('click', fetchDataAndUpdataUI);

function fetchDataAndUpdataUI() {
  const zipCode = document.getElementById('zip').value;

  const userResponse = document.getElementById('feelings').value;

  getOpenWeatherMapData(baseUrl, zipCode, apiKey)
    .then((data) => {
      console.log(data);
      postData('/projectData', {
        temperature: data.main.temp,
        date: newDate,
        userResponse: userResponse,
      });
    })
    .then(updateUI);
}

const getOpenWeatherMapData = async (baseUrl, zipCode, apiKey) => {
  const response = await fetch(baseUrl + zipCode + apiKey);
  console.log(baseUrl + zipCode + apiKey);
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

const postData = async (url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

const updateUI = async () => {
  const request = await fetch('/projectData');
  console.log(request);

  try {
    const data = await request.json();
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = data.temperature;
    document.getElementById('content').innerHTML = data.userResponse;
  } catch (error) {
    console.log('error', error);
  }
};
