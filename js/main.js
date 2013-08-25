require(['./vendor/d3.v3'], function () {
    
	var fieldIterations = document.getElementById('iterations');
	var btnOK = document.getElementById('btnOK');
	btnOK.addEventListener('click', simulate);
	
	function simulate() {
		var iterations = fieldIterations.value;
		
		console.log(iterations);

    	var margin = {top: 20, right: 20, bottom: 30, left: 50},
    	    width = 960 - margin.left - margin.right,
    	    height = 500 - margin.top - margin.bottom;

        var parseDate = d3.time.format("%d-%b-%y").parse;
        
        var x = d3.time.scale()
            .range([0, width]);
        
        var y = d3.scale.linear()
            .range([height, 0]);
        
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
        
        var line = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        for (var i = 0; i < 10; i++) {
            var d = {
                date: '1-May-12',
                close: 582.13
            };
            
            d.date = parseDate(d.date);
            d.close = +d.close;

            x.domain(d3.extent(d, function(d) { return d.date; }));
            y.domain(d3.extent(d, function(d) { return d.close; }));
            
            svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);
            
            svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Price ($)");
            
            svg.append("path")
              .datum(d)
              .attr("class", "line")
              .attr("d", line);
        }
	}

});
