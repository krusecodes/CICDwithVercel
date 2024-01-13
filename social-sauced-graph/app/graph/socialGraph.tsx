import React, { useEffect, useRef, useState } from 'react';
import Graph from 'react-graph-vis';

import { PRData } from './prData';

import Card from '../components/card'

interface SocialGraphProps {
  selectedMetric: string;
  selectHighlighter: number;
}

export default function SocialGraph({ selectedMetric, selectHighlighter }: SocialGraphProps) {
  const networkRef = useRef(null);

  const graph = {
    nodes: [
      { id: 1, size: 0, image: "https://drive.google.com/file/d/19zG4JsSbLlChKbyXFPyDJ2Bpi_GmkGtp/view?usp=sharing", shape: "circularImage", title: "node 1 tooltip text" },
      { id: 2, size: 0, image: "https://drive.google.com/file/d/19zG4JsSbLlChKbyXFPyDJ2Bpi_GmkGtp/view?usp=sharing", shape: "circularImage", title: "node 2 tooltip text" },
      { id: 3, size: 0, image: "https://drive.google.com/file/d/19zG4JsSbLlChKbyXFPyDJ2Bpi_GmkGtp/view?usp=sharing", shape: "circularImage", title: "node 3 tooltip text" },
      { id: 4, size: 0, image: "https://drive.google.com/file/d/19zG4JsSbLlChKbyXFPyDJ2Bpi_GmkGtp/view?usp=sharing", shape: "circularImage", title: "node 4 tooltip text" },
      { id: 5, size: 0, image: "https://drive.google.com/file/d/19zG4JsSbLlChKbyXFPyDJ2Bpi_GmkGtp/view?usp=sharing", shape: "circularImage", title: "node 5 tooltip text" },
      { id: 6, size: 0, image: "https://drive.google.com/file/d/19zG4JsSbLlChKbyXFPyDJ2Bpi_GmkGtp/view?usp=sharing", shape: "circularImage", title: "node 5 tooltip text" },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 2, to: 6},
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

  graph.nodes.forEach(node => {
    node.size = connectionBubbleSize(node.id);
  });

  const contributionBubbleSize = (userId: number) => {
    const userData = PRData.data.find(data => data.user_id === userId);
  
    const userMergedPRs = userData ? userData.merged_prs_count : 0;

    const baseSize = 10;
    const sizeIncrementPerMergedPR = 15;
    const maxSize = 40; 
    const calculatedSize = baseSize + (userMergedPRs * sizeIncrementPerMergedPR);
    return Math.min(calculatedSize, maxSize);
  };

  graph.nodes.forEach(node => {
    node.size = contributionBubbleSize(node.id);
  });
  

  const getConnectionsCount = (graph) => {
    let connectionsCount = {};
    
    // Count connections for each node
    graph.edges.forEach(edge => {
      connectionsCount[edge.from] = (connectionsCount[edge.from] || 0) + 1;
      connectionsCount[edge.to] = (connectionsCount[edge.to] || 0) + 1;
    });
  
    return connectionsCount;
  };
  
  const getTopConnectedNodes = (connectionsCount, topCount) => {
    // Create an array from the connectionsCount object and sort it
    let sortedNodes = Object.keys(connectionsCount).map(key => ({
      id: key,
      count: connectionsCount[key]
    }));
  
    sortedNodes.sort((a, b) => b.count - a.count);
  
    // Return the top 'topCount' nodes
    return sortedNodes.slice(0, topCount).map(node => node.id);
  };

  useEffect(() => {
    // Create a deep copy of the graph data
    let updatedGraph = {
      ...graphData,
      nodes: graphData.nodes.map(node => ({
        ...node,
        size: selectedMetric === 'a' ? connectionBubbleSize(node.id) : contributionBubbleSize(node.id)
      }))
    };
  
    setGraphData(updatedGraph);
  
    // Conditionally perform highlighting based on selectHighlighter
    if (selectHighlighter === 4) {
      let connectionsCount = getConnectionsCount(graphData);
      let topConnectedNodes = getTopConnectedNodes(connectionsCount, 5);
  
      console.log('Top Connected Nodes:', topConnectedNodes); // Log to check the node IDs
  
      if (networkRef.current) {
        networkRef.current.selectNodes(topConnectedNodes, true);
      }
    } else {
      if (networkRef.current) {
        networkRef.current.selectNodes([], false); // Clear selection
      }
    }
  }, [graphData, selectedMetric, selectHighlighter]);
  

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
