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

var seaTac = {
  locationName: 'SeaTac Airport',
  minCust: 3,
  maxCust: 24,
  avgCookie: 1.2,
  custPerHour: [],
  cookiesPerHour: [],
  totalCookies: 0
};

var seaCenter = {
  locationName: 'Seattle Center',
  minCust: 11,
  maxCust: 38,
  avgCookie: 3.7,
  custPerHour: [],
  cookiesPerHour: [],
  totalCookies: 0
};

var capHill = {
  locationName: 'Capitol Hill',
  minCust: 20,
  maxCust: 38,
  avgCookie: 2.3,
  custPerHour: [],
  cookiesPerHour: [],
  totalCookies: 0
};

var alki = {
  locationName: 'Alki',
  minCust: 2,
  maxCust: 16,
  avgCookie: 4.6,
  custPerHour: [],
  cookiesPerHour: [],
  totalCookies: 0
};

pike.custPerHour = custPerHour(pike.minCust, pike.maxCust);
pike.cookiesPerHour = cookiesPerHour(pike.custPerHour, pike.avgCookie);
pike.totalCookies = totalCookies(pike.cookiesPerHour);
displaySales(pike.locationName, pike.cookiesPerHour, pike.totalCookies);

seaTac.custPerHour = custPerHour(seaTac.minCust, seaTac.maxCust);
seaTac.cookiesPerHour = cookiesPerHour(seaTac.custPerHour, seaTac.avgCookie);
seaTac.totalCookies = totalCookies(seaTac.cookiesPerHour);
displaySales(seaTac.locationName, seaTac.cookiesPerHour, seaTac.totalCookies);

seaCenter.custPerHour = custPerHour(seaCenter.minCust, seaCenter.maxCust);
seaCenter.cookiesPerHour = cookiesPerHour(seaCenter.custPerHour, seaCenter.avgCookie);
seaCenter.totalCookies = totalCookies(seaCenter.cookiesPerHour);
displaySales(seaCenter.locationName, seaCenter.cookiesPerHour, seaCenter.totalCookies);

capHill.custPerHour = custPerHour(capHill.minCust, capHill.maxCust);
capHill.cookiesPerHour = cookiesPerHour(capHill.custPerHour, capHill.avgCookie);
capHill.totalCookies = totalCookies(capHill.cookiesPerHour);
displaySales(capHill.locationName, capHill.cookiesPerHour, capHill.totalCookies);

alki.custPerHour = custPerHour(alki.minCust, alki.maxCust);
alki.cookiesPerHour = cookiesPerHour(alki.custPerHour, alki.avgCookie);
alki.totalCookies = totalCookies(alki.cookiesPerHour);
displaySales(alki.locationName, alki.cookiesPerHour, alki.totalCookies);

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

function totalCookies(cookieArray){
  var totalCookies = 0;

  for(var i=0; i<cookieArray.length; i++){
    totalCookies += cookieArray[i];
  }

  return totalCookies;
}

function displaySales(storeLocation, cookieArray, totalCookies){

  //Wrapped each store in own dive for proper column wrapping
  //Used this to figure out how to add class name: https://www.w3schools.com/jsref/prop_html_classname.asp 
  var salesDivEl = document.getElementById('sales');
  var storeDivEl = document.createElement('div');
  var salesUlEl = document.createElement('ul');
  var locationH2El = document.createElement('h2');

  locationH2El.textContent = storeLocation;
  storeDivEl.className = 'storeItem';

  salesDivEl.appendChild(storeDivEl);
  storeDivEl.appendChild(locationH2El);
  storeDivEl.appendChild(salesUlEl);

  for(var i = 0; i < cookieArray.length; i++){
    var currentHour = i + 6;
    var timeString = calcTime(currentHour);

    var salesLiEl = document.createElement('li');
    salesLiEl.textContent = timeString + cookieArray[i] + ' cookies';
    salesUlEl.appendChild(salesLiEl);
  }

  var totalLiEl = document.createElement('li');
  totalLiEl.textContent = 'Total: ' + totalCookies + ' cookies';
  salesUlEl.appendChild(totalLiEl);
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
