import * as d3 from "d3";
import geoJson from "../../assets/countries_geo.json";
import zones from "../../assets/countries.json";
import * as topojson from "topojson";

const SVG_ID = "map_svg";

const width = 700;
const height = 700;

const colors = {
  trackmaniaZone: "grey",
  selected: "red",
  hover: "darkgrey",
  clickhover: "darkred"
}

let map;

let projection = d3.geoOrthographic()
  .scale(200)
  .translate([width / 2, height / 2])
  .clipAngle(90)
  .precision(10);


function focus(id) {
  console.log(id);
  let country = map.select(".clickable[data-country-id='"+id+"']");
  d3.selectAll(".clicked")
    .classed("clicked", false)
    .attr("fill", colors.trackmaniaZone);
  country
    .classed("clicked", true)
    .attr("fill", colors.selected);

  d3.select(".clicked").transition()
    .duration(1250)
    .tween("rotate", function (d) {
      var p = d3.geoCentroid(d),
        r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
      return function (t) {
        projection.rotate(r(t));
        map.selectAll("path").attr("d", path);
      }
    });
}

let path = d3.geoPath().projection(projection);

function drawGlobe() {





  map = d3.select("#map").append("svg")
    .attr("width", "100%")
    .attr("height", "600px")
    .attr("id", SVG_ID)
    .on("mousedown", mousedown)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup);


  function trackballAngles(pt) {
    // based on http://www.opengl.org/wiki/Trackball
    // given a click at (x,y) in canvas coords on the globe (trackball),
    // calculate the spherical coordianates for the point as a rotation around
    // the vertical and horizontal axes

    var r = projection.scale();
    var c = projection.translate();
    var x = pt[0] - c[0], y = -(pt[1] - c[1]), ss = x * x + y * y;


    var z = r * r > 2 * ss ? Math.sqrt(r * r - ss) : r * r / 2 / Math.sqrt(ss);

    var lambda = Math.atan2(x, z) * 180 / Math.PI;
    var phi = Math.atan2(y, z) * 180 / Math.PI
    return [lambda, phi];
  }

  function composedRotation(λ, ϕ, γ, δλ, δϕ) {
    λ = Math.PI / 180 * λ;
    ϕ = Math.PI / 180 * ϕ;
    γ = Math.PI / 180 * γ;
    δλ = Math.PI / 180 * δλ;
    δϕ = Math.PI / 180 * δϕ;

    var sλ = Math.sin(λ), sϕ = Math.sin(ϕ), sγ = Math.sin(γ),
      sδλ = Math.sin(δλ), sδϕ = Math.sin(δϕ),
      cλ = Math.cos(λ), cϕ = Math.cos(ϕ), cγ = Math.cos(γ),
      cδλ = Math.cos(δλ), cδϕ = Math.cos(δϕ);

    var m00 = -sδλ * sλ * cϕ + (sγ * sλ * sϕ + cγ * cλ) * cδλ,
      m01 = -sγ * cδλ * cϕ - sδλ * sϕ,
      m02 = sδλ * cλ * cϕ - (sγ * sϕ * cλ - sλ * cγ) * cδλ,
      m10 = -sδϕ * sλ * cδλ * cϕ - (sγ * sλ * sϕ + cγ * cλ) * sδλ * sδϕ - (sλ * sϕ * cγ - sγ * cλ) * cδϕ,
      m11 = sδλ * sδϕ * sγ * cϕ - sδϕ * sϕ * cδλ + cδϕ * cγ * cϕ,
      m12 = sδϕ * cδλ * cλ * cϕ + (sγ * sϕ * cλ - sλ * cγ) * sδλ * sδϕ + (sϕ * cγ * cλ + sγ * sλ) * cδϕ,
      m20 = -sλ * cδλ * cδϕ * cϕ - (sγ * sλ * sϕ + cγ * cλ) * sδλ * cδϕ + (sλ * sϕ * cγ - sγ * cλ) * sδϕ,
      m21 = sδλ * sγ * cδϕ * cϕ - sδϕ * cγ * cϕ - sϕ * cδλ * cδϕ,
      m22 = cδλ * cδϕ * cλ * cϕ + (sγ * sϕ * cλ - sλ * cγ) * sδλ * cδϕ - (sϕ * cγ * cλ + sγ * sλ) * sδϕ;


    let γ_, ϕ_, λ_;
    if (m01 != 0 || m11 != 0) {
      γ_ = Math.atan2(-m01, m11);
      ϕ_ = Math.atan2(-m21, Math.sin(γ_) == 0 ? m11 / Math.cos(γ_) : -m01 / Math.sin(γ_));
      λ_ = Math.atan2(-m20, m22);
    } else {
      γ_ = Math.atan2(m10, m00) - m21 * λ;
      ϕ_ = -m21 * Math.PI / 2;
      λ_ = λ;
    }

    return ([λ_ * 180 / Math.PI, ϕ_ * 180 / Math.PI, γ_ * 180 / Math.PI]);
  }

  var m0 = null,
    o0;

  function mousedown(event) {  // remember where the mouse was pressed, in canvas coords

    m0 = trackballAngles(d3.pointer(event, map));
    o0 = projection.rotate();
    event.preventDefault();
  }

  function mousemove(event) {
    if (m0) {
      var m1 = trackballAngles(d3.pointer(event, map));
      let o1 = composedRotation(o0[0], o0[1], o0[2], m1[0] - m0[0], m1[1] - m0[1])
      projection.rotate(o1);
      map.selectAll("path").attr("d", path);
    }
  }

  function mouseup() {
    m0 = null;
  }


  map.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere");

  map.append("use")
    .attr("class", "fill")
    .attr("xlink:href", "#sphere");

  // Land masses
  map.insert("path", ".graticule")
    .datum(topojson.feature(geoJson, geoJson.objects.land))
    .attr("fill", colors.trackmaniaZone)
    .attr("d", path);

  let countries = topojson.feature(geoJson, geoJson.objects.countries).features;
  for (let country of countries) {
    let zone = zones[country.id];

    if (zone === undefined) continue;

    map.insert("path", ".graticule")
      .datum(country)
      .attr("fill", colors.trackmaniaZone)
      .attr("d", path)
      .attr("class", "clickable")
      .attr("data-country-id", country.id)
      .on("click", function () {
        d3.selectAll(".clicked")
          .classed("clicked", false)
          .attr("fill", colors.trackmaniaZone);
        d3.select(this)
          .classed("clicked", true)
          .attr("fill", colors.selected);


        d3.select(".clicked").transition()
          .duration(1250)
          .tween("rotate", function (d) {
            var p = d3.geoCentroid(d),
              r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
            return function (t) {
              projection.rotate(r(t));
              map.selectAll("path").attr("d", path);
            }
          });

      })
      .on("mousemove", function () {
        var c = d3.select(this);
        if (c.classed("clicked")) {
          c.attr("fill", colors.clickhover);
        } else {
          c.attr("fill", colors.hover);
        }
      })
      .on("mouseout", function () {
        var c = d3.select(this);
        if (c.classed("clicked")) {
          c.attr("fill", colors.selected);
        } else {
          d3.select(this).attr("fill", colors.trackmaniaZone);
        }
      });

  }

  map.insert("path", ".graticule")
    .datum(topojson.mesh(geoJson, geoJson.objects.countries, function (a, b) {
      return a !== b;
    }))
    //.attr("class", "boundary")
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", ".5px")
    .attr("d", path);

  // Background
  map.append("defs").append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("fill", "lightblue")
    .attr("z-index", 0)
    .attr("d", path);


}


function drawMap(backgroundColor) {
  d3.select("#map").append("svg")
    .attr("width", "100%")
    .attr("height", "600px")
    .attr("id", SVG_ID);

  let svg = d3.select("#" + SVG_ID);

  svg.append("rect").attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", backgroundColor);

  let projection = d3.geoOrthographic()
    .scale(300)
    .center([13.458333, 50.929472])
    .translate([1000 / 2, 600 / 2]);
  /*let projection = d3.geo.orthographic()
    .scale(300)
    .translate([width / 2, height / 2])
    .clipAngle(90)
    .precision(10);*/

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


export {drawMap, drawGlobe, focus};
