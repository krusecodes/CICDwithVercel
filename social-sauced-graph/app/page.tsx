"use client";

import Card from './components/card'
import ChartControl from './controls/chartControl';
import SocialGraph from './graph/socialGraph';

export default function Home() {

  return (
    <main className="flex min-h-screen w-full p-24">
      <Card heading="Connections Between Contributors" className="w-full">
        <div className="flex justify-center items-center h-full">
          <div className="flex-1 px-4">
            <SocialGraph />
          </div>
          <div className="flex items-center px-4">
            <ChartControl />
          </div>
        </div>
      </Card>
    </main>
  );
}
// return (
//   <main className="flex min-h-screen items-center justify-center w-full p-24 bg-gray-100">
//     <Card heading="Connections Between Contributors" className="flex w-full max-w-6xl mx-auto bg-white border rounded-lg shadow-lg">
//       <div className="flex w-full h-auto"> {/* Remove h-full to let content dictate height */}
//         <div className="flex-1 px-4"> {/* SocialGraph taking up the full flex area */}
//           <div className="h-96"> {/* Height utility to make SocialGraph taller */}
//             <SocialGraph />
//           </div>
//         </div>
//         <div className="flex flex-col justify-center px-4"> {/* ChartControl centered */}
//           <ChartControl />
//         </div>
//       </div>
//     </Card>
//   </main>
// );
