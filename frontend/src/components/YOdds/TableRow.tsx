import Image from 'next/image';
import {
    toCollegeName,
    sportsMap,
    emojiMap,
  } from "@src/data/helpers";

import {TableRowProps, Match } from '@src/types/components';

  //TableRow Component
  const TableRow: React.FC<TableRowProps> = ({ match, handleCollegeClick }) => (
    <div className="bg-white grid grid-cols-[auto_1fr_auto] items-center">
      <div className="md:px-6 pl-2 py-4 text-xs md:text-sm text-gray-500">
        {new Date(match.timestamp).toLocaleString("en-US", {
          hour: "2-digit", // "04"
          minute: "2-digit", // "00"
          hour12: true, // "AM/PM"
        })}
      </div>

      {/* Combine Colleges and Scores into one column */}
      <div className="text-left md:px-6 py-4 px-3 text-sm grid md:grid-cols-[0.5fr_0.5fr_0.3fr_0.3fr] md:grid-rows-1 grid-rows-2 grid-flow-col gap-2 items-center">
        
          <>
            <div className="items-start text-xs md:text-sm">
              <strong
                className="cursor-pointer text-black flex items-center"
                onClick={() => handleCollegeClick(match.home_college)} // Replace with your function
                style={{background:'#D7FFEA', border:"6px solid #D7FFEA", borderRadius: '10px'}}
              >
                <Image
                  src={`/college_flags/${
                    toCollegeName[match.home_college]
                  }.png`}
                  alt={match.home_college}
                  width={20}
                  height={20}
                  className="mr-2 object-contain"
                  unoptimized
                />
                {toCollegeName[match.home_college]} +{sportsMap[match.sport]}0
                {//Replace match.sport with the moneyline odds
                }
              </strong>
            </div>

            <div 
              className={`${
                match.away_college === "" ? "hidden" : "block"
              } items-start text-xs md:text-sm`}
              style={{background:'#D7FFEA', border:"6px solid #D7FFEA", borderRadius: '10px'}}
            >
              <strong
                className="cursor-pointer text-black flex items-center"
                onClick={() => handleCollegeClick(match.away_college)} // Replace with your function
              >
                <Image
                  src={`/college_flags/${
                    toCollegeName[match.away_college]
                  }.png`}
                  alt={match.away_college}
                  width={20}
                  height={20}
                  className="mr-2 object-contain"
                  unoptimized
                />
                
                {toCollegeName[match.away_college]} +{sportsMap[match.sport]}0
                {//Replace match.sport with the moneyline odds
                }
              </strong>
            </div>
            
            <div className="cursor-pointer text-left hidden md:block"
            onClick={() => handleCollegeClick(match.away_college)} // Replace with your function
            style={{background:'#CFF6FF', border:"6px solid #CFF6FF", borderRadius: '10px'}}
            >
              <strong> 
                Draw +1000 
              </strong>
            </div>
            <div className="cursor-pointer text-left hidden md:block" 
            onClick={() => handleCollegeClick(match.away_college)} // Replace with your function
            style={{background:'#E4E4E4', border:"6px solid #E4E4E4", borderRadius: '10px'}}
            >
              <strong>

                Forfeit +1000
              </strong>
            </div>

            <div className="cursor-pointer text-right md:hidden text-xs"
            onClick={() => handleCollegeClick(match.away_college)} // Replace with your function
            style={{background:'#CFF6FF', border:"6px solid #CFF6FF", borderRadius: '10px'}}
            >
              <strong>
                Draw +1000 
              </strong>
            </div>
            <div className="cursor-pointer text-right md:hidden text-xs"
            onClick={() => handleCollegeClick(match.away_college)} // Replace with your function
            style={{background:'#E4E4E4', border:"6px solid #E4E4E4", borderRadius: '10px'}}
            >
              <strong>
                Forfeit +1000
              </strong>
            </div>
            
          </>

      </div>

      <div className="text-center px-2 py-1">{emojiMap[match.sport]}</div>
    </div>
  );

export default TableRow;
