import React, { useEffect, useRef, useState } from 'react';
import Graph from 'react-graph-vis';

import Card from '../components/card'

interface SocialGraphProps {
  selectedMetric: string;
}

export default function SocialGraph({ selectedMetric }: SocialGraphProps) {
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

  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };

  const [graphData, setGraphData] = useState(graph);

  //  search

  const connectionBubbleSize = (id: number) => {
    const graphEdges = graph.edges.length;
    let counter = 1;
    for (let i = 0; i < graphEdges; i++) {
      if (graph.edges[i].from == id || graph.edges[i].to == id) {
        counter++;
      }
    }
    return counter * 15;
  }

  // add search
  //   const array = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Carol' }];
  // const foundObject = array.find(object => object.name === 'Bob');
  // console.log(foundObject); // { name: 'Bob' }

  // Calculate and assign sizes to nodes
  graph.nodes.forEach(node => {
    node.size = connectionBubbleSize(node.id);
  });

  // useEffect(() => {
  //   if (selectedMetric === 'a') {
  //     graph.nodes.forEach(node => {
  //       node.size = connectionBubbleSize(node.id);
  //     });
  //   }
  // }, [selectedMetric]);

  // Update size based on Contributions for every id map number of prs_merged to the size
  //   1. loop through all ids
  // 2. call API to get mergedPrs
  // 3. Add that to each node.size instead of what was there before
  // graph.nodes.forEach(node => {
  //   node.size = contributionBubbleSize(node.id);
  // });

  const defaultSize = 32;
  useEffect(() => {
    // Create a deep copy of the graph data
    let updatedGraph = {
      ...graphData,
      nodes: graphData.nodes.map(node => ({
        ...node,
        size: selectedMetric === 'a' ? connectionBubbleSize(node.id) : defaultSize // replace 'defaultSize' with your default size logic
      }))
    };

    setGraphData(updatedGraph); // Update the state with the modified graph
  }, [selectedMetric]); // Dependency array includes selectedMetric

  // Use this function to access the network instance
  const events = {
    select: function (event: any) {
      var { nodes, edges } = event;
    },
    stabilized: function (event: any) {
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
          graph={graphData}
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
