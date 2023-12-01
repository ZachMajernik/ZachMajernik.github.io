// JavaScript source code

const texts = [
    "McDonalds",
    "Burger King",
    "Chick-Fil-A",
    "Dairy Queen",
    "Subway",
    "Sonic",
    "Arby's",
    "Taco Bell"
];
window.onload = function () {
    document.getElementById('cycleText').textContent = texts[7];

    var back = document.getElementById("animBackground");
    back.style.width = 0;
}

let currentIndex = 0;
function cycleText() {
    document.getElementById('cycleText').textContent = texts[currentIndex];
    currentIndex = (currentIndex + 1) % texts.length; // Move to the next text, and loop back to the first one if needed
}
setInterval(cycleText, 400);

const data = [
    { name: "mcd", num: 13430, full: "McDonalds" },
    { name: "bk", num: 6960, full: "Burger King"  },
    { name: "cfa", num: 2980, full: "Chick-Fil-A"  },
    { name: "dq", num: 4300, full: "Dairy Queen" },
    { name: "sbw", num: 20570, full: "Subway"  },
    { name: "snc", num: 3550, full: "Sonic"  },
    { name: "arb", num: 3340, full: "Arby\'s"  },
    { name: "tb", num: 7200, full: "Taco Bell"  }];

  // Set up SVG container and scales
  const margin = { top: 20, right: 20, bottom: 40, left: 60 };
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3.select("#d3-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Create X and Y scales
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.num)])
    .range([height, 0]);

  // Add X and Y axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

    svg.append("text")
  .attr("class", "axis-text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(${width / 2},${height + margin.bottom - 5})`)
  .text("Restaurants");

svg.append("text")
  .attr("class", "axis-text")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", margin.left - 110)
  .text("Aproximate Number in the U.S.");

  // Create and render bars
  const bars = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.name))
    .attr("width", xScale.bandwidth())
    .attr("y", d => yScale(d.num))
    .attr("height", d => height - yScale(d.num));

  // Add tooltips
  const tooltip = d3.select("#d3-container")
    .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background-color", "#f4f4f4")
    .style("padding", "10px")
    .style("border", "1px solid #ccc")
    .style("z-index", "1");  // Ensures the tooltip is on top

  const tooltipOverlay = d3.select("#d3-container")
    .append("div")
    .style("position", "absolute")
    .style("width", "100%")
    .style("height", "100%")
    .style("visibility", "hidden")
    .style("z-index", "2");  // Higher z-index than the bars

  bars.on("mouseover", (d, i, nodes) => {
    const currentBar = d3.select(nodes[i]);
    const barPosition = currentBar.node().getBoundingClientRect();

    tooltip.text(`${d.full}, ${d.num}`)
      .style("visibility", "visible")
      .style("top", `${barPosition.top - 220}px`)
      .style("left", `${barPosition.left + barPosition.width / 2}px`)
      .style("transform", "translateX(-50%)"); // Center tooltip over the bar

    tooltipOverlay.style("visibility", "visible");
  })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
      tooltipOverlay.style("visibility", "hidden");
    });