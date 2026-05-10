    //Declare consts/global variables
        const margin = 50;
        const width = 500; 
        const height = 500;


    //Load data and related variables
        d3.csv("Seattle_Graffiti_DailySummaryclean.csv").then(data => {
            console.log("data", data)
        //format data
        data.forEach(d => { 
            d.Year = d.Year;
            d.Requests = +d.Requests; 
        });
        
        const maxY = d3.max(data, d => d.Requests);


    //Scales - note: band and linear
        const xScale = d3.scaleBand()
                        .domain(data.map(d => d.Year))
                        .range([margin, width - margin])
                        .paddingInner(.02);
        
        const yScale = d3.scaleLinear()
                        .domain([0, maxY]) 
                        .range([height - margin, margin]);
        

    //SVG
        const svg = d3.select("body")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

                    
    //Axes - create axes
        const bottomAxis = d3.axisBottom()
                             .scale(xScale);
        
        const leftAxis = d3.axisLeft()
                           .scale(yScale);
        

    //Bars
    //rect needs x, y, width, and height
        svg.selectAll("rect") 
            .data(data) 
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.Year)) 
            .attr("y", d => yScale(d.Requests)) 
            .attr("width", xScale.bandwidth()) // note this is specific to using the bandscale as the scale calculates padding
            .attr("height", d => (height-margin) - yScale(d.Requests))
            .attr("fill", "magenta");
        

    //Axes - call axes
        svg.append("g")
            .attr("transform", "translate(0," + (height - margin) + ")") 
            .call(bottomAxis);

        svg.append("g")
            .attr("transform", "translate(" + margin + ",0)")
            .call(leftAxis); 

                
    });