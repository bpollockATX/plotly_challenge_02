
//////////////////////////////////////////////////////////////////////
// BEGINNING OF INIT() GRAPH
/////////////////////////////////////////////////////////////////////

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

       sliced_top10_otu_labels = top10_otu_labels.slice(0,10).toString().split(",")



        //Create the trace
        var otuString = "OTU ";
        var topStringOTUIDS = top10_otu_IDs.slice(0,10).map(function (item) {
            return otuString.concat(item.toString());
        });
        var trace1 = {
            type: "bar",
            orientation: "h",
            name: "placeholder",

            x: top10_vals.slice(0,10),
            y: topStringOTUIDS,
            text: topStringOTUIDS + sliced_top10_otu_labels

        }

        var data = [trace1];
        var layout = {title: "Top 10 OTU IDs ",
                        xAxis: {title: "OTU ID"},
                        yAxis: {title: "Sample Value"}
                    };

    // Plot init
    Plotly.newPlot("bar", data, layout)
    
    });
};

// Call init
init()

//////////////////////////////////////////////////////////////////////
// END OF INIT() GRAPH
/////////////////////////////////////////////////////////////////////


// Create Dropdown function
function dropDownMenu() {
    // Prevent the page from refreshing
    d3.event.preventDefault();


    // Create Listener
    var test_subject = d3.select("#selDataset").on("change", updatePlotly)
    
    // Build the plot with the new user ID
    updatePlotly(test_subject);
}

// Update the ID List
function updateIDList(subjectIDs) {
    d3.select("#selDataset").selectAll("option").remove();  //remove existing option
    d3.select('#ID').append("option").text("empty");        
    subjectIDs.forEach(function (id) {
        var row = d3.select("#selDataset");
        row.append("option").text(id);
    })
}

// Clear Module Data
function clearModule(){
    d3.select("#sample-metadata").selectAll("div").text("");    
}



// Fetch Data
function optionChanged(input){
    
    clearModule();

    // run promise
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
            
        
        // Filter the data for the object with the desired sample number
        var resultArray = samples.filter(sampleObj => sampleObj.id == input);

        // Map the data from the samples array
        var user_id = resultArray.map(row => row.id);
        var sample_values = resultArray.map(row => row.sample_values);
        var otu_ids = resultArray.map(row => row.otu_ids);
        var otu_labels = resultArray.map(row => row.otu_labels);
        
        // Order the arrays to Get Sample Values and OTU IDs
        var top10_vals = sample_values[0].sort((a,b) => b-a);
        var top10_otu_IDs = otu_ids[0].sort((a,b) => b-a);
        var top10_otu_labels = otu_labels[0].sort((a,b) => b-a);


        // Filter metadata for the demographic info
        var demoArray = data.metadata.filter(demoSampleObj => demoSampleObj.id == input);

        // Map the demographic data
        var id = demoArray.map(row => row.id);
        var age = demoArray.map(row => row.age);
        var bbtype = demoArray.map(row => row.bbtype);
        var ethnicity = demoArray.map(row => row.ethnicity);
        var gender = demoArray.map(row => row.gender);
        var location = demoArray.map(row => row.location);
        var wfreq = demoArray.map(row => row.wfreq);

        // Update demographic module
        var module = d3.select("#sample-metadata")
        var row = module.append("div");
        row.append("div").text( `ID: ${id}`).toString();
        row.append("div").text( `Age: ${age}`).toString();
        row.append("div").text( `Belly button type: ${bbtype}`).toString();
        row.append("div").text( `Ethnicity: ${ethnicity}`).toString();
        row.append("div").text( `Gender: ${gender}`).toString();
        row.append("div").text( `Location: ${location}`).toString();
        row.append("div").text( `WFreq: ${wfreq}`).toString();

        
        //Create the bar trace
        var otuString = "OTU ";
        var topStringOTUIDS = top10_otu_IDs.slice(0,10).map(function (item) {
            return otuString.concat(item.toString());
        });
        
        var trace1 = {
            type: "bar",
            orientation: "h",
            name: "placeholder",
            x: top10_vals.slice(0,10),
            y: topStringOTUIDS,
            text: topStringOTUIDS + sliced_top10_otu_labels
        }

        var data = [trace1];
        var layout = {title: "Top 10 OTU IDs",
                        xAxis: {title: "OTU ID"},
                        yAxis: {title: "Sample Value"}
                    };
 
        // Create the bubble trace
        var trace2 = {
            // type: "bubble",
            x: otu_ids,
            y: sample_values,
            // name: "placeholder",
            mode: "markers",
            marker: {
                size: sample_values
            }
        }
        console.log(otu_ids)
        console.log(sample_values)
       
        var data2 = [trace2];
        var layout2 = {title: "Top 10 OTU IDs",
                        showlegend: false,
                        height: 600,
                        width: 600,
                        // yAxis: {title: "Sample Value"}
                    };
          
    Plotly.newPlot("bar", data, layout)
    Plotly.newPlot("bubble", data2, layout2)
        })
};

