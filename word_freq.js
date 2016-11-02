
//Preload
var margin = {top: 20, right: 10, bottom: 30, left: 60},
    width = document.querySelector('#svg-canvas').offsetWidth - margin.left - margin.right,
    height = document.querySelector('#svg-canvas').offsetHeight - margin.top - margin.bottom;


var x = d3.scale.ordinal()
    .rangeRoundBands([5, width ], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var chart = d3.select('.chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(10, '');

// Postload
d3.tsv('wordlist.tsv', type, function(error, dat) {

    // can use this to select a slice of the large dataset
    data = dat.slice(50,64);

    x.domain(data.map(function(d) { return d.word; }));
    y.domain([0, d3.max(data, function(d) { return d.uses; })]);

    //draws x axis
    chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    //draws y axis
    chart.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 5)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .style('margin-bottom', 10)
        .text('uses');

    //draws each bar
    chart.selectAll().data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d.word); })
        .attr('width', x.rangeBand())
        .attr('y', function(d) { return y(d.uses); })
        .attr('height', function(d) { return height - y(d.uses); });

    chart.selectAll().data(data)
        .enter().append('text')
        .attr('x', function(d) { return x(d.word) + 3; } )
        .attr('y', function(d) { return y(d.uses) + 3; })
        // to rotate sideways
        // .attr('transform', 'rotate(-90)')
        // .attr('x', function(d) { return -y(d.uses); } )
        // .attr('y', function(d) { return x(d.word); })
        .attr('dy', '.71em')
        .style('fill', 'black')
        .text(function(d) { return d.uses });
});

//Synchronous load
function type(d) {
    d.value = +d.value;
    return d;
}


