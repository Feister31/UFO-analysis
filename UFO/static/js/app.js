// import the data from data.js
const tableData = data;
// Reference the HTML table using d3
var tbody = d3.select("tbody");
function buildTable(data) {
// first, clear out any existing data
    tbody.html("");

//next, loop through each object in the data
// and apppend a row and cells for each value in the row
data.forEach((dataRow) => {
    //append row to the table body
    let row = tbody.append("tr");
    // loop through each field in the dataRow and add 
    // each value as a table cell(td)
    Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
    );   
 });
}
// keep track of all the filters
var filters = {};



function updateFilters(){
    //save the elements , values and id of the filter that was changed
    var changeElement = d3.select(this)//.select("input")
    var elementValue = changeElement.property("value");
    var filterId = changeElement.attr("id");
    console.log(elementValue)
    console.log(filters)
    // If a filter value was entered then add that filtered and value
    //to the filters list. Otherwise clear the data

    if(elementValue){
        filters[filterId] = elementValue;
    }
    else {
        delete filters[filterId];
    }
    // call function to apply all filter and rebuild table 
    // to do create a filtertalbe function
    filterTable()
}

// // d3.selectAll(".filter").on("change", updateFilters);
// function handleClick(){
//     // grab the datetime value from the filter
//     let date = d3.select("#datetime").property("value");
//     let filteredData = tableData;
//     //check to see if a  date was entered and filter the
//     //date using that date.
// if (date){
//     // apply 'filter to the table data to onlly keep the
//     // rows where the ' datetime' value matches the filter value
//     filteredData = filteredData.filter(row => row.datetime === date);
// };
//     //Rebuild the talbe using the filtered date 
//     //@note if nodate was entered, the filterDate will
//     // just be the original tableData.
//     buildTable(filteredData)
// };

function filterTable(){
    // set the filteredDate to tableData
    let filteredData = tableData;
    // Loop thought all of the filters and keep any data that matches the filter values
    Object.entries(filters).forEach(([key,value])=>{
        filteredData = filteredData.filter(row=> row[key] === value);
    })

    buildTable(filteredData);
}
// Attach an event to listen for the form button
d3.selectAll("input").on("change", updateFilters);


// Build the table when the page loads
buildTable(tableData);









