document.addEventListener('DOMContentLoaded', () => {
           // Custom input data for scaling
           const payer = {
            "name": "Payer 1",
            "value": 12200000,
            "hcUpperBound": 8000000,
            "hcLowerBound": 16000000,
            "lcUpperBound": 10000000,
            "lcLowerBound": 13500000,
            "lwcUpperBound": 12000000,
            "lwcLowerBound": 12500000,
            "minValue": 8000000,
            "maxValue": 15000000
        };

        // Set SVG dimensions
        const width = 600;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const pers10 = (payer.maxValue - payer.minValue) * 0.1;
        const pers05 = (payer.maxValue - payer.minValue) * 0.02;

        // Gaussian function parameters (for visual purposes)
        const mu = payer.value;
        const sigma = (payer.maxValue - payer.minValue) / 6;  // Estimate sigma based on the range (6-sigma rule)

        // Gaussian function definition
        function gaussian(x, mu, sigma) {
            const factor = 1 / (sigma * Math.sqrt(2 * Math.PI));
            const exponent = -0.5 * Math.pow((x - mu) / sigma, 2);
            return factor * Math.exp(exponent);
        }

        // Generate data points for Gaussian distribution
        const data = [];
        for (let x = payer.minValue; x <= payer.maxValue + pers10; x += pers05) {
            data.push({ x: x, y: gaussian(x, mu, sigma) });
        }

        // Set up x and y scales
        const xScale = d3.scaleLinear()
            .domain([payer.minValue, payer.maxValue + pers10])
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y)]) // Adjust the Y max based on the generated data
            .range([height - margin.bottom, margin.top]);

        // Append the SVG canvas
        const svg = d3.select("svg");

        // Define segments using the input bounds, keeping separate bounds but using the same color for lc, hc, and lwc bounds
        const segments = [
            { lower: payer.minValue, upper: payer.hcUpperBound, color: '#f99' }, // low confidence lower bound
            { lower: payer.hcUpperBound, upper: payer.hcLowerBound, color: 'rgba(0, 158, 115, 0.2)' }, // low confidence upper bound
            { lower: payer.lcUpperBound, upper: payer.lcLowerBound, color: 'rgba(0, 158, 115, 0.4)' }, // medium confidence bounds
            { lower: payer.lwcUpperBound, upper: payer.lwcLowerBound, color: 'rgba(0, 158, 115, 0.6)' }, // high confidence bounds
        ];

        // Loop through segments and fill them
        segments.forEach((segment) => {
            const segmentData = data.filter(d => d.x >= segment.lower && d.x <= segment.upper);

            // Line generator for filled area
            const area = d3.area()
                .x(d => xScale(d.x))
                .y0(yScale(0))  // Y baseline (fill to the x-axis)
                .y1(d => yScale(d.y));

            // Append the path for the Gaussian segment area
            svg.append("path")
                .datum(segmentData)
                .attr("fill", segment.color)  // Use the same color for bounds in the same confidence level
                .attr("stroke", "none")
                .attr("d", area);
        });

        // Create line generator for the curve
        const line = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

        // Append the line for the Gaussian curve
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Create X axis
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).tickFormat(d => d3.format(",")(d))); // Format large numbers with commas

        // Create Y axis
        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));
