// Function to calculate odds
// Note: bettingVolume takes the form of: exampleBettingVolume = {team1: 100, team2: 150, draw: 50}
function oddsCalculator(
  team1WinPercentage: number, // Team 1's win percentage from past games (0 to 1)
  team2WinPercentage: number, // Team 2's win percentage from past games (0 to 1)
  bettingVolume: { team1: number; team2: number; draw: number } // Betting volume for each outcome
): Odds {
  // Default odds (used when data is insufficient)
  const defaultOdds = { team1Win: 0.45, team2Win: 0.45, draw: 0.10 };

  // Normalize betting volume
  const totalBettingVolume =
    bettingVolume.team1 + bettingVolume.team2 + bettingVolume.draw;
  const bettingWeight = totalBettingVolume > 0 ? 1 : 0; // Weight based on the presence of betting data

  const team1BettingShare =
    totalBettingVolume > 0 ? bettingVolume.team1 / totalBettingVolume : 0.33;
  const team2BettingShare =
    totalBettingVolume > 0 ? bettingVolume.team2 / totalBettingVolume : 0.33;
  const drawBettingShare =
    totalBettingVolume > 0 ? bettingVolume.draw / totalBettingVolume : 0.34;

  // Use provided win percentages for past performance
  const pastGamesWeight = 1; // Weight based on the assumption that win percentages are always provided
  const team1Performance = team1WinPercentage;
  const team2Performance = team2WinPercentage;
  const drawPerformance = 1 - team1WinPercentage - team2WinPercentage;

  // Combine past performance and betting volume using a weighted average
  const team1Win =
    (team1Performance * pastGamesWeight + team1BettingShare * bettingWeight) /
    (pastGamesWeight + bettingWeight || 1);

  const team2Win =
    (team2Performance * pastGamesWeight + team2BettingShare * bettingWeight) /
    (pastGamesWeight + bettingWeight || 1);

  const draw =
    (drawPerformance * pastGamesWeight + drawBettingShare * bettingWeight) /
    (pastGamesWeight + bettingWeight || 1);

  // Normalize the odds to ensure they sum to 1
  const totalOdds = team1Win + team2Win + draw;

  return {
    team1Win: totalOdds > 0 ? team1Win / totalOdds : defaultOdds.team1Win,
    team2Win: totalOdds > 0 ? team2Win / totalOdds : defaultOdds.team2Win,
    draw: totalOdds > 0 ? draw / totalOdds : defaultOdds.draw,
  };
}

// oddsToMoneyLine function

// moneyLineToOdds function
