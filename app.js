
//          
//  initialize graph
    function init(){
        d3.json("samples.json").then(function(data){

        var user_id = data.samples.map(row => row.id);
        var sample_values = data.samples.map(row => row.sample_values);
        var otu_ids = data.samples.map(row => row.otu_ids);
        var otu_labels = data.samples.map(row => row.otu_labels);
    

        // Call update ID list function
        updateIDList(user_id)
        
        // Get top 10 Sample Values and OTU IDs
        var top10_vals = sample_values[0].sort((a,b) => b-a);
        var top10_otu_IDs = otu_ids[0].sort((a,b) => b-a);
        var top10_otu_labels = otu_labels[0].sort((a,b) => b-a);


    //Create the trace
        var otuString = "OTU ";
        var topStringOTUIDS = top10_otu_IDs.slice(0,10).map(function (item) {
            return otuString.concat(item.toString());
        });
        console.log(topStringOTUIDS)
        var trace1 = {
            type: "bar",
            orientation: "h",
            name: "placeholder",
            // x: topStringOTUIDS,      //top10_otu_IDs.slice(0,10),
            // y: top10_vals.slice(0,10),
            x: top10_vals.slice(0,10),
            y: topStringOTUIDS,
            text: topStringOTUIDS
            // transforms:[{
            //     type: "groupby",
            //     groups: otu_ids[0].slice(0,10)
            // }]
        }

        var data = [trace1];
        var layout = {title: "Top 10 OTU IDs for Subject: ",
                        xAxis: {title: "OTU ID"},
                        yAxis: {title: "Sample Value"}
                    };

    // restyle new x and y here
    Plotly.newPlot("bar", data, layout)
    
    });
};
    init()

function dropDownMenu() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the input value from the form
    // var dropDown = d3.select("#selDataset");
    // var dataset = dropDown.property("value");

    var test_subject = d3.select("#selDataset").on("change", updatePlotly)
    
    // Build the plot with the new user ID
    updatePlotly(test_subject);
}

function updateIDList(subjectIDs) {
    d3.select("#selDataset").selectAll("option").remove();  //remove existing option
    d3.select('#ID').append("option").text("empty");        
    subjectIDs.forEach(function (id) {
        var row = d3.select("#selDataset");
        row.append("option").text(id);
    })
}

function optionChanged(input){
    // remove initialized graph
    // d3.select("#bar").remove()
    
    // run promise
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        
        // for demographics, go to data.metadata

        // Filter the data for the object with the desired sample number
        var resultArray = samples.filter(sampleObj => sampleObj.id == input);

        // Map the data from the samples array
        var user_id = resultArray.map(row => row.id);
        var sample_values = resultArray.map(row => row.sample_values);
        var otu_ids = resultArray.map(row => row.otu_ids);
        var otu_labels = resultArray.map(row => row.otu_labels);
        
        // Get top 10 Sample Values and OTU IDs
        var top10_vals = sample_values[0].sort((a,b) => b-a);
        var top10_otu_IDs = otu_ids[0].sort((a,b) => b-a);
        var top10_otu_labels = otu_labels[0].sort((a,b) => b-a);


        //Create the trace
        var otuString = "OTU ";
        var topStringOTUIDS = top10_otu_IDs.slice(0,10).map(function (item) {
            return otuString.concat(item.toString());
        });
        console.log(topStringOTUIDS)
        var trace1 = {
            type: "bar",
            orientation: "h",
            name: "placeholder",
            // x: topStringOTUIDS,      //top10_otu_IDs.slice(0,10),
            // y: top10_vals.slice(0,10),
            x: top10_vals.slice(0,10),
            y: topStringOTUIDS,
            text: topStringOTUIDS
            // transforms:[{
            //     type: "groupby",
            //     groups: otu_ids[0].slice(0,10)
            // }]
    
            
        }

        
 

    var data = [trace1];
    var layout = {title: "Top 10 OTU IDs for Subject: ",
                    xAxis: {title: "OTU ID"},
                    yAxis: {title: "Sample Value"}
                };
    
    Plotly.newPlot("bar", data, layout)
        })
};

// d3.json("samples.json").then(function(data){

//     var user_id = data.samples.map(row => row.id);
//     var sample_values = data.samples.map(row => row.sample_values);
//     var otu_ids = data.samples.map(row => row.otu_ids);
//     var otu_labels = data.samples.map(row => row.otu_labels);
   

//     // Call update ID list function
//     updateIDList(user_id)
    
//     // Get top 10 Sample Values and OTU IDs
//     var top10_vals = sample_values[0].sort((a,b) => b-a);
//     var top10_otu_IDs = otu_ids[0].sort((a,b) => b-a);
//     var top10_otu_labels = otu_labels[0].sort((a,b) => b-a);


// //Create the trace
//     var otuString = "OTU ";
//     var topStringOTUIDS = top10_otu_IDs.slice(0,10).map(function (item) {
//         return otuString.concat(item.toString());
//     });
//     console.log(topStringOTUIDS)
//     var trace1 = {
//         type: "bar",
//         orientation: "h",
//         name: "placeholder",
//         // x: topStringOTUIDS,      //top10_otu_IDs.slice(0,10),
//         // y: top10_vals.slice(0,10),
//         x: top10_vals.slice(0,10),
//         y: topStringOTUIDS,
//         text: topStringOTUIDS
//         // transforms:[{
//         //     type: "groupby",
//         //     groups: otu_ids[0].slice(0,10)
//         // }]
//     }

        
 

//     var data = [trace1];
//     var layout = {title: "Top 10 OTU IDs for Subject: ",
//                     xAxis: {title: "OTU ID"},
//                     yAxis: {title: "Sample Value"}
//                 };
    


//    // restyle new x and y here
//    Plotly.newPlot("bar", data, layout)
 
// });
   





// var names = samples.names
// console.log(names)