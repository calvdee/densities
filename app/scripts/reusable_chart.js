d3.custom = {};

d3.custom.density = function module() {
    var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = 500,
        height = 500,
        gap = 0,
        ease = 'cubic-in-out';
    var svg, duration = 500;


    // data
    var xs = [0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.0,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3.0,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8,3.9,4.0,4.1,4.2,4.3,4.4,4.5,4.6,4.7,4.8,4.9,5.0,5.1,5.2,5.3,5.4,5.5,5.6,5.7,5.8,5.9,6.0,6.1,6.2,6.3,6.4,6.5,6.6,6.7,6.8,6.9,7.0,7.1,7.2,7.3,7.4,7.5,7.6,7.7,7.8,7.9,8.0,8.1,8.2,8.3,8.4,8.5,8.6,8.7,8.8,8.9,9.0,9.1,9.2,9.3,9.4,9.5,9.6,9.7,9.8,9.9,10.0,10.1,10.2,10.3,10.4,10.5,10.6,10.7,10.8,10.9,11.0,11.1,11.2,11.3,11.4,11.5,11.6,11.7,11.8,11.9,12.0,12.1,12.2,12.3,12.4,12.5,12.6,12.7,12.8,12.9,13.0,13.1,13.2,13.3,13.4,13.5,13.6,13.7,13.8,13.9,14.0,14.1,14.2,14.3,14.4,14.5,14.6,14.7,14.8,14.9,15.0,15.1,15.2,15.3,15.4,15.5,15.6,15.7,15.8,15.9,16.0,16.1,16.2,16.3,16.4,16.5,16.6,16.7,16.8,16.9,17.0,17.1,17.2,17.3,17.4,17.5,17.6,17.7,17.8,17.9,18.0,18.1,18.2,18.3,18.4,18.5,18.6,18.7,18.8,18.9,19.0,19.1,19.2,19.3,19.4,19.5,19.6,19.7,19.8,19.9,20.0];

    function gamma(num) {
        var rval=1;
        for (var i = 2; i <= num-1; i++)
            rval = rval * i;
        return rval;
    }

    function gammaPdf(xs, a, b) { 
        var ys = _.map(xs, function(x) { return Math.pow(1/b, a)*Math.pow(x, a-1)*Math.exp(-x*1/b)/gamma(a); });
        var pdf = _.chain(xs)
            .zip(ys)
            .map(function(xy) { return { 'x': xy[0], 'p': xy[1]}; })
            .value();
        // console.log(p);
        return pdf;
    }

    var initData = gammaPdf(xs, 1, 2);

    var dispatch = d3.dispatch('customHover');

    function exports(_selection) {
        _selection.each(function(_data) {
            console.log(_data);
            // var chartW = width - margin.left - margin.right,
            //     chartH = height - margin.top - margin.bottom;

            // graph dimensions
            var m = [40, 80, 80, 80];   // margins
            var w = 900 - m[1] - m[3];  // width
            var h = 600 - m[0] - m[2];  // height


            // scales
            // var initData = gammaPdf(xs, 1, 2);
            // var xBounds = d3.extent(xs); //console.log(xBounds);
            // var yBounds = d3.extent(initData, function(d) { return d.p; }); //console.log(yBounds);
            // ::todo: no hardcoding
            var xBounds = [0,20];
            var yBounds = [0,0.5];
            var xScale = d3.scale.linear().domain(xBounds).range([0, w]);
            var yScale = d3.scale.linear().domain(yBounds).range([h, 0]);

            // axes
            var xAxis = d3.svg.axis()
                              .scale(xScale)
                              .orient("bottom")
                              .ticks(xBounds[1]);

            var yAxis = d3.svg.axis()
                              .scale(yScale)
                              .orient("left")
                              .ticks(8);

            var line = d3.svg.line()
                .x(function(d) { return xScale(+d.x); })
                .y(function(d) { return yScale(+d.p); })

            // create the chart
            if(!svg) { 
                svg = d3.select(this)
                    .append("svg:svg")
                      .attr("width", w + m[1] + m[3])
                      .attr("height", h + m[0] + m[2])
                    .append("svg:g")
                      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");                
                
                // draw the chart axes
                svg.append("svg:g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + h + ")")
                    .call(xAxis);

                svg.append("svg:g")
                      .attr("class", "y axis")
                      .call(yAxis);
                      
                svg.append("path")
                  .attr("d", line(initData))
                  .attr("class", "line");
            }



            // var barW = chartW / _data.length;

            // if(!svg) {
            //     svg = d3.select(this)
            //         .append('svg')
            //         .classed('chart', true);
            //     var container = svg.append('g').classed('container-group', true);
            //     container.append('g').classed('chart-group', true);
            //     container.append('g').classed('x-axis-group axis', true);
            //     container.append('g').classed('y-axis-group axis', true);
            // }

            // svg.transition().duration(duration).attr({width: width, height: height})
            // svg.select('.container-group')
            //     .attr({transform: 'translate(' + margin.left + ',' + margin.top + ')'});

            // svg.select('.x-axis-group.axis')
            //     .transition()
            //     .duration(duration)
            //     .ease(ease)
            //     .attr({transform: 'translate(0,' + (chartH) + ')'})
            //     .call(xAxis);

            // svg.select('.y-axis-group.axis')
            //     .transition()
            //     .duration(duration)
            //     .ease(ease)
            //     .call(yAxis);

            // var gapSize = x1.rangeBand() / 100 * gap;
            // var barW = x1.rangeBand() - gapSize;
            // var bars = svg.select('.chart-group')
            //     .selectAll('.bar')
            //     .data(_data);
            // bars.enter().append('rect')
            //     .classed('bar', true)
            //     .attr({x: chartW,
            //         width: barW,
            //         y: function(d, i) { return y1(d); },
            //         height: function(d, i) { return chartH - y1(d); }
            //     })
            //     .on('mouseover', dispatch.customHover);
            // bars.transition()
            //     .duration(duration)
            //     .ease(ease)
            //     .attr({
            //         width: barW,
            //         x: function(d, i) { return x1(i) + gapSize/2; },
            //         y: function(d, i) { return y1(d); },
            //         height: function(d, i) { return chartH - y1(d); }
            //     });
            // bars.exit().transition().style({opacity: 0}).remove();

            // duration = 500;

        });
    }
    exports.width = function(_x) {
        if (!arguments.length) return width;
        width = parseInt(_x);
        return this;
    };
    exports.height = function(_x) {
        if (!arguments.length) return height;
        height = parseInt(_x);
        duration = 0;
        return this;
    };
    exports.gap = function(_x) {
        if (!arguments.length) return gap;
        gap = _x;
        return this;
    };
    exports.ease = function(_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };
    d3.rebind(exports, dispatch, 'on');
    return exports;
};