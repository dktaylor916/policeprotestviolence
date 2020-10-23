simulation = d3.forceSimulation(dataset);

// Define each tick of simulation
simulation.on("tick", () => {
  d3.selectAll("#datacircle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 8);
});

simulation
  .force("charge", d3.forceManyBody().strength([0.9]))
  .force(
    "forceX",
    d3
      .forceX((d) => projection([+d.Longitude, +d.Latitude])[0])
      .strength([0.99])
  )
  .force(
    "forceY",
    d3
      .forceY((d) => projection([+d.Longitude, +d.Latitude])[1])
      .strength([0.99])
  )
  .force("collide", d3.forceCollide([9]));

setTimeout(function () {
  var pos1 = [];
  d3.selectAll("#datacircle").each(function (d) {
    pos1.push({
      index: d["index"],
      x1: d3.select(this).attr("cx"),
      y1: d3.select(this).attr("cy"),
    });
  });
  console.log(JSON.stringify(pos1));
}, 10000);
