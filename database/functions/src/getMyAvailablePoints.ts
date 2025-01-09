import * as functions from "firebase-functions";
import admin from "./firebaseAdmin.js";
import cors from "cors";

const corsHandler = cors({ origin: true });

const db = admin.firestore();

const INITIALBALANCE = 500; // Initial balance for the user

export const getMyAvailablePoints = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { email } = req.query;

    if (typeof email !== 'string') {
      return res.status(400).send('Email must be a valid string');
    }

    if (!email) {
      return res.status(400).send("Email query parameter is required");
    }

    try {
      const userRef = db.collection("users_dha_testing").doc(email);
      // const userRef = db.collection("users").doc(email);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        return res.status(404).send("User not found");
      }

      const userData = userDoc.data();

      let totalPoints = INITIALBALANCE; // Start with the initial balance

      // If the user has placed any bets
      if (userData?.bets) {
        for (const bet of userData.bets) {
          const { matchId, betAmount, betOption, betOdds } = bet;
          // TODO: add team1, team2 and sport to bet!

          // 1. Add the bet amount to the total (pending, so it's negative)
          totalPoints -= betAmount;

          // 2. If the match is scored (i.e., winner exists), calculate the result of the bet
          const matchRef = db.collection("matches_dha_testing").doc(matchId);
          // const matchRef = db.collection("matches").doc(matchId);
          const matchDoc = await matchRef.get();
          const matchData = matchDoc.data();

          if (matchData?.winner || matchData?.forfeit) { // the game has been played if there is a winner or forfeit is true
            // Check if the betOption matches the winner
            if (betOption === matchData.winner || (matchData.forfeit == true && "Forfeit" == betOption)) {
              // If the user won the bet, add the bet amount * (betOdds+1) to their total
              totalPoints += betAmount * (betOdds+1);
            }
            // If the user lost the bet, nothing is added (already deducted)
          }
        }
      }

      return res.status(200).json({ points: totalPoints });
    } catch (error) {
      console.error("Error fetching user points:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});


