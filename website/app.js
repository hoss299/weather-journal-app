/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=ef2bf1ac6ebad97cd25a14e06fec507a';


// Create a new date instance dynamically with JS
let d = new Date();

// The getMonth() method returns the month of a date as a number from 0 to 11.
// To get the correct month, you must add 1

let rightMonthNumber = d.getMonth() + 1 ;
let newDate = rightMonthNumber +'.'+ d.getDate()+'.'+ d.getFullYear();

// console.log(d);
// console.log(newDate);



const postData = async ( url = '', data = {}) => {
      console.log(data);

      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
      });

      try {
        const newData = await response.json();
        // console.log(newData);
        return newData;
      } catch(error) {
      console.log("error", error);
      }
}





const getData = async (url) => {
    const res = await fetch(url)
    try {
      const gotdata = await res.json();
      // console.log(gotdata);
      return gotdata;
    } catch(error){
      console.log(error);
    }
}

document.getElementById('generate').addEventListener('click', doTheWork);

function doTheWork (e) {
  e.preventDefault();
  // console.log('btn works');
  const feelings = document.getElementById('feelings').value;
  const zip = document.getElementById('zip').value;
  // console.log(zip);
  // console.log(feelings);
  getData(`${baseURL}${zip}${apiKey}`)
  .then((data) => {
    postData('/addEntry', {temperature:data.main.temp, date:newDate , userResponse:feelings} );
    updateUI();
  })
   
}


const updateUI = async () => {
    const request = await fetch('/getEntry');
  try{
    const gottenData = await request.json();
    // console.log(gottenData);
    document.getElementById('date').innerHTML = gottenData.date;
    document.getElementById('temp').innerHTML = gottenData.temperature;
    document.getElementById('content').innerHTML = gottenData.userResponse;

  }catch(error){
    console.log("error", error);
  } 
}

