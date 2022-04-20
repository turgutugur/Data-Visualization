// set initial choices as global variables
var season = "2020";
var numPlayers = 10;

// read data and populate list of seasons
d3.json("/player_data").then(data =>{

    // extract season years into array
    var options = [];
    for(var key in data[0]) {
        options.push(key)   
    }
    
    // loop through array in reverse to get most recent years on top
    for (var i = options.length - 2; i >= 0; i--) {
        select.append("option").text(options[i]);
    }    
})
var select = d3.select("#selDataset");

// populate bubble chart with default selection
bubbleChart(season, numPlayers);

// create list of options for number of players
var numSelect = d3.select("#selNumber");
var numOptions = [10, 20, 30, 40, 50];

for (var i = 0; i < numOptions.length; i++) {
    numSelect.append("option").text(numOptions[i]);
}

// bubble chart function
function bubbleChart(season, numPlayers)
{
    d3.json("player_data").then((data) =>{
        // extract data for season chosen
        var result = data[0][season];

        // convert to array that can be sorted 
        let sortable = [];
        for (var player in result) {
            sortable.push([player, result[player]]);
        }

        // sort by points in descending order
        sortable.sort((a, b) => {
            return b[1].pts - a[1].pts;
        }); 

        // get top n players
        topPlayers = sortable.slice(0, numPlayers);

        // console.log(topPlayers);

        // create lists holding player data
        var points = [];
        var assists = [];
        var accuracy = [];
        var info = [];
        var sizes = [];

        for (var i = 0; i < numPlayers; i++) {
            player = topPlayers[i];
            points.push(player[1].pts);
            assists.push(player[1].ast);

            let acc = player[1].fgm/(player[1].fga);
            acc = Math.round(acc*100);
            accuracy.push(acc);

            let inf = `<b>${player[1].first_name} ${player[1].last_name}</b><br>Accuracy: ${acc}%<br>Games Played: ${player[1].games}`;
            info.push(inf);

            sizes.push(player[1].pts + 2*player[1].ast);
        };

        // chart parameters
        let params = {
            y: points,
            x: assists,
            text: info,
            mode: "markers",
            marker: {
                size: sizes,
                sizemode: 'diameter',
                sizeref: 50,
                color: accuracy,
                colorscale: "Thermal"
            }
        }

        let layout = {
            title: "<b>Top Players Performance",
            hovermode: "closest",
            xaxis: {title: "<b>Assists</b>"},
            yaxis: {title: "<b>Points</b>"}
        }

        Plotly.newPlot("bubble", [params], layout);
    });
}

// update chart if new season is selected
function seasonChanged(item)
{
    season = item;
    bubbleChart(season, numPlayers);
}

// update chart if number of players is changed
function numChanged(item)
{
    numPlayers = item;
    bubbleChart(season, numPlayers);
}