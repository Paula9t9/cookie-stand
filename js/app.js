//Number of hours the shop is open.
var hours = 15;
var allStores = [];


// pike.custEachHour = calcCustEachHour(pike.minCustPerHour, pike.maxCustPerHour);
// pike.cookiesEachHour = calcCookiesEachHour(pike.custEachHour, pike.avgCookiePerCust);
// pike.totalCookiesForDay = calcTotalCookies(pike.cookiesEachHour);
// displaySales(pike.locationName, pike.cookiesEachHour, pike.totalCookiesForDay);



//Renamed vars according to demo so naming is clearer
function Store(locationName, minCustPerHour, maxCustPerHour, avgCookiePerCust){

  this.locationName = locationName;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiePerCust = avgCookiePerCust;
  this.custEachHour = [];
  this.cookiesEachHour = [];
  this.totalCookiesForDay = 0;
  allStores.push(this);
}


var pike = new Store('1st and Pike', 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 3, 24, 1.2);
var seaCenter = new Store('Seattle Center', 11, 38, 3.7);
var capHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);

console.table(allStores);




Store.prototype.calcCustEachHour = function(){


  for(var i=0; i < hours; i++){
    var customers = Math.round(Math.random() * (this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
    this.custEachHour.push(customers);
  }

};


Store.prototype.calcCookiesEachHour = function(){

  for (var i=0; i < this.custEachHour.length; i++){
    var cookies = Math.ceil(this.custEachHour[i] * this.avgCookiePerCust);
    this.cookiesEachHour.push(cookies);
  }

};


Store.prototype.calcTotalCookies = function(){

  for(var i=0; i < this.cookiesEachHour.length; i++){
    this.totalCookiesForDay += this.cookiesEachHour[i];
  }

};


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

pike.calcCustEachHour();
pike.calcCookiesEachHour();
pike.calcTotalCookies();
