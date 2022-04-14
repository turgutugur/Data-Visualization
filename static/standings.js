// read the data and load the seasons to the console 
d3.json("/teamsstats").then(data =>{
    console.log(data);
})


d3.json("/teamsstats").then(data =>{
    console.log(data);
    var option = [];
    for(i = 0; i < data.length; i++) {
        option.push(data[i].season);
    
    }
    
    for (var i = 0; i < option.length; i++) {
        d3.select("#selDataset").append("option").text(option[i]).property("value", i);
    }
})

// getting the data of east & west standings and the create tables
optionChanged(0);

function optionChanged(season) {
    d3.json("/teamsstats").then(data => {
    console.log(data[season].data.weststandings);
    console.log(data[season].data.eaststandings);

    // creating 2 different tables with east & west standings and a dropdown
    var tbody = d3.select("#eaststandings");
    tbody.html("");
    for (object in data[season].data.eaststandings) {
        console.log(object);
        
        tbody.append("tr").html(function (item) {
            return `<td><img src=${data[season].data.eaststandings[object].logo} width="43"></td>
                    <td>${object}</td>
                    <td>${data[season].data.eaststandings[object].wins}</td>
                    <td>${data[season].data.eaststandings[object].losses}</td> 
                    `
        })
    }

    var tbody = d3.select("#weststandings");
    tbody.html("");
    for (object in data[season].data.weststandings) {
        console.log(object);
        
        tbody.append("tr").html(function (item) {
            return `<td><img src=${data[season].data.weststandings[object].logo} width="50"></td>
                    <td>${object}</td>
                    <td>${data[season].data.weststandings[object].wins}</td>
                    <td>${data[season].data.weststandings[object].losses}</td>
                    `
        })
    }
})
}
