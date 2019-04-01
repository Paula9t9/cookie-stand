var hours = 15;

var pike = {
  locationName: '1st and Pike',
  minCust: 23,
  maxCust: 65,
  avgCookie: 6.3,
  custPerHour: [],
  cookiesPerHour: [], 
  totalCookies: 0
};

pike.custPerHour = custPerHour(pike.minCust, pike.maxCust);
pike.cookiesPerHour = cookiesPerHour(pike.custPerHour, pike.avgCookie);
displaySales(pike.locationName, pike.cookiesPerHour);


function custPerHour(min, max){
  var custArray = [];

  for(var i=0; i < hours; i++){
    custArray[i] = Math.round(Math.random() * (max - min) + min);
  }

  return custArray;
}

function cookiesPerHour(custArray, avgCookies){

  var cookieArray = [];

  for (var i=0; i < custArray.length; i++){
    cookieArray[i] = Math.round(custArray[i] * avgCookies);
  }

  return cookieArray;
}

function displaySales(storeLocation, cookieArray){

  var salesDivEl = document.getElementById('sales');
  var salesUlEl = document.createElement('ul');
  var locationH2El = document.createElement('h2');

  locationH2El.textContent = storeLocation;

  salesDivEl.appendChild(locationH2El);
  salesDivEl.appendChild(salesUlEl);

  for(var i = 0; i < cookieArray.length; i++){
    var currentHour = i + 6;
    var timeString = calcTime(currentHour);

    var salesLiEl = document.createElement('li');
    salesLiEl.textContent = timeString + cookieArray[i] + ' cookies';
    salesUlEl.appendChild(salesLiEl);
  }
}

//Take in the military time and convert it to a standard string
function calcTime(hour){
  var am = true;
  if (hour === 12){
    am = false;
  }else if (hour > 12){
    am = false;
    hour -= 12;
  }

  var timeString; 

  if(am){
    timeString = hour + ' am: ';
  }else if(!am){
    timeString = hour + ' pm: ';
  }

  return timeString;
  
}
