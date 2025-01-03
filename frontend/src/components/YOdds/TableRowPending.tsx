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
        {/* Determine the winner and loser 
            JUST KIDDING we don't need a winner and loser!
        */}
        
        {match.home_college_score > 1 ? (
          // Home college wins
          //JUST KIDDING!
          //We have the same format for every match
          <>
            <div className="items-start text-xs md:text-sm">
              <strong
                className="text-black flex items-center"
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
            {match.away_college != "Bye" ? (
              <div 
                className={`${
                  match.away_college === "" ? "hidden" : "block"
                } items-start text-xs md:text-sm`}
              >
                <strong
                  className="text-black flex items-center"
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
                  
                  {toCollegeName[match.away_college]}
                  {//Replace match.sport with the moneyline odds
                  }
                </strong>
              </div>
            ) 
            
            
            : (
              <div className="pl-7 font-bold">BYE</div>
            )}


            
            <div className="text-left hidden md:block"            >
              <strong> 
                100 Coins 
              </strong>
            </div>
            <div className="cursor-pointer text-center hidden md:block" 
            onClick={() => handleCollegeClick(match.away_college)} // Replace with your function
            style={{background:'#FFD7D8', border:"6px solid #FFD7D8", borderRadius: '10px'}}
            >
              <strong>

                CANCEL
              </strong>
            </div>

            <div className="text-right md:hidden text-xs"            >
              <strong>
                100 Coins
              </strong>
            </div>
            <div className="cursor-pointer text-center md:hidden text-xs"
            onClick={() => handleCollegeClick(match.away_college)} // Replace with your function
            style={{background:'#FFD7D8', border:"6px solid #FFD7D8", borderRadius: '10px'}}
            >
              <strong>
                CANCEL
              </strong>
            </div>
            
              
          </>














        ) : match.home_college_score <= match.away_college_score ? (
          // Away college wins
          // Home college wins
          //JUST KIDDING!
          //We have the same format for every match
          <>
            <div className="items-start text-xs md:text-sm">
              <strong
                className="text-black flex items-center"
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
                {toCollegeName[match.home_college]}
                {//Replace match.sport with the moneyline odds
                }
              </strong>
            </div>
            {match.away_college != "Bye" ? (
              <div 
                className={`${
                  match.away_college === "" ? "hidden" : "block"
                } items-start text-xs md:text-sm`}
              >
                <strong
                  className="text-black flex items-center"
                  style={{background:'#D7FFEA', border:"6px solid #D7FFEA", borderRadius: '10px'}}
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
                  
                  {toCollegeName[match.away_college]} +{sportsMap[match.sport]}00
                  {//Replace match.sport with the moneyline odds
                  }
                </strong>
              </div>
            ) 
            
            
            : (
              <div className="pl-7 font-bold">BYE</div>
            )}


            
            <div className="text-left hidden md:block"            >
              <strong> 
                100 Coins 
              </strong>
            </div>
            <div className="cursor-pointer text-center hidden md:block" 
            onClick={() => handleCollegeClick(match.away_college)} // Replace with your function
            style={{background:'#FFD7D8', border:"6px solid #FFD7D8", borderRadius: '10px'}}
            >
              <strong>

                CANCEL
              </strong>
            </div>

            <div className="text-right md:hidden text-xs"            >
              <strong>
                100 Coins
              </strong>
            </div>
            <div className="cursor-pointer text-center md:hidden text-xs"
            onClick={() => handleCollegeClick(match.away_college)} // Replace with your function
            style={{background:'#FFD7D8', border:"6px solid #FFD7D8", borderRadius: '10px'}}
            >
              <strong>
                CANCEL
              </strong>
            </div>
            
              
          </>





















        ) : (
          // Draw
          <>
            <div className="items-start text-xs md:text-sm">
              <strong
                className="cursor-pointer text-gray-400 flex items-center"
                onClick={() => handleCollegeClick(match.home_college)} // Replace with your function
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
                {toCollegeName[match.home_college]}
                <span className="text-yellow-300 text-xs">
                  +{sportsMap[match.sport] / 2}pts
                </span>
              </strong>
            </div>
            <div className="items-start text-xs md:text-sm">
              <strong
                className="cursor-pointer text-gray-400 flex items-center"
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
                {toCollegeName[match.away_college]}
                <span className="text-yellow-300 text-xs">
                  +{sportsMap[match.sport] / 2}pts
                </span>
              </strong>
            </div>
            <div className="text-left hidden md:block">
              <strong className="text-gray-400">
                {match.home_college_score ? match.home_college_score : 0}
              </strong>
              -
              <strong className="text-gray-400">
                {match.away_college_score ? match.away_college_score : 0}
              </strong>
            </div>
            <div className="text-right md:hidden text-xs">
              <strong className="text-gray-400">
                {match.home_college_score ? match.home_college_score : 0}
              </strong>
            </div>
            <div className="text-right md:hidden text-xs">
              <strong className="text-gray-400">
                {match.home_college_score ? match.home_college_score : 0}
              </strong>
            </div>
          </>

        )}
      </div>

      <div className="text-center px-2 py-1">{emojiMap[match.sport]}</div>
    </div>
  );

export default TableRow;