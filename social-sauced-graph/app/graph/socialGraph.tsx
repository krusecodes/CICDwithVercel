import React, { useEffect, useRef } from 'react';
import Graph from 'react-graph-vis';

import Card from '../components/card'

export default function SocialGraph() {
  const networkRef = useRef(null);

  const graph = {
    nodes: [
      { id: 1, size: 0, image: "https://avatars.githubusercontent.com/u/237133?v=4", shape: "circularImage", title: "node 1 tooltip text" },
      { id: 2, size: 0, image: "https://avatars.githubusercontent.com/u/237133?v=4", shape: "circularImage", title: "node 2 tooltip text" },
      { id: 3, size: 0, image: "https://avatars.githubusercontent.com/u/237133?v=4", shape: "circularImage", title: "node 3 tooltip text" },
      { id: 4, size: 0, image: "https://avatars.githubusercontent.com/u/237133?v=4", shape: "circularImage", title: "node 4 tooltip text" },
      { id: 5, size: 0, image: "https://avatars.githubusercontent.com/u/237133?v=4", shape: "circularImage", title: "node 5 tooltip text" }
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]
  };


  const connectionBubbleSize = (id: number) => {
    const graphEdges = graph.edges.length;
    let counter = 1;
    for (let i = 0; i < graphEdges; i++) {
      if (graph.edges[i].from == id || graph.edges[i].to == id) {
        counter++;
      }
    }
    return counter * 10;
  }

  //post process
  // const populateBubbleSize = () => {
  //   const nodes = graph.nodes.length;
  //   let counter = 0;
  //   for (let i = 0; i < nodes; i++) {
  //     // if (graph.edges[i].from == id) {
  //     //   counter++;
  //     // }
  //     graph.nodes[i].size = connectionBubbleSize(graph.nodes[i].id)
  //   }
  // }

  // populateBubbleSize();

  // Calculate and assign sizes to nodes
  graph.nodes.forEach(node => {
    node.size = connectionBubbleSize(node.id);
  });

  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };

  // Use this function to access the network instance
  const events = {
    select: function(event: any) {
      var { nodes, edges } = event;
    },
    stabilized: function(event: any) {
      if (networkRef.current) {
        // For example, to highlight nodes with ids 1 and 3
        networkRef.current.selectNodes([1, 3], true);
      }
    }
  };

  // the below code is how I will distinguish how what should be highlighted and when
  // useEffect to handle component updates
  // useEffect(() => {
    // This can be triggered by a state change, for instance
    // if (networkRef.current) {
      // Highlight nodes whenever you need by calling this method
      // networkRef.current.selectNodes([1, 3], true);
    // }
  // }, [ dependencies that might trigger the highlight]);

  return (
    <Card className="w-full overflow-hidden">
      <div className="h-192">
        <Graph
          graph={graph}
          options={options}
          events={events}
          getNetwork={(network: any) => {
            // Store the network instance to the ref when it's available
            networkRef.current = network;
          }}
        />
      </div>
    </Card>
  )
};
