/*
250 iTunes downloads
3600 Instagram photos taken
7000 Tweets sent
30000 Facebook likes
46000 YouTube viewings
60000 Google searches
And 1.15 million CICS transactions on System z
*/

// source: http://www.internetlivestats.com/one-second/

var dataPerSecond = [{
	thing: 'iTunes Downloads',
	suffix: 'Downloads',
	icon: 'imgs/persecond/itunes.png',
	persecond: 250
}, {
	thing: 'Instagram Uploads',
	suffix: 'Uploads',
	icon: 'imgs/persecond/instagram.png',
	persecond: 760
}, {
	thing: 'Tweets Sent',
	suffix: 'Tweets',
	icon: 'imgs/persecond/twitter.png',
	persecond: 7000
}, {
	thing: 'Facebook Likes',
	suffix: 'Likes',
	icon: 'imgs/persecond/facebook.png',
	persecond: 30000
}, {
	thing: 'Google Searches',
	suffix: 'Searches',
	icon: 'imgs/persecond/google.png',
	persecond: 59000
}, {
	thing: 'YouTube Viewings',
	suffix: 'Views',
	icon: 'imgs/persecond/youtube.png',
	persecond: 67500
}, {
	thing: 'IBM CICS Transactions',
	suffix: 'CICS Transactions',
	icon: 'imgs/persecond/ibm.gif',
	persecond: 1150000
}];

function renderPerSecondChart(svg, width) {
	var rectHeight = 50,
		rectX = 100,
		paddingTop = 40,
		padding = 20;

	var widthScale = d3.scale.linear()
		.domain([0, d3.min(dataPerSecond, function (d) {
			return d.persecond;
		})])
		.range([0, width - rectX - 160]).nice();

	var xAxis;

	var colors = ['#e56488', '#f9742b', '#78c2f5', '#475993', '#34a853', '#db2724', '#3570c9'];
	var useCommas = d3.format(',');

	var length = 1;

	var time = new Date();

	var dur = 2000;
	createChart();
	addData();

	function addData() {
		if (length <= dataPerSecond.length) {
			updateChart(dataPerSecond.slice(0, length));
			length++;
		} else if (length = dataPerSecond.length + 1) {
			switchToDashboard();
		}
	}

	function getTimeDifference() {
		var now = new Date();
		var timeSinceStart = (now.getTime() - time.getTime()) / 1000;
		return timeSinceStart;
	}

	function createChart() {
		svg.append('text')
			.attr('class', 'persecond-chart-title')
			.attr('transform', 'translate(' + width / 2 + ', 0)')
			.text('Events per Second')
			.style('opacity', 0)
			.transition().duration(dur)
			.style('opacity', 1);

		svg.append('g').attr('class', 'x axis')
			.style('opacity', 0)
		updateAxis();
	}

	function updateAxis() {
		xAxis = d3.svg.axis().orient('bottom').scale(widthScale).ticks(5);

		svg.selectAll('.x.axis').attr('transform', 'translate(' + rectX + ', 525)').transition().duration(dur).style('opacity', 1).call(xAxis);
	}

	function updateChart(data) {
		var rows = svg.selectAll('.persecond-row').data(data);

		var newRows = rows.enter().append('g')
			.attr('class', 'persecond-row')
			.attr('transform', function (d, i) {
				var translate = 'translate(0, ' + (paddingTop + (rectHeight * i) + (padding * i)) + ')';
				return translate;
			});

		newRows.append('image').attr('xlink:href', function (d) {
				return d.icon;
			})
			.attr('width', rectHeight)
			.attr('height', rectHeight)
			.attr('transform', 'translate(' + (rectX / 2 - 10) + ',0)')
			.style('opacity', 0)
			.transition().duration(dur)
			.style('opacity', 1)

		newRows.append('rect')
			.style('fill', function (d, i) {
				return colors[i] || 'black';
			})
			.attr('x', rectX)
			.style('opacity', 0)
			.attr('height', rectHeight)
			.attr('width', function (d) {
				return widthScale(d.persecond);
			});

		newRows.append('text').text(function (d) {
				return useCommas(d.persecond) + ' ' + d.suffix;
			})
			.attr('transform', function (d) {
				return 'translate(' + (rectX + widthScale(d.persecond) + 7) + ', ' + rectHeight / 2 + ')';
			})
			.style('opacity', 0);

		widthScale.domain([0, d3.max(data, function (d) {
			return d.persecond;
		})]).nice();

		updateAxis();

		rows.selectAll('rect').transition().delay(function (d, i) {
				return i * (dur / 2);
			}).duration(dur)
			.style('opacity', 1)
			.attr('width', function (d) {
				return widthScale(d.persecond);
			});

		rows.selectAll('text')
			.transition().delay(function (d, i) {
				return i * (dur / 2);
			}).duration(dur)
			.style('opacity', 1)
			.attr('transform', function (d) {
				return 'translate(' + (rectX + widthScale(d.persecond) + 7) + ', ' + (rectHeight / 2) + ')';
			})
	}

	function switchToDashboard() {
		var iconPositions = {
			'iTunes Downloads': {
				x: 0,
				y: 100
			},
			'Instagram Uploads': {
				x: 250,
				y: 100
			},
			'Tweets Sent': {
				x: 500,
				y: 100
			},
			'Facebook Likes': {
				x: 750,
				y: 100
			},
			'YouTube Viewings': {
				x: 125,
				y: 300
			},
			'Google Searches': {
				x: 425,
				y: 300
			},
			'IBM CICS Transactions': {
				x: 675,
				y: 300
			}
		}

		var dur = 2000;

		var companies = svg.selectAll('.persecond-row');
		companies.selectAll('rect').transition().duration(dur).style('opacity', 0).remove();
		companies.selectAll('text').transition().duration(dur).style('opacity', 0).remove();

		svg.selectAll('.persecond-chart-title')
			.text('Events since the start of this Slide');

		svg.selectAll('.axis').transition().duration(dur).style('opacity', 0).remove();

		companies.transition().delay(dur).duration(dur)
			.attr('transform', function (d) {
				return 'translate(' + iconPositions[d.thing].x + ',' + iconPositions[d.thing].y + ')';
			});

		companies.selectAll('image')
			.transition().delay(dur).duration(dur)
			.attr('width', 100)
			.attr('height', 100)
			.attr('transform', 'translate(0,0)');

		companies.append('text')
			.text(function (d) {
				return useCommas(Math.round(d.persecond * getTimeDifference()));
			})
			.attr('transform', 'translate(50, 120)')
			.style('opacity', 0)
			.attr('class', 'persecond-counter')
			.transition().delay(dur * 2).duration(dur)
			.style('opacity', 1);

		companies.append('text')
			.text(function (d) {
				return d.suffix;
			})
			.attr('transform', 'translate(50, 140)')
			.style('opacity', 0)
			.attr('class', 'persecond-label')
			.transition().delay(dur * 2).duration(dur)
			.style('opacity', 1);

		window.setInterval(function () {
			updateCounters();
		}, 200);

		function updateCounters() {
			svg.selectAll('.persecond-chart-title')
				.text('Events since the start of this Slide ( ' + parseInt(getTimeDifference()) + 's ago )');

			companies.selectAll('.persecond-counter').text(function (d) {
				return useCommas(Math.round(d.persecond * getTimeDifference()));
			});
		}
	}

	return {
		next: addData
	};
}