import {
    groupByDate,
    groupBetByDate,
  } from "@src/data/helpers";

import TableRow from "./TableRowPending";

import { MatchesTableProps, Match, Bet } from "@src/types/components";


// Main MatchesTable Component
const MatchesTable: React.FC<MatchesTableProps> = ({ pendingBets }) => {

const test = groupBetByDate(pendingBets);

return (
    <>
    {Object.entries(test).slice(0,3).map(([date, items]) => (
        <div key={date} className="min-w-full rounded-lg mb-4">
        <div>
            <div className="text-left text-gray-700 p-2 bg-black-100 border-none">
            {date}
            </div>
        </div>
        <div>
            {items.map((bet, index) => (
            <TableRow
                key={index}
                bet={bet}
            />
            ))}
        </div>
        </div>
    ))}
    </>
);
};

export default MatchesTable;
