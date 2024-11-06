import { Box } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import "../assets/css/h2sStyles.css";

const themeColors = {
     fontFamily: '"Inter", sans-serif',
     bgColor: "#252954",
     bodyColor: "#9b9ca7",
     mainBg: "#0e0e23",
     primaryColor: "#4255d4",
     cardBg: "rgb(26, 32, 73)",
     cardBgGradient:
          "radial-gradient(circle, rgba(26, 32, 73, 1) 0%, rgba(19, 22, 47, 1) 100%)",
     textColor: "#fff",
     spikeColor: "#ff4c4c",
  
};

const generateH2SData = () => {
     const data = [];
     let currentValue = 6; // Initial normal value within 4 to 10 PPM range

     for (let i = 0; i < 100; i++) {
          // Create a spike sequence between index 40 and 49
          if (i >= 40 && i <= 49) {
               const spikeValues = [20, 32, 58, 88, 95, 102, 110, 95, 80, 10];
               currentValue = spikeValues[i - 40];
          } else {
               // Normal random values between 4 and 10 PPM
               currentValue = Math.random() * 6 + 4;
          }

          // Set border color based on the threshold
          const borderColor =
               currentValue >= 20
                    ? themeColors.spikeColor
                    : themeColors.primaryColor;

          // Log spike colors for debugging
          if (borderColor === themeColors.spikeColor) {
               console.log("borderColor is spike color", borderColor);
          }

          // Push data with borderColor
          data.push({
               x: new Date(2024, 0, 1, 0, i),
               y: currentValue,
               borderColor,
          });
     }

     return [
          {
               id: "H2S Content",
               data: data,
          },
     ];
};

const LineChart = () => {
     const data = generateH2SData();

     const customLayer = ({ points }) => (
          <g>
               {points.map((point) => (
                    <circle
                         key={point.id}
                         cx={point.x}
                         cy={point.y}
                         r={8} // Adjust size as needed
                         fill={themeColors.cardBg}
                         stroke={
                              point.data.borderColor || themeColors.primaryColor
                         }
                         strokeWidth={2}
                    />
               ))}
          </g>
     );

     return (
          <ResponsiveLine
               data={data}
               theme={{
                    axis: {
                         domain: { line: { stroke: themeColors.bodyColor } },
                         legend: {
                              text: {
                                   fill: themeColors.bodyColor,
                                   fontSize: 20,
                              },
                         },
                         ticks: {
                              line: {
                                   stroke: themeColors.bodyColor,
                                   strokeWidth: 1,
                              },
                              text: {
                                   fill: themeColors.bodyColor,
                                   fontSize: 15,
                              },
                         },
                    },
                    legends: {
                         text: { fill: themeColors.bodyColor, fontSize: 15 },
                    },
                    tooltip: {
                         container: {
                              color: themeColors.textColor,
                              background: themeColors.cardBg,
                         },
                    },
               }}
               colors={[themeColors.primaryColor]}
               margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
               xScale={{
                    type: "time",
                    format: "%Y-%m-%dT%H:%M:%SZ",
                    useUTC: false,
                    precision: "minute",
               }}
               yScale={{
                    type: "linear",
                    min: 0,
                    max: "auto",
                    stacked: false,
                    reverse: false,
               }}
               yFormat=" >-.2f"
               curve="catmullRom"
               axisTop={null}
               axisRight={null}
               axisBottom={{
                    orient: "bottom",
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Time (minute intervals)",
                    legendOffset: 40,
                    legendPosition: "middle",
                    format: "%H:%M",
               }}
               axisLeft={{
                    orient: "left",
                    tickValues: 5,
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "H2S PPM",
                    legendOffset: -50,
                    legendPosition: "middle",
               }}
               enableGridX={false}
               enableGridY={false}
               pointSize={0} // Hide default points to avoid overlap
               useMesh={true}
               legends={[
                    {
                         anchor: "bottom-right",
                         direction: "column",
                         justify: false,
                         translateX: 100,
                         translateY: 0,
                         itemsSpacing: 0,
                         itemDirection: "left-to-right",
                         itemWidth: 80,
                         itemHeight: 20,
                         itemOpacity: 0.75,
                         symbolSize: 12,
                         symbolShape: "circle",
                         symbolBorderColor: themeColors.bodyColor,
                         itemTextColor: themeColors.bodyColor,
                         effects: [
                              {
                                   on: "hover",
                                   style: {
                                        itemBackground: themeColors.cardBg,
                                        itemOpacity: 1,
                                   },
                              },
                         ],
                    },
               ]}
               enableArea={true}
               areaOpacity={0.3}
               defs={[
                    {
                         id: "gradientArea",
                         type: "linearGradient",
                         colors: [
                              {
                                   offset: 0,
                                   color: themeColors.primaryColor,
                                   opacity: 0.7,
                              },
                              { offset: 100, color: "transparent" },
                         ],
                    },
               ]}
               fill={[{ match: { id: "H2S Levels" }, id: "gradientArea" }]}
               layers={[
                    "grid",
                    "markers",
                    "axes",
                    "areas",
                    "lines",
                    "slices",
                    "mesh",
                    "legends",
                    customLayer, // Add the custom layer for conditional point border color
               ]}
          />
     );
};

const Ideas = () => {
     return (
          <div className="user-box fourth-box">
               <div className="chart-wrapper">
                    <div
                         style={{
                              background: themeColors.cardBgGradient,
                              padding: "20px",
                              borderRadius: "10px",
                         }}
                    >
                         <h2
                              style={{
                                   color: themeColors.textColor,
                                   fontFamily: themeColors.fontFamily,
                                   textAlign: "center",
                                   marginBottom: "20px",
                              }}
                         >
                              H2S Tracking
                         </h2>
                         <Box m="20px">
                              <Box className="card">
                                   <LineChart />
                              </Box>
                         </Box>
                    </div>
               </div>
          </div>
     );
};

export default Ideas;
