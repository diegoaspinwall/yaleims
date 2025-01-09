import * as functions from "firebase-functions";
import admin from "./firebaseAdmin.js";
import cors from "cors";

const corsHandler = cors({ origin: true });

const db = admin.firestore();

const INITIALBALANCE = 500;

export const updateUserLeaderboard = functions.https.onRequest(async (req, res) => {
  // NOTE: updateLeaderboard calculates a user's total points EXCLUDING any pending bets
  corsHandler(req, res, async () => {
    try {
      const usersRef = db.collection("users_dha_testing");
      // const usersRef = db.collection("users");
      const usersSnapshot = await usersRef.get();

      if (usersSnapshot.empty) {
        return res.status(404).send("No users found");
      }

      // Iterate through all users to calculate their total balance including pending bets
      const leaderboard: { email: string, totalPoints: number }[] = [];

      // Loop over each user and calculate their total points
      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        let totalPoints = INITIALBALANCE; // Start with the initial balance

        // If the user has placed any bets
        if (userData?.bets) {
          for (const bet of userData.bets) {
            const { matchId, betAmount, betOption, betOdds } = bet;

            // If the match is scored (i.e., winner exists), calculate the result of the bet
            const matchRef = db.collection("matches_dha_testing").doc(matchId);
            // const matchRef = db.collection("matches").doc(matchId);
            const matchDoc = await matchRef.get();
            const matchData = matchDoc.data();

            if (matchData?.winner) { // this means the game has been played
              // Check if the betOption matches the winner
              totalPoints -= betAmount;
              if (betOption === matchData.winner || (matchData.forfeit == true && "Forfeit" == betOption)) {
                // If the user won the bet, add the bet amount * betOdds to their total
                totalPoints += betAmount * (betOdds+1);
              }
              // If the user lost the bet, nothing is added (they've already lost the betAmount)
            }
          }
        }

        // Push user email and calculated total points to leaderboard array
        leaderboard.push({
          email: userDoc.id,  // Using email as the user identifier
          totalPoints: totalPoints
        });
      }

      // Sort the leaderboard by total points in descending order
      leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

      // Now, save the leaderboard into the 'leaderboard' collection
      const leaderboardRef = db.collection("user_leaderboard_dha_testing");
      // const leaderboardRef = db.collection("user_leaderboard");
      const batch = db.batch();

      leaderboard.forEach((entry, index) => {
        const leaderboardDocRef = leaderboardRef.doc(entry.email);
        batch.set(leaderboardDocRef, {
          rank: index + 1,  // Ranking starts from 1
          totalPoints: entry.totalPoints,
          email: entry.email,
        });
      });

      await batch.commit();

      return res.status(200).send("Leaderboard updated successfully.");
    } catch (error) {
      console.error("Error updating leaderboard:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});
