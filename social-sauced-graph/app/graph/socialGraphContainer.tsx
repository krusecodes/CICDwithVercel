// // Other import statements...
// import React, { useState, useEffect, useRef } from 'react';
// import SocialGraph from './socialGraph';
// import ChartControl from '../controls/chartControl';
// import Card from '../components/card';

// export default function SocialGraphContainer() {
//   const networkRef = useRef(null);
//   const [graphData, setGraphData] = useState({ nodes: [], edges: [] });

//   // Define connectionBubbleSize inside SocialGraphContainer
//   const connectionBubbleSize = (id, edges) => {
//     let counter = 1;
//     for (let edge of edges) {
//       if (edge.from === id || edge.to === id) {
//         counter++;
//       }
//     }
//     return counter * 15;  // Adjust the multiplier as needed
//   };

//   useEffect(() => {
//     // Fetch data and set state here
//     const graph = {
//       nodes: [
//         { id: 1, size: 0, image: "https://avatars.githubusercontent.com/u/237133?v=4", shape: "circularImage", title: "node 1 tooltip text" },
//         { id: 2, size: 0, image: "https://avatars.githubusercontent.com/u/237133?v=4", shape: "circularImage", title: "node 2 tooltip text" },
//         { id: 3, size: 0, image: "https://avatars.githubusercontent.com/u/237133?v=4", shape: "circularImage", title: "node 3 tooltip text" },
//         { id: 4, size: 0, image: "https://avatars.githubusercontent.com/u/237133?v=4", shape: "circularImage", title: "node 4 tooltip text" },
//         { id: 5, size: 0, image: "https://avatars.githubusercontent.com/u/237133?v=4", shape: "circularImage", title: "node 5 tooltip text" }
//       ],
//       edges: [
//         { from: 1, to: 2 },
//         { from: 1, to: 3 },
//         { from: 2, to: 4 },
//         { from: 2, to: 5 }
//       ]
//     };

//     // Calculate and assign sizes to nodes
//     const nodesWithSize = graph.nodes.map(node => ({
//       ...node,
//       size: connectionBubbleSize(node.id, graph.edges)
//     }));

//     setGraphData({ ...graph, nodes: nodesWithSize });
//     // Add additional logic if needed
//   }, []);

//   // Event handlers and rest of the component...

//   return (
//     <Card className="w-full overflow-hidden">
//       <>
//         <ChartControl /* props */ />
//         <SocialGraph graph={graphData} networkRef={networkRef} /* other props */ />
//       </>
//     </Card>
//   );
// }
