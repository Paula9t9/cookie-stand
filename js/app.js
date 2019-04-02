//Number of hours the shop is open.
var hours = 15;

//Renamed vars according to demo so naming is clearer
var pike = {
  locationName: '1st and Pike',
  minCustPerHour: 23,
  maxCustPerHour: 65,
  avgCookiePerCust: 6.3,
  custEachHour: [],
  cookiesEachHour: [],
  totalCookiesForDay: 0
};

var seaTac = {
  locationName: 'SeaTac Airport',
  minCustPerHour: 3,
  maxCustPerHour: 24,
  avgCookie: 1.2,
  custEachHour: [],
  cookiesEachHour: [],
  totalCookies: 0
};

var seaCenter = {
  locationName: 'Seattle Center',
  minCustPerHour: 11,
  maxCustPerHour: 38,
  avgCookie: 3.7,
  custEachHour: [],
  cookiesEachHour: [],
  totalCookies: 0
};

var capHill = {
  locationName: 'Capitol Hill',
  minCust: 20,
  maxCust: 38,
  avgCookie: 2.3,
  custEachHour: [],
  cookiesEachHour: [],
  totalCookies: 0
};

var alki = {
  locationName: 'Alki',
  minCust: 2,
  maxCust: 16,
  avgCookie: 4.6,
  custEachHour: [],
  cookiesEachHour: [],
  totalCookies: 0
};


pike.custEachHour = calcCustEachHour(pike.minCustPerHour, pike.maxCustPerHour);
pike.cookiesEachHour = calcCookiesEachHour(pike.custEachHour, pike.avgCookiePerCust);
pike.totalCookiesForDay = calcTotalCookies(pike.cookiesEachHour);
displaySales(pike.locationName, pike.cookiesEachHour, pike.totalCookiesForDay);

seaTac.custEachHour = calcCustEachHour(seaTac.minCustPerHour, seaTac.maxCustPerHour);
seaTac.cookiesEachHour = calcCookiesEachHour(seaTac.custEachHour, seaTac.avgCookie);
seaTac.totalCookies = calcTotalCookies(seaTac.cookiesEachHour);
displaySales(seaTac.locationName, seaTac.cookiesEachHour, seaTac.totalCookies);

seaCenter.custEachHour = calcCustEachHour(seaCenter.minCustPerHour, seaCenter.maxCustPerHour);
seaCenter.cookiesEachHour = calcCookiesEachHour(seaCenter.custEachHour, seaCenter.avgCookie);
seaCenter.totalCookies = calcTotalCookies(seaCenter.cookiesEachHour);
displaySales(seaCenter.locationName, seaCenter.cookiesEachHour, seaCenter.totalCookies);

capHill.custEachHour = calcCustEachHour(capHill.minCust, capHill.maxCust);
capHill.cookiesEachHour = calcCookiesEachHour(capHill.custEachHour, capHill.avgCookie);
capHill.totalCookies = calcTotalCookies(capHill.cookiesEachHour);
displaySales(capHill.locationName, capHill.cookiesEachHour, capHill.totalCookies);

alki.custEachHour = calcCustEachHour(alki.minCust, alki.maxCust);
alki.cookiesEachHour = calcCookiesEachHour(alki.custEachHour, alki.avgCookie);
alki.totalCookies = calcTotalCookies(alki.cookiesEachHour);
displaySales(alki.locationName, alki.cookiesEachHour, alki.totalCookies);


function calcCustEachHour(min, max){
  var custArray = [];

  for(var i=0; i < hours; i++){
    custArray[i] = Math.round(Math.random() * (max - min) + min);
  }

  return custArray;
}


function calcCookiesEachHour(custArray, avgCookies){

  var cookieArray = [];

  for (var i=0; i < custArray.length; i++){
    cookieArray[i] = Math.ceil(custArray[i] * avgCookies);
  }

  return cookieArray;
}


function calcTotalCookies(cookieArray){
  var totalCookies = 0;

  for(var i=0; i < cookieArray.length; i++){
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
    //Add 6 because store opens at 6am
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


//Take in the military time* and converts it to a standard string
//*takes an int, not an actual time var
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
