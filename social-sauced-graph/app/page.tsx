"use client";

import { useState } from 'react';
import Card from './components/card'
import ChartControl from './graph/chartControl';
import SocialGraph from './graph/socialGraph';

export default function Home() {
  const [selectedMetric, setSelectedMetric] = useState('a');
  const [selectHighlighter, setSelectHighlighter] = useState(1)

  return (
    <main className="flex min-h-screen w-full p-24">
      <Card heading="Connections Between Contributors" className="w-full">
        <div className="flex justify-center items-center h-full">
          <div className="flex-1 px-4">
            <SocialGraph selectedMetric={selectedMetric} selectHighlighter={selectHighlighter} />
          </div>
          <div className="flex items-center px-4">
            <ChartControl onMetricChange={setSelectedMetric} onHighlightChange={setSelectHighlighter} />
          </div>
        </div>
      </Card>
    </main>
  );
}
