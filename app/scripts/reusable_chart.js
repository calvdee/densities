d3.custom = {};

d3.custom.density = function module() {

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = 500,
        height = 500,
        gap = 0,
        ease = 'quad2-in-out';
    var svg, duration = 500;

    var dispatch = d3.dispatch('customHover');

    function exports(_selection, _chartOpts) {
        _selection.each(function(_data) {

            if(_data.length === 0)
                return;

            // graph dimensions
            var m = [_chartOpts.top, _chartOpts.right, _chartOpts.bottom, _chartOpts.left];   // margins
            var w = _chartOpts.width - m[1] - m[3];  // width
            var h = _chartOpts.height - m[0] - m[2];  // height


            // scales
            var xys = _data;

            var xBounds = d3.extent(xys, function(xy) {return xy.x;}); 
            var yBounds = d3.extent(xys, function(xy) {return xy.y;}); 
            var xScale = d3.scale.linear().domain(xBounds).range([0, w]);
            var yScale = d3.scale.linear().domain(yBounds).range([h, 0]);

            // axes
            var xAxis = d3.svg.axis()
                              .scale(xScale)
                              .orient("bottom")
                              .ticks(xBounds[1]);

            var yAxis = d3.svg.axis()
                              .scale(yScale)
                              .orient("left");  

            var line = d3.svg.line()
                .x(function(xy) { return xScale(+xy.x); })
                .y(function(xy) { return yScale(+xy.y); })

            // create the chart
            if(!svg) { 
                // 
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
                  .attr("d", line(xys))
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
            
            svg.selectAll("path.line")
                .transition()
                .duration(1000)
                .ease("ease-in-back")
                .attr("d", line(xys));

            svg.select(".y")
                .filter(".axis")
                .transition()
                .duration(1500)
                .ease("sin-in-out")
                .call(yAxis);

            svg.select(".x")
                .filter(".axis")
                .transition()
                .duration(1500)
                .ease("sin-in-out")
                .call(xAxis);
            
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