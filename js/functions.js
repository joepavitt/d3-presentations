var slide = 0;
var pSlide = null;
var slides = 50;

var colors = {
	aqua: "rgb(0,118,112)",
	blue: "rgb(0,26,53)",
	darkblue: "rgb(37, 68, 101)",
	grey: "rgb(81, 81, 81)"
};

var perSecond;

function updatePresentation(to_slide, durationLength) {
	setHash(to_slide);
	switch (to_slide) {
	case 0:
		document.getElementById("background").innerHTML = "";
		document.getElementById("content").innerHTML = "";

		var background = d3.select("#background");
		var background = d3.select("#background");

		background.append("polygon")
			.attr("points", "0,0 1024,0 0,70")
			.attr("class", "presTriangle");

		background.append("polygon")
			.attr("points", "1025,768 0,768 1025,698")
			.attr("class", "presTriangle");

		background.append("text")
			.attr("x", "512").attr("y", "354")
			.attr("class", "dwdHeader")
			.attr("id", "slideTitle")
			.text("Designing with Data");

		var footer = background.append("g")
			.attr("class", "dwdFooter");

		footer.append("text")
			.attr("x", "512").attr("y", "404")
			.attr("id", "slideUserName")
			.text("Joe Pavitt");

		footer.append("text")
			.attr("x", "512").attr("y", "442")
			.attr("id", "slideUserTitle")
			.text("UI Designer & Developer, Emerging Technologies");
		break;
	case 1:
		d3.select("#slideTitle")
			.transition().duration(durationLength)
			.attr("x", 152)
			.attr("y", 37)
			.style("font-size", 28)
			.style("fill", "white")
			.each("end", function () {
				d3.select("#slideTitle")
					.attr("x", 10)
					.style("text-anchor", "start");
			});

		d3.select("#slideUserName")
			.transition().duration(durationLength)
			.attr("x", 968)
			.attr("y", 730)
			.style("font-size", 22)
			.style("fill", "white")
			.each("end", function () {
				d3.select("#slideUserName")
					.attr("x", 1015)
					.style("text-anchor", "end");
			});

		d3.select("#slideUserTitle")
			.transition().duration(durationLength)
			.attr("x", 785)
			.attr("y", 758)
			.style("font-size", 22)
			.style("fill", "white")
			.each("end", function () {
				d3.select("#slideUserName")
					.attr("x", 1015)
					.style("text-anchor", "end");
			});

		// Introduce Me & Stratus?
		d3.select("#content")
			.append("image").attr("id", "stratuslogo")
			.attr("xlink:href", "imgs/logocolor_large.png")
			.attr("x", 337).attr("y", 204)
			.attr("width", 350).attr("height", 360)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);

		setTriColour(colors.blue, durationLength);
		break;
	case 2:
		d3.select("#stratuslogo")
			.transition().duration(durationLength / 2).style("opacity", 0)
			.each("end", function () {
				d3.select(this).remove();
			});
		var g = d3.select("#content").append("g")
			.attr("id", "oldThread")
			.attr("transform", "translate(100,0)");

		g.append("image")
			.attr("xlink:href", "imgs/threadsafeexample_old.png")
			.attr("x", 52).attr("y", 84)
			.attr("width", 750).attr("height", 300)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);

		g.append("image")
			.attr("xlink:href", "imgs/threadsafeexample_old2.png")
			.attr("x", 69).attr("y", 404)
			.attr("width", 500).attr("height", 300)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 3:
		var g = d3.select("#oldThread");
		g.transition().duration(durationLength)
			.attr("transform", "translate(-150,-250)scale(3)");
		break;
	case 4:
		var g = d3.select("#oldThread");
		g.transition().duration(durationLength)
			.attr("transform", "translate(-800,-150)scale(3)");
		g.transition().delay(durationLength * 2).duration(durationLength)
			.attr("transform", "translate(-800,-450)scale(3)");
		g.transition().delay(durationLength * 5).duration(durationLength)
			.attr("transform", "translate(-1400,-250)scale(3)");
		break;
	case 5:
		var g = d3.select("#oldThread");
		g.transition().duration(durationLength)
			.attr("transform", "translate(-800,-1250)scale(3)");
		break;
	case 6:
		var g = d3.select("#oldThread");
		g.transition().duration(durationLength)
			.attr("transform", "translate(100,0)scale(1)");
	case 7:
		d3.select("#oldThread").transition().duration(durationLength / 2)
			.style("opacity", 0)
			.each("end", function () {
				d3.select(this).remove();
				setTriColour(colors.aqua, durationLength);
			});
		break;
	case 8:
		d3.selectAll("#content").append("text")
			.attr("id", "title")
			.text("The Value of Visualisation")
			.attr("class", "dwdHeader")
			.attr("x", 512).attr("y", 384);
		break;
	case 9:
		d3.select("#title").remove();
		d3.select("#content").append("image")
			.attr("id", "gamesTable")
			.attr("xlink:href", "imgs/gametable.png")
			.attr("x", 90).attr("y", 165)
			.attr("width", 850).attr("height", 340)
			.style("opacity", 1)
			.transition().delay(durationLength * 2).duration(durationLength)
			.style("opacity", 0);
		break;
	case 10:
		var width = 594,
			height = 500;

		var dataset0 = [[0, 12, 10, 12, 9, 8, 11, 8, 6, 4, 4],
			               [0, 9, 8, 9, 7, 9, 8, 9, 9, 10, 8],
			               [0, 6, 7, 5, 2, 4, 3, 6, 8, 4, 6]];

		var dataset = [];

		dataset0.forEach(function (array0) {
			array = [];
			for (var i = 0; i < array0.length; i++) {
				var sum = 0;
				for (var j = 0; j < i + 1; j++) {
					sum = sum + array0[j];
				}
				array.push(sum);
			}
			dataset.push(array);
		})

		var x_scale = d3.scale.linear()
			.domain([0, 10])
			.range([0, width]);

		var xAxis = d3.svg.axis()
			.scale(x_scale)
			.orient("bottom");

		var y_scale = d3.scale.linear()
			.domain([0, d3.max(dataset, function (d) {
				return d3.max(d);
			})])
			.range([height, 0]).nice();

		var yAxis = d3.svg.axis()
			.scale(y_scale)
			.orient("left")
			.ticks(10, "");

		var line = d3.svg.line()
			.x(function (d, i) {
				return x_scale(i);
			})
			.y(function (d, i) {
				return y_scale(d);
			});
		var zLine = d3.svg.line()
			.x(function (d, i) {
				return x_scale(i);
			})
			.y(function (d, i) {
				return y_scale(0);
			});

		var chart = d3.select("#content").append("g")
			.attr("id", "linechart")
			.attr("transform", "translate(212,134)")
			.attr("width", width)
			.attr("height", height);

		chart.append("g")
			.attr("class", "axis")
			.call(xAxis)
			.attr("transform", "translate(0," + height + ")");

		chart.append("g")
			.attr("class", "axis")
			.call(yAxis)
			.attr("transform", "translate(0,0)");

		dataset.forEach(function (d, i) {
			chart.append("path")
				.datum(d)
				.attr("class", "line person" + i)
				.style("fill", "none")
				.style("stroke", "black")
				.style("stroke-width", "1px")
				/*.attr("d", zLine)
				.transition().duration(1000)*/
				.attr("d", line);

			chart.append("text")
				.attr("x", width + 5)
				.attr("y", y_scale(d3.max(d)))
				.attr("class", "person" + i + "text")
				.text("Person " + (i + 1));
		});
		break;
	case 11:
		d3.select("#linechart")
			.transition().duration(durationLength / 2).style("opacity", 0);
		break;
	case 12:
		d3.select("#linechart")
			.transition().duration(durationLength / 2).style("opacity", 1);
		break;
	case 13:
		d3.select("#linechart")
			.transition().duration(durationLength / 2).style("opacity", 0)
			.each("end", function () {
				d3.select(this).remove();
			});
		addPageTitle("Design Process", durationLength);
		break;
	case 14:
		fadeOut("#title", durationLength / 2);
		var content = d3.select("#content");
		var oldProcess = content.append("g")
			.attr("id", "oldProcess")
			.attr("transform", "translate(200,200)")
			.attr("class", "dataProcessList");
		oldProcess.append("text").text("Acquire")
			.attr("x", 0).attr("y", 20)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		oldProcess.append("text").text("Investigate")
			.attr("x", 0).attr("y", 80)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		oldProcess.append("text").text("Filter")
			.attr("x", 0).attr("y", 140)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		oldProcess.append("text").text("Design")
			.attr("x", 0).attr("y", 200)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		oldProcess.append("text").text("Create")
			.attr("x", 0).attr("y", 260)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		oldProcess.append("text").text("Data")
			.attr("x", 0).attr("y", 0)
			.attr("transform", "translate(-40,110)rotate(-90)")
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		oldProcess.append("line")
			.style("stroke", "black")
			.style("stroke-width", "1px")
			.attr("x1", -20).attr("y1", -10)
			.attr("x2", -20).attr("y2", 150)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		oldProcess.append("text").text("Vis")
			.attr("x", 0).attr("y", 0)
			.attr("transform", "translate(-40,240)rotate(-90)")
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		oldProcess.append("line")
			.style("stroke", "black")
			.style("stroke-width", "1px")
			.attr("x1", -20).attr("y1", 165)
			.attr("x2", -20).attr("y2", 270)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		oldProcess.append("image")
			.attr("xlink:href", "imgs/olddesign.png")
			.attr("x", 169).attr("y", -30)
			.attr("width", 100).attr("height", 320)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		content.append("line").attr("id", "redline")
			.attr("stroke", "red").attr("stroke-width", "2px")
			.attr("x1", 100).attr("y1", 500)
			.attr("x2", 100).attr("y2", 500);
		break;
	case 15:
		var content = d3.select("#content");
		d3.select("#redline")
			.transition().duration(durationLength)
			.attr("x2", 450).attr("y2", 150);
		var newProcess = content.append("g")
			.attr("id", "newProcess")
			.attr("transform", "translate(600,200)")
			.attr("class", "dataProcessList");
		newProcess.append("text").text("Enquire")
			.attr("x", 0).attr("y", 20)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		newProcess.append("text").text("Design")
			.attr("x", 0).attr("y", 80)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		newProcess.append("text").text("Create")
			.attr("x", 0).attr("y", 140)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		newProcess.append("text").text("Investigate")
			.attr("x", 0).attr("y", 200)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		newProcess.append("text").text("Acquire")
			.attr("x", 0).attr("y", 260)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		newProcess.append("line")
			.style("stroke", "black")
			.style("stroke-width", "1px")
			.attr("x1", -20).attr("y1", -15)
			.attr("x2", -20).attr("y2", 270)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		newProcess.append("image")
			.attr("xlink:href", "imgs/newdesign.png")
			.attr("x", 110).attr("y", -35)
			.attr("width", 300).attr("height", 340)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 16:
		// You drive you data set, your data set doesn't drive you?
		fadeOut("#newProcess", durationLength / 2);
		fadeOut("#oldProcess", durationLength / 2);
		fadeOut("#redline", durationLength / 2);

		// You drive you data set, your data set doesn't drive you?
		addPageTitle("Design with your platform in mind", durationLength);
		break;
	case 17:
		var content = d3.selectAll("#content");
		fadeOut("#title", durationLength / 2);
		content.append("image").attr("id", "paperImg")
			.attr("xlink:href", "imgs/paper.png")
			.attr("x", 120).attr("y", 220)
			.attr("width", 300).attr("height", 300)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		content.append("image").attr("id", "laptopImg")
			.attr("xlink:href", "imgs/laptop.png")
			.attr("x", 580).attr("y", 200)
			.attr("width", 300).attr("height", 340)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 18:
		var content = d3.selectAll("#content");

		d3.selectAll("#paperImg")
			.transition().duration(durationLength)
			.attr("x", 20);
		d3.selectAll("#laptopImg")
			.transition().duration(durationLength)
			.attr("x", 680);

		content.append("image").attr("id", "mobileImg")
			.attr("xlink:href", "imgs/mobile.png")
			.attr("x", 350).attr("y", 220)
			.attr("width", 300).attr("height", 300)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 19:
		fadeOut("#paperImg", durationLength / 2);
		fadeOut("#laptopImg", durationLength / 2);
		fadeOut("#mobileImg", durationLength / 2);
		var content = d3.selectAll("#content");
		fadeOut("#title", durationLength / 2);
		content.append("image").attr("id", "mapoldImg")
			.attr("xlink:href", "imgs/map_old.jpg")
			.attr("x", 80).attr("y", 200)
			.attr("width", 350).attr("height", 340)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		content.append("image").attr("id", "mapnewImg")
			.attr("xlink:href", "imgs/map_new.png")
			.attr("x", 540).attr("y", 200)
			.attr("width", 400).attr("height", 340)
			.on("click", function () {
				window.open('http://maps.google.co.uk/', '_blank');
				//jumpTo(10);
			})
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 20:
		// clean design into showing what matters, then sticking to your message
		fadeOut("#mapoldImg", durationLength / 2);
		fadeOut("#mapnewImg", durationLength / 2);
		var content = d3.selectAll("#content");
		content.append("image").attr("id", "oldGMap")
			.attr("xlink:href", "imgs/oldGMaps.png")
			.attr("x", 50).attr("y", 50)
			.attr("width", 900).attr("height", 600)
			.on("click", function () {
				window.open('http://maps.google.co.uk/', '_blank');
				//jumpTo(10);
			})
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 21:
		// clean design into showing what matters, then sticking to your message
		fadeOut("#oldGMap", durationLength / 2);
		var content = d3.selectAll("#content");
		content.append("image").attr("id", "newGMap")
			.attr("xlink:href", "imgs/newGMaps.png")
			.attr("x", 75).attr("y", 50)
			.attr("width", 850).attr("height", 600)
			.on("click", function () {
				window.open('http://maps.google.co.uk/', '_blank');
				//jumpTo(10);
			})
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 22:
		// clean design into showing what matters, then sticking to your message
		var content = d3.selectAll("#content");
		d3.select("#newGMap")
			.transition().duration(durationLength)
			.attr("x", 225).attr("y", 350)
			.attr("width", 550).attr("height", 400);

		content.append("image").attr("id", "oldGMap")
			.attr("xlink:href", "imgs/oldGMaps.png")
			.attr("x", 225).attr("y", 25)
			.attr("width", 550).attr("height", 400)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 23:
		// clean design into showing what matters, then sticking to your message
		fadeOut("#oldGMap", durationLength / 2);
		fadeOut("#newGMap", durationLength / 2);
		addPageTitle("Stick to your message", durationLength);
		break;
	case 24:
		// google maps? - example of utilising design for your platform?
		//				- Can go into message about "clean" design as a result
		//				- Then, into only show the relevant data for the message you're trying to communicate?
		//				- Immigration example?
		fadeOut("#title", durationLength / 2);
		d3.select("#content")
			.append("image").attr("id", "tubeMap")
			.attr("xlink:href", "imgs/tube_map.gif")
			.attr("x", 106).attr("y", 120)
			.attr("width", 800).attr("height", 800 * (2 / 3))
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 25:
		fadeOut("#tubeMap", durationLength * 1.9);
		var mapsize = 800;
		var svg = d3.select("#content")
			.append("g").attr("transform", "translate(106, 120)")
			.append("svg")
			.attr("id", "svg_underground")
			.attr("width", mapsize).attr("height", mapsize);
		renderUndergroundLatLong(svg, mapsize);
		break;
	case 26:
		fadeOut("#svg_underground", durationLength / 2);
		d3.select("#content")
			.append("image").attr("id", "nullschool")
			.attr("xlink:href", "imgs/nullschool.png")
			.attr("x", 90).attr("y", 165)
			.attr("width", 400).attr("height", 400)
			.on("click", function () {
				window.open('http://earth.nullschool.net/', '_blank');
			})
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		d3.select("#content")
			.append("image").attr("id", "immigration")
			.attr("xlink:href", "imgs/immigrationflow.png")
			.attr("x", 512).attr("y", 180)
			.attr("width", 400).attr("height", 400)
			.on("click", function () {
				window.open('http://www.global-migration.info/', '_blank');
			})
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 27:
		fadeOut("#nullschool", durationLength / 2);
		fadeOut("#immigration", durationLength / 2);
		// Utilising your platform provides a basis for you to really express creativity.
		addPageTitle("Tell a Story", durationLength);
		break;
	case 28:
		setTriColour(colors.darkblue, durationLength);
		var content = d3.selectAll("#content");
		content.append("image").attr("id", "earth")
			.attr("xlink:href", "imgs/nullschool.png")
			.attr("x", 180).attr("y", 400)
			.attr("width", 300).attr("height", 340)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		content.append("image").attr("id", "data")
			.attr("xlink:href", "imgs/data.jpg")
			.attr("x", 700).attr("y", 35)
			.attr("width", 300).attr("height", 340)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		content.append("image").attr("id", "message")
			.attr("xlink:href", "imgs/message.jpg")
			.attr("x", 110).attr("y", 50)
			.attr("width", 300).attr("height", 340)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 29:
		var content = d3.selectAll("#content");
		fadeOut("#title", durationLength / 2);
		fadeOut("#earth", durationLength / 2);
		fadeOut("#data", durationLength / 2);
		fadeOut("#message", durationLength / 2);
		var chartsize = {
			width: 850,
			height: 840
		}

		svg = d3.select("#content")
			.append("g").attr("transform", "translate(100, 115)")
			.append("svg")
			.attr("id", "svg_persecond")
			.attr("width", chartsize.width).attr("height", chartsize.height);

		perSecondChart = renderPerSecondChart(svg, chartsize.width);
		break;
	case 30:
		perSecondChart.next();
		break;
	case 31:
		perSecondChart.next();
		break;
	case 32:
		perSecondChart.next();
		break;
	case 33:
		perSecondChart.next();
		break;
	case 34:
		perSecondChart.next();
		break;
	case 35:
		perSecondChart.next();
		break;
	case 36:
		perSecondChart.next();
		break;
	case 37: 
		fadeOut("#svg_persecond", durationLength / 2);
			
		var content = d3.selectAll("#content");
		// go into gun example? Show the raw data? Location, time, age, etc...
		// Then get people to provide the question? - How many deaths is what we're looking for...
		setTriColour(colors.grey, durationLength);
		content.append("image").attr("id", "gundeaths")
			.attr("xlink:href", "imgs/gundeaths.png")
			.attr("x", 312).attr("y", 184)
			.attr("width", 400).attr("height", 200)
			.on("click", function () {
				window.open('http://guns.periscopic.com/?year=2013', '_blank');
			})
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		content.append("image").attr("id", "oos")
			.attr("xlink:href", "imgs/oos.png")
			.attr("x", 312).attr("y", 434)
			.attr("width", 400).attr("height", 100)
			.on("click", function () {
				window.open('http://drones.pitchinteractive.com/', '_blank');
			})
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 38:
		// Show Stratus CICS Connections Diagram?
		fadeOut("#gundeaths", durationLength / 2);
		fadeOut("#oos", durationLength / 2);
		setTriColour(colors.aqua, durationLength);
		var summary = d3.select("#content")
			.append("g").attr("id", "summary")
			.attr("class", "dataProcessList")
			.attr("transform", "translate(200,250)");
		summary.append("text").text("Value of Visualisation")
			.attr("x", 312).attr("y", 20)
			.style("text-anchor", "middle")
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 39:
		var summary = d3.select("#summary");
		summary.append("text").text("Design Process")
			.attr("x", 312).attr("y", 80)
			.style("text-anchor", "middle")
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 40:
		var summary = d3.select("#summary");
		summary.append("text").text("Design for your Platform")
			.attr("x", 312).attr("y", 140)
			.style("text-anchor", "middle")
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 41:
		var summary = d3.select("#summary");
		summary.append("text").text("Stick to the Message")
			.attr("x", 312).attr("y", 200)
			.style("text-anchor", "middle")
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 42:
		var summary = d3.select("#summary");
		summary.append("text").text("Tell a Story")
			.attr("x", 312).attr("y", 260)
			.style("text-anchor", "middle")
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 43:
		fadeOut("#summary", durationLength / 2);
		setTriColour(colors.blue, durationLength);
		var content = d3.select("#content")
			.append("g").attr("id", "newThreadG")
			.attr("transform", "translate(77,0)");
		content.append("image")
			.attr("xlink:href", "imgs/ba1.png")
			.attr("x", 0).attr("y", 0)
			.attr("width", 850).attr("height", 500)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		content.append("image")
			.attr("xlink:href", "imgs/ba2.png")
			.attr("x", 0).attr("y", 315)
			.attr("width", 850).attr("height", 500)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		content.append("image")
			.attr("xlink:href", "imgs/ba3.png")
			.attr("x", 0).attr("y", 630)
			.attr("width", 850).attr("height", 500)
			.style("opacity", 0)
			.transition().delay(durationLength / 2).duration(durationLength).style("opacity", 1);
		break;
	case 44:
		var g = d3.select("#newThreadG");
		g.transition().duration(durationLength)
			.attr("transform", "translate(-760,-100)scale(2)");
		break;
	case 45:
		var g = d3.select("#newThreadG");
		g.transition().duration(durationLength)
			.attr("transform", "translate(100,-730)scale(2)");
		break;
	case 46:
		var g = d3.select("#newThreadG");
		g.transition().duration(durationLength)
			.attr("transform", "translate(-760,-730)scale(2)");
		break;
	case 47:
		var g = d3.select("#newThreadG");
		g.transition().duration(durationLength)
			.attr("transform", "translate(100,-1360)scale(2)");
		break;
	case 48:
		var g = d3.select("#newThreadG");
		g.transition().duration(durationLength)
			.attr("transform", "translate(77,0)scale(1)");
		break;
	case 49:
		fadeOut("#newThreadG", durationLength);
		var svg = d3.select("#content")
			.append("g").attr("transform", "translate(150,30)")
			.append("svg")
			.attr("id", "svg2")
			.attr("width", 700).attr("height", 700);
		renderFlowChart(svg);
		break;
	}
}

function back() {
	if (slide > 0) {
		slide--;
		jumpTo(slide);
	}
}

function forward() {
	if (slide < slides) {
		slide++;
		updatePresentation(slide, 1000)
	}
}

d3.selectAll('body').on('keydown', function () {
	var key = d3.event.key;
	switch (key) {
	case 'ArrowLeft': // up
		back();
		break;

	case 'ArrowRight': // right
		forward();
		break;

	default:
		return; // exit this handler for other keys
	}
});

function fadeOut(selector, duration) {
	d3.selectAll(selector)
		.transition().duration(duration)
		.style("opacity", 0)
		.each("end", function () {
			d3.select(this).remove();
		});
}

function addPageTitle(text, duration) {
	d3.selectAll("#content").append("text")
		.attr("id", "title")
		.text(text)
		.attr("class", "dwdHeader")
		.attr("x", 512).attr("y", 384)
		.style("opacity", 0)
		.transition().delay(duration / 2).duration(duration).style("opacity", 1);
}

function setTriColour(color, duration) {
	var triangles = d3.selectAll(".presTriangle");
	if (duration == 0) {
		triangles.style("fill", color);
	} else {
		triangles.transition().delay(duration / 2).duration(duration)
			.style("fill", color);
	}
}

function restart() {
	jumpTo(0);
}

function jumpTo(s) {
	for (i = 0; i <= s; i++) {
		slide = i;
		updatePresentation(i, 0);
	}
}

function setHash(hash) {
	window.location.hash = hash;
}

if (window.location.hash) {
	jumpTo(Number(window.location.hash.split('#')[1]));
} else {
	jumpTo(0);
}