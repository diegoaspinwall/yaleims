import React from 'react';
import { colleges } from '../../data/colleges';

const Leaderboard: React.FC = () => {
  // Sort colleges by points in descending order
  const collegeArray = Object.values(colleges);
  const sortedColleges = collegeArray.sort((a, b) => b.points - a.points);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-600">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">College</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Points</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedColleges.map((college, index) => (
            <tr key={college.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{college.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{college.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
