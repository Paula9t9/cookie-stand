//Number of hours the shop is open.
var hours = 15;
var allStores = [];
var salesTable = document.getElementById('sales');


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


Store.prototype.render = function(){
  var trEl = document.createElement('tr');

  var tdEl = document.createElement('td');
  tdEl.textContent = this.locationName;
  trEl.appendChild(tdEl);

  tdEl = document.createElement('td');
  tdEl.textContent = this.minCustPerHour;
  trEl.appendChild(tdEl);

  tdEl = document.createElement('td');
  tdEl.textContent = this.maxCustPerHour;
  trEl.appendChild(tdEl);

  for(var i = 0; i < this.cookiesEachHour.length; i++){

    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesEachHour[i];
    trEl.appendChild(tdEl);

  }

  tdEl = document.createElement('td');
  tdEl.textContent = this.totalCookiesForDay;
  trEl.appendChild(tdEl);

  salesTable.appendChild(trEl);
};

function makeHeaderRow(){

  var trEl = document.createElement('tr');

  var thEl = document.createElement('th');
  thEl.textContent = 'Location ';
  trEl.appendChild(thEl);

  thEl = document.createElement('th');
  thEl.textContent = 'Min Customers/Hr ';
  trEl.appendChild(thEl);

  thEl = document.createElement('th');
  thEl.textContent = 'Max Customers/Hr ';
  trEl.appendChild(thEl);

  for(var i = 0; i < hours; i++){
    var currentHour = i + 6;
    var hourString = calcTime(currentHour);

    thEl = document.createElement('th');
    thEl.textContent = hourString;
    trEl.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = 'Daily Location Total';
  trEl.appendChild(thEl);

  salesTable.appendChild(trEl);

}



function makeFooterRow(){

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
    timeString = hour + ' am ';
  }else if(!am){
    timeString = hour + ' pm ';
  }

  return timeString;
}

pike.calcCustEachHour();
pike.calcCookiesEachHour();
pike.calcTotalCookies();
makeHeaderRow();
pike.render();
