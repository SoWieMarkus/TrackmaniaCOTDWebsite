import * as d3 from "d3";
import geoJson from "../../assets/globe.json";

const SVG_ID = "map_svg";

function drawMap(backgroundColor) {
  d3.select("#map").append("svg")
    .attr("width", "100%")
    .attr("height", "100vw")
    .attr("id", SVG_ID);

  let svg = d3.select("#" + SVG_ID);

  svg.append("rect").attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", backgroundColor);

  let projection = d3.geoMercator()
    .scale(100)
    .center([13.458333, 50.929472])
    .translate([500 / 2, 300 / 2]);

  svg.append("g")
    .selectAll("path")
    .data(geoJson.features)
    .enter()
    .append("path")
    .attr("d", d3.geoPath().projection(projection))
    .attr("fill", "blue")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .attr("class", function (d) {
      return "Country"
    })
    .style("opacity", 1)
    .on("mouseover", function (d) {
      console.log(d);
      d3.selectAll(".Country")
        .attr("fill", "blue")
        .attr("opacity", .6);
      d3.select(this).attr("fill", "red")
    })
    .on("mouseleave", function (d) {
      console.log(d);
      d3.selectAll(".Country").attr("fill", "blue").style("opacity", 1);
      d3.select(this).attr("fill", "blue")
    })
    .on("click", function (d) {
      console.log(d);
      if (d.properties.link === null) return;
      window.location.href = window.location.href += "/daily";
    })
}


export {drawMap};
