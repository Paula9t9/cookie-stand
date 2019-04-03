//Number of hours the shop is open.
var hours = 15;
var allStores = [];
var hourlyTotalCookies = [];
var totalDayCookies = 0;
var locationForm = document.getElementById('location-form');
var salesTable = document.getElementById('sales');
var tableBody = document.createElement('tbody');


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


new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);


//Calculates the number of customers every hour for a single location
Store.prototype.calcCustEachHour = function(){

  for(var i=0; i < hours; i++){
    var customers = Math.round(Math.random() * (this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
    this.custEachHour[i] = customers;
  }

};


//Calculates the cookies each hour for a single location
Store.prototype.calcCookiesEachHour = function(){

  for (var i=0; i < this.custEachHour.length; i++){
    var cookies = Math.ceil(this.custEachHour[i] * this.avgCookiePerCust);
    this.cookiesEachHour[i] = cookies;
  }

};


//Calculates the total cookies for a single location
Store.prototype.calcTotalCookies = function(){

  for(var i=0; i < this.cookiesEachHour.length; i++){
    this.totalCookiesForDay += this.cookiesEachHour[i];
  }

};


//Renders a single location to the DOM
Store.prototype.render = function(){
  //Initialize row
  var trEl = document.createElement('tr');

  //Create row title
  var tdEl = document.createElement('td');
  tdEl.textContent = this.locationName;
  trEl.appendChild(tdEl);

  //Add all data for the location
  for(var i = 0; i < this.cookiesEachHour.length; i++){

    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesEachHour[i];
    trEl.appendChild(tdEl);

  }

  //Add the total to the end of the row
  tdEl = document.createElement('td');
  tdEl.textContent = this.totalCookiesForDay;
  trEl.appendChild(tdEl);

  //Append the new row to the table body
  tableBody.appendChild(trEl);
};


//Makes the header for the projected sales table body
function makeHeaderRow(){
  //Initialize the header row
  var tHeadEl = document.createElement('thead');
  var trEl = document.createElement('tr');

  //Add the first header element and leave it blank to match planned layout
  var thEl = document.createElement('th');
  thEl.textContent = '';
  trEl.appendChild(thEl);

  //Add the times for the row
  for(var i = 0; i < hours; i++){
    var currentHour = i + 6;
    var hourString = calcTime(currentHour);

    thEl = document.createElement('th');
    thEl.textContent = hourString;
    trEl.appendChild(thEl);
  }

  //Add the Total Title Element
  thEl = document.createElement('th');
  thEl.textContent = 'Daily Location Total';
  trEl.appendChild(thEl);

  //Append the row to the table header
  tHeadEl.appendChild(trEl);
  salesTable.appendChild(tHeadEl);

}


//Renders the data from all stores to the table body
function renderAllStores(){
  salesTable.appendChild(tableBody);
  for(var i = 0; i < allStores.length; i++){
    allStores[i].render();
  }
}


//Renders the footer for the projected sales table
function makeFooterRow(){
  //Initialize table foot element and row element
  var tfootEl = document.createElement('tfoot');
  var trEl = document.createElement('tr');

  //Add row title, "Totals: "
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Totals: ';
  trEl.appendChild(tdEl);

  //Populate row with data
  for (var i=0; i < hourlyTotalCookies.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = hourlyTotalCookies[i];
    trEl.appendChild(tdEl);

  }

  //Put day's complete total at the end
  tdEl = document.createElement('td');
  tdEl.textContent = totalDayCookies;
  trEl.appendChild(tdEl);

  //Append the row to the footer
  tfootEl.appendChild(trEl);
  salesTable.appendChild(tfootEl);
}


//Calculates the customers for all stores
function calcAllCustomers(){
  for(var i = 0; i < allStores.length; i++){
    allStores[i].calcCustEachHour();
  }
}


//Calculates the cookies for each hour for each location
function calcAllHourlyCookies(){
  for(var i = 0; i < allStores.length; i++){
    allStores[i].calcCookiesEachHour();
  }
}


//Calculates the total daily cookies for each location
function calcAllTotalDailyCookies(){
  for(var i = 0; i < allStores.length; i++){
    allStores[i].calcTotalCookies();
  }
}


//Calculate the total cookies per hour across all locations
function calcTotalHourlyCookies(){

  for (var i = 0; i < hours; i++){
    var thisHourTotal = 0;
    for (var v = 0; v < allStores.length; v++){
      thisHourTotal += allStores[v].cookiesEachHour[i];
    }
    hourlyTotalCookies[i] = thisHourTotal;
  }
}


//Calculate the total cookies or the day across all hours and all locations
function calcTotalDayCookies(){
  for (var i = 0; i < hourlyTotalCookies.length; i++){
    totalDayCookies += hourlyTotalCookies[i];
  }
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

//Runs all the necessary functions to calculate values for Stores and render all stores.
function calcAndRenderAllStores(){
  salesTable.innerHTML = '';
  tableBody.innerHTML = '';
  calcAllCustomers();
  calcAllHourlyCookies();
  calcAllTotalDailyCookies();
  calcTotalHourlyCookies();
  calcTotalDayCookies();
  makeHeaderRow();
  renderAllStores();
  makeFooterRow();
  console.log(allStores);
}

function handleLocationSubmit(e){
  //Prevent page from refreshing because we don't have persistence
  event.preventDefault();

  //Take in values
  var locationName = e.target.locationName.value;
  var minCookies = e.target.minCookies.value;
  var maxCookies = e.target.maxCookies.value;
  var avgCookies = e.target.avgCookies.value;

  //Create a new Store with values
  new Store(locationName, minCookies, maxCookies,avgCookies);


  //render all Stores
  calcAndRenderAllStores();
}

calcAndRenderAllStores();


locationForm.addEventListener('submit', handleLocationSubmit);
