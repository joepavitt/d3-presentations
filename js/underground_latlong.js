var size = {
	padding: 10
};

var lat, long;

var tubemapBack, svggLines, svggStations;

function showXY(delay, duration) {
	state = 'xy';
	tubemapBack.transition()
		.delay(delay + (duration * 0.5))
		.duration(duration * 0.25)
		.style("opacity", 1);

	svggLines.selectAll('path')
		.transition().delay(delay)
		.duration(duration * 0.9)
		.style('opacity', 0)
		.attr("d", xyLine);

	svggStations.selectAll('circle')
		.transition().delay(delay)
		.duration(duration * 0.9)
		.attr('cx', function (d) {
			return d.x; //long(d.Longitude);
		})
		.attr('cy', function (d) {
			return d.y; //lat(d.Latitude);
		})
}

function showLatLong(delay, duration) {
	state = 'longlat';
	tubemapBack.transition()
		.delay(delay + (duration * 0.3))
		.duration(duration * 0.25)
		.style("opacity", 0);

	svggLines.selectAll('path')
		.transition().delay(delay)
		.duration(duration)
		.style('opacity', 1)
		.attr("d", longlatLine);

	svggStations.selectAll('circle')
		.transition().delay(delay)
		.duration(duration)
		.attr('cx', function (d) {
			return long(d.Longitude);
		})
		.attr('cy', function (d) {
			return lat(d.Latitude);
		});
}

function toggleView() {
	if (state === 'xy') {
		showLatLong(0, 1000);
	} else {
		showXY(0, 1000);
	}
}

var state = 'xy'; // or longlat

var longlatLine = d3.svg.line()
	.x(function (d) {
		return d.ll.long;
	})
	.y(function (d) {
		return d.ll.lat;
	});

var xyLine = d3.svg.line()
	.x(function (d) {
		return d.xy.x;
	})
	.y(function (d) {
		return d.xy.y;
	});

function renderUndergroundLatLong(svg, mapsize) {
	d3.csv('js/data/underground_map_coords.csv', function (stations) {
		var width = mapsize;
		var height = mapsize * (4 / 6);

		svg.on('click', function () {
			toggleView();
		})

		svg.append('rect')
			.attr('width', width)
			.attr('height', height)
			.style('fill', 'white')
			.style('stroke', 'grey')
			.style('stroke-width', '2px')
			.style('opacity', 0.2)
			.transition().duration(1000)
			.style('opacity', 0.0);

		tubemapBack = svg.append("image").attr("id", "tubeMap")
			.attr("xlink:href", "imgs/tube_map.gif")
			.attr("x", 0).attr("y", 0)
			.attr("width", width).attr("height", height)
			.style("opacity", 0);

		long = d3.scale.linear().domain(d3.extent(stations, function (d) {
				return Number(d.Longitude);
			})).range([size.padding, width - size.padding]) // x axis

		lat = d3.scale.linear().domain(d3.extent(stations, function (d) {
				return Number(d.Latitude);
			})).range([height - size.padding, size.padding]) // y axis

		function getLongLat(station, line) {
			var node = _.filter(stations, function (s) {
				if (s["Station Name"] === station) {
					if (!s.colors) {
						s.colors = [];
					}
					s.colors.push(line.color)
					return true;
				};
			})[0];
			if (!node) {
				console.log('undefined for ' + station);
			}
			return [node.Longitude, node.Latitude];
		}

		function getXY(station, line) {
			var node = _.filter(stations, function (s) {
				if (s["Station Name"] === station) {
					if (!s.colors) {
						s.colors = [];
					}
					s.colors.push(line.color)
					return true;
				};
			})[0];
			if (!node) {
				console.log('undefined for ' + station);
			}
			return [node.x, node.y];
		}

		d3.json('js/data/underground_lines.json', function (err, data) {
			data = data.data;

			var lines = [];

			data.forEach(function (l) {
				lines[l.station] = [];
				l.stations.forEach(function (d, i) {
					var longlat = getLongLat(d, l);
					var xy = getXY(d, l);
					l.stations[i] = {
						name: d,
						xy: {
							x: xy[0],
							y: xy[1],
						},
						ll: {
							long: long(longlat[0]),
							lat: lat(longlat[1])
						},
						color: l.color
					};
				});
			});

			svggLines = svg.append('g')
				.attr('id', 'lines');


			svggStations = svg.append("g")
				.attr("id", "stations");

			data.forEach(function (line, i) {
				svggLines.append("path")
					.datum(line.stations)
					.attr("class", "line " + line.line)
					.style("fill", "none")
					.style("stroke", line.color)
					.style("stroke-width", "3px")
					.style("opacity", 0)
					.attr("d", xyLine)
					.on('mouseenter', function (d) {
						if (state === 'longlat') {
							svggLines.selectAll('path')
								.style('opacity', 0.1)
								.filter(function (p) {
									return p[0].color === d[0].color;
								})
								.style('opacity', 1.0)
								.style('stroke-width', '4px');

							svggStations.selectAll('circle')
								.style('opacity', 0.1)
								.filter(function (s) {
									if (!s.colors) {
										return false;
									}
									return s.colors.indexOf(d[0].color) > -1;
								})
								.style('opacity', 1.0);
						}
					})
					.on('mouseout', function (d) {
						if (state === 'longlat') {
							svggLines.selectAll('path')
								.style('opacity', 1.0)
								.style('stroke-width', '3px');

							svggStations.selectAll('circle')
								.style('opacity', 1.0);
						}
					})
					.transition().delay(300).duration(1000).style('opacity', 1.0);
			});

			svggStations.selectAll('circle')
				.data(stations).enter()
				.append('circle')
				.attr('cx', function (d) {
					return d.x; //long(d.Longitude);
				})
				.attr('cy', function (d) {
					return d.y; //lat(d.Latitude);
				})
				.attr('r', 3)
				.attr('id', function (d) {
					return d['Station Name'];
				})
				.style('pointer-events', 'none')
				.style("opacity", 0)
				.attr('class', 'station')
				.transition().duration(1000).style('opacity', 1.0);

			showLatLong(1200, 1000)
				/*showLatLong(1200, 1000);
				showXY(3200, 1000);
				showLatLong(5200, 1000);
				showXY(7200, 1000);*/
		})
	});
}