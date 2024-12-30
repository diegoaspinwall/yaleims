/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

import { Query } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import admin from "firebase-admin";
import cors from "cors";
import fetch from "node-fetch";
import { sports } from "./helpers.js";

// Initialize Firebase Admin
admin.initializeApp();

const corsHandler = cors({ origin: true });
const INITIALBALANCE = 500; // Initial balance for the user

const db = admin.firestore();

interface College {
  id: string;
  name: string;
  points: number;
}

export const getMyPointsAvailable = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { email } = req.query; // Expect email to be passed as query parameter

    if (!email) {
      return res.status(400).send("Email query parameter is required");
    }

    try {
      const userRef = db.collection("users").doc(email);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        return res.status(404).send("User not found");
      }

      const userData = userDoc.data();
      // const initialBalance = 500; // Initial balance for the user

      // let totalPoints = initialBalance; // Start with the initial balance
      let totalPoints = INITIALBALANCE; // Start with the initial balance

      // If the user has placed any bets
      if (userData?.bets) {
        for (const bet of userData.bets) {
          const { matchId, betAmount, betOption, betOdds } = bet;

          // 1. Add the bet amount to the total (pending, so it's negative)
          totalPoints -= betAmount;

          // 2. If the match is scored (i.e., winner exists), calculate the result of the bet
          const matchRef = db.collection("matches").doc(matchId);
          const matchDoc = await matchRef.get();
          const matchData = matchDoc.data();

          if (matchData?.winner) {
            // Check if the betOption matches the winner
            if (betOption === matchData.winner) {
              // If the user won the bet, add the bet amount * betOdds to their total
              totalPoints += betAmount * betOdds;
            } else {
              // If the user lost the bet, nothing is added (already deducted)
              // totalPoints -= betAmount; // This is redundant as we already subtracted earlier
            }
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


export const addBet = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { email, matchId, betAmount, betOption, betOdds} = req.body;

    // Validation
    if (!email || !matchId || !betAmount || !betOption) {
      return res.status(400).send("Missing required fields");
    }

    if (betAmount <= 0) {
      return res.status(400).send("Bet amount must be greater than 0");
    }

    try {
      // 1. Check if user exists
      const userRef = db.collection("users").doc(email);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return res.status(404).send("User not found");
      }

      // 2. Check if match exists
      const matchRef = db.collection("matches").doc(matchId);
      const matchDoc = await matchRef.get();
      if (!matchDoc.exists) {
        return res.status(404).send("Match not found");
      }

      // 3. Create the bet
      const bet = {
        matchId,
        betAmount,
        betOption,
	betOdds,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      // 4. Update the user's bets
      await userRef.update({
        bets: admin.firestore.FieldValue.arrayUnion(bet),
      });

      /*
      // 5. Deduct points from user's balance (assuming points = betAmount for simplicity)
      await userRef.update({
        points: admin.firestore.FieldValue.increment(-betAmount),
      });
      */

      return res.status(200).send("Bet added successfully");
    } catch (error) {
      console.error("Error adding bet:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});


export const deleteBet = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { email, matchId } = req.body;

    // Validation
    if (!email || !matchId) {
      return res.status(400).send("Email and matchId are required");
    }

    try {
      const userRef = db.collection("users").doc(email);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return res.status(404).send("User not found");
      }

      // 1. Find the bet and remove it
      const userData = userDoc.data();
      const updatedBets = (userData?.bets || []).filter(
        (bet: any) => bet.matchId !== matchId
      );

      // 2. Update user's bets
      await userRef.update({
        bets: updatedBets,
      });

      /*
      // 3. Re-add points to the user's balance
      const betToRemove = userData?.bets?.find(
        (bet: any) => bet.matchId === matchId
      );
      if (betToRemove) {
        await userRef.update({
          points: admin.firestore.FieldValue.increment(betToRemove.betAmount),
        });
      }
      */

      return res.status(200).send("Bet deleted successfully");
    } catch (error) {
      console.error("Error deleting bet:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});

export const updateLeaderboard = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const usersRef = db.collection("users");
      const usersSnapshot = await usersRef.get();

      if (usersSnapshot.empty) {
        return res.status(404).send("No users found");
      }

      // Iterate through all users to calculate their total balance including pending bets
      const leaderboard: { email: string, totalPoints: number }[] = [];

      // Loop over each user and calculate their total points
      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        // const initialBalance = 500; // Each user starts with 500 points
        // let totalPoints = initialBalance; // Start with the initial balance
        let totalPoints = INITIALBALANCE; // Start with the initial balance

        // If the user has placed any bets
        if (userData?.bets) {
          for (const bet of userData.bets) {
            const { matchId, betAmount, betOption, betOdds } = bet;

            // 1. Add the bet amount to the total (pending bets, so it's negative)
            // totalPoints -= betAmount;

            // 2. If the match is scored (i.e., winner exists), calculate the result of the bet
            const matchRef = db.collection("matches").doc(matchId);
            const matchDoc = await matchRef.get();
            const matchData = matchDoc.data();

            if (matchData?.winner) {
              // Check if the betOption matches the winner
              if (betOption === matchData.winner) {
                // If the user won the bet, add the bet amount * betOdds to their total
                totalPoints += betAmount * betOdds;
              } else {
                // If the user lost the bet, nothing is added (they've already lost the betAmount)
                // This is redundant as we already subtracted betAmount earlier
              }
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
      const leaderboardRef = db.collection("leaderboard");
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

