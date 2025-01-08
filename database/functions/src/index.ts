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

const db = admin.firestore();

interface College {
  id: string;
  name: string;
  points: number;
}

interface AddBetRequestBody {
  email: string;
  matchId: string;
  betAmount: number;
  betOption: string;
  betOdds: number;
  away_college: string;
  home_college: string;
  sport: string;
}

interface DelBetRequestBody {
  email: string;
  matchId: string;
}

const INITIALBALANCE = 500; // Initial balance for the user

export const getMyAvailablePoints = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { email } = req.body; // Expect email to be passed in query body

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

          if (matchData?.winner) { // the game has been played if there is a winner
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


export const addBet = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { email, matchId, betAmount, betOption, betOdds, away_college, home_college, sport }: AddBetRequestBody = req.body;

    // Validation
    if (!email || !matchId || !betAmount || !betOption || !away_college || !home_college || !sport) {
      return res.status(400).send("Missing required fields");
    }

    if (betAmount <= 0) {
      return res.status(400).send("Bet amount must be greater than 0");
    }

    try {
      // 1. Check if user exists
      const userRef = db.collection("users_dha_testing").doc(email);
      // const userRef = db.collection("users").doc(email);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return res.status(404).send("User not found");
      }

      // 2. Check if match exists
      const matchRef = db.collection("matches_dha_testing").doc(matchId);
      // const matchRef = db.collection("matches").doc(matchId);
      const matchDoc = await matchRef.get();
      if (!matchDoc.exists) {
        return res.status(404).send("Match not found");
      }

      console.log("Request body:", req.body);
      console.log("User document data:", userDoc.data());
      console.log("Match document data:", matchDoc.data());

      // 3. Create the bet
      const bet = {
        matchId,
        betAmount,
        betOption,
	betOdds,
        away_college,
        home_college,
        sport,
        // createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      // 4. Update the user's bets
      await userRef.update({
        bets: admin.firestore.FieldValue.arrayUnion(bet),
      });

      // 5. Update the match's betting volume
      if (betOption == "Forfeit") {
        matchRef.update({
          forfeit_volume: admin.firestore.FieldValue.increment(betAmount)
        })
      } else if (betOption == "Draw") {
        matchRef.update({
          draw_volume: admin.firestore.FieldValue.increment(betAmount)
        })
      } else if (betOption == away_college) {
        matchRef.update({
          away_college_volume: admin.firestore.FieldValue.increment(betAmount)
        })
      } else if (betOption == home_college) {
        matchRef.update({
          home_college_volume: admin.firestore.FieldValue.increment(betAmount)
        })
      } else {
        console.error("betOption doesn't exist")
      }
        
      return res.status(200).send("Bet added successfully");
    } catch (error) {
      console.error("Error adding bet:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});

export const deleteBet = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { email, matchId }: DelBetRequestBody = req.body;

    // Validation
    if (!email || !matchId) {
      return res.status(400).send("Email and matchId are required");
    }

    try {
      const userRef = db.collection("users_dha_testing").doc(email);
      // const userRef = db.collection("users").doc(email);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return res.status(404).send("User not found");
      }
      const userData = userDoc.data()

      if (!userData || !Array.isArray(userData.bets)) {
        return res.status(404).send("No bets found for this user");
      }

      const matchRef = db.collection("matches_dha_testing").doc(matchId);
      // const matchRef = db.collection("matches").doc(matchId);
      const matchDoc = await matchRef.get();
      if (!matchDoc.exists) {
        return res.status(404).send("Match not found");
      }

      // 1. Update the match's betting volume
      const bet = userData.bets.find((bet: any) => bet.matchId === matchId);
      if (bet.betOption == "Forfeit") {
        matchRef.update({
          forfeit_volume: admin.firestore.FieldValue.increment(bet.betAmount)
        })
      } else if (bet.betOption == "Draw") {
        matchRef.update({
          draw_volume: admin.firestore.FieldValue.increment(bet.betAmount)
        })
      } else if (bet.betOption == bet.away_college) {
        matchRef.update({
          away_college_volume: admin.firestore.FieldValue.increment(bet.betAmount)
        })
      } else if (bet.betOption == bet.home_college) {
        matchRef.update({
          home_college_volume: admin.firestore.FieldValue.increment(bet.betAmount)
        })
      } else {
        console.error("betOption doesn't exist")
      }

      // 2. Find the bet and remove it
      const updatedBets = (userData?.bets || []).filter(
        (bet: any) => bet.matchId !== matchId
      );

      // 3. Update user's bets
      await userRef.update({
        bets: updatedBets,
      });

      return res.status(200).send("Bet deleted successfully");
    } catch (error) {
      console.error("Error deleting bet:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});

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


export const fetchOrAddUser = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const { email } = req.body; // The email passed directly in the request

    // Step 1: Check that the email is a Yale email
    if (!email || !email.endsWith("@yale.edu")) {
      res.status(403).json({ error: "You must use a Yale email to sign in." });
      return;
    }

    try {
      // Step 2: Reference Firestore Document (Use Email as Document ID)
       const userRef = admin.firestore().collection("users_dha_testing").doc(email);
      // const userRef = admin.firestore().collection("users").doc(email);
      const userDoc = await userRef.get();

      // Step 3: If User Exists, Return Data
      if (userDoc.exists) {
        res
          .status(200)
          .json({ message: "User already exists.", user: userDoc.data() });
        return;
      }

      // Step 4: Fetch User Details from Yalies API
      const yaliesResponse = await fetch("https://yalies.io/api/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjUzNzcxNTIsInN1YiI6ImF3eDIifQ.sKmMqhsyh71EIqfLPMqIx50py3nhhzo6kkq7OKPiHM8",
        },
        body: JSON.stringify({
          filters: { email: [email] },
          page: 1,
          page_size: 1,
        }),
      });

      if (!yaliesResponse.ok) {
        res
          .status(500)
          .json({ error: "Failed to fetch data from the Yalies API." });
        return;
      }

      const yaliesData: any = await yaliesResponse.json();
      if (yaliesData.length === 0) {
        res.status(404).json({ error: `No data found for email: ${email}` });
        return;
      }

      const yaliesInfo: any = yaliesData[0];
      const { first_name, last_name, college } = yaliesInfo;

      const newUser = {
        email: email,
        firstname: first_name,
        lastname: last_name,
        matches: [],
        points: 0,
        college: college || null,
        role: "user", // default role; otherwise "admin" can be set in firestore
      };

      await userRef.set(newUser);
      res
        .status(200)
        .json({ message: "User successfully added.", user: newUser });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

export const getLeaderboard = functions.https.onRequest((req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const leaderboardRef = db.collection("colleges");
      const snapshot = await leaderboardRef.orderBy("points", "desc").get();

      if (snapshot.empty) {
        res.status(404).send("No colleges found");
        return;
      }

      const leaderboard: College[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        leaderboard.push({
          id: doc.id,
          name: data.name,
          points: data.points,
        } as College);
      });
      //console.log('Leaderboard data:', JSON.stringify(leaderboard, null, 2));
      res.status(200).json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard from Function Code:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

export const getMatches = functions.https.onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { type, sortOrder = "desc" } = req.query; // Retrieve the 'type' and 'sortOrder' query parameters
      const currentDate = new Date();
      let query: Query = db.collection("matches_dha_testing"); // Explicitly use Query type
      // let query: Query = db.collection("matches"); // Explicitly use Query type

      // Apply filtering based on the 'type' query parameter (all, past, or future)
      if (type === "past") {
        query = query.where("timestamp", "<", currentDate); // Get past matches
      } else if (type === "future") {
        query = query.where("timestamp", ">", currentDate); // Get future matches
      }

      query = query.orderBy("timestamp", sortOrder as "asc" | "desc");

      // Fetch the matches from Firestore
      const snapshot = await query.get();

      if (snapshot.empty) {
        return res.status(404).send("No matches found");
      }

      // Process the query result and format the data
      const matches = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          matchId: doc.id,
          home_college: data.home_college,
          away_college: data.away_college,
          sport: data.sport,
          home_college_score: data.home_college_score,
          away_college_score: data.away_college_score,
          winner: data.winner,
          timestamp:
            data.timestamp && data.timestamp.toDate
              ? data.timestamp.toDate().toISOString()
              : null, // Fallback if timestamp is missing or invalid
        };
      });

      // Return the matches as a JSON response
      return res.status(200).json(matches);
    } catch (error) {
      console.error("Error fetching matches:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});

// returns the college data for a given collegeId
export const getCollege = functions.https.onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { collegeId } = req.query;

      if (!collegeId) {
        return res.status(400).send("Missing 'collegeId' query parameter");
      }

      const collegeDoc = await db
        .collection("colleges")
        .doc(collegeId as string)
        .get();

      if (!collegeDoc.exists) {
        return res.status(404).send("College not found");
      }

      const collegeData = collegeDoc.data();
      return res.status(200).json(collegeData);
    } catch (error) {
      console.error("Error fetching college data:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});

// gets unscored matches (winner is null) that have already occurred (timestamp is in the past)
export const getUnscoredMatches = functions.https.onRequest(
  async (req, res) => {
    return corsHandler(req, res, async () => {
      try {
        const currentDate = new Date();

        const snapshot = await db
          .collection("matches_dha_testing")
          // .collection("matches")
          .where("winner", "==", null)
          .where("timestamp", "<", currentDate) // get past matches
          .orderBy("timestamp", "asc") // orders oldest first
          .get();

        if (snapshot.empty) {
          return res.status(200).json({ success: true, matches: [] });
        }

        const matches = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return res.status(200).json({ success: true, matches: matches });
      } catch (error) {
        console.error("Error fetching unscored matches:", error);
        return res.status(500).send("Internal Server Error");
      }
    });
  }
);

export const scoreMatch = functions.https.onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const {
        matchId,
        homeScore,
        awayScore,
        homeForfeit,
        awayForfeit,
        homeTeam,
        awayTeam,
        sport,
      } = req.body;

      if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
      }

      // validate request parameters
      if (
        !matchId ||
        typeof homeScore !== "number" ||
        typeof awayScore !== "number" ||
        typeof homeForfeit !== "boolean" ||
        typeof awayForfeit !== "boolean" ||
        typeof homeTeam !== "string" ||
        typeof awayTeam !== "string" ||
        typeof sport !== "string"
      ) {
        return res.status(400).send("Error with parameters");
      }

      let winningTeam: string;
      const doubleForfeit = homeForfeit && awayForfeit;

      // there's some forfeit logic here that i'm a little confused about
      if (doubleForfeit) {
        winningTeam = "Default"; // not sure if i understood this correctly
      } else if (homeForfeit || awayForfeit) {
        homeForfeit ? (winningTeam = awayTeam) : (winningTeam = homeTeam);
      } else if (homeScore == awayScore) {
        winningTeam = "Draw";
      } else {
        homeScore > awayScore
          ? (winningTeam = homeTeam)
          : (winningTeam = awayTeam);
      }

      // update match data in Firestore
      const matchUpdateData = {
        home_college_score: homeScore,
        away_college_score: awayScore,
        forfeit: homeForfeit || awayForfeit,
        winner: winningTeam,
      };

      // update college stats
      const collegeUpdateData: any = {};
      const pointsForWin = sports[sport].points; // evetually change this to get from firestore - but right now the data is stored weird; change id to string of the sport name rather than a number

      // all cases for updating college stats of win, loss, tie, forfeit, points (all cases increment games played)
      // this code is veryyy lengthy, but i'm unsure if there's a more concise way since there are just a lot of cases to manage
      if (doubleForfeit) {
        collegeUpdateData[homeTeam] = {
          games: admin.firestore.FieldValue.increment(1),
          forfeits: admin.firestore.FieldValue.increment(1),
          points: admin.firestore.FieldValue.increment(pointsForWin / 2),
        };
        collegeUpdateData[awayTeam] = {
          games: admin.firestore.FieldValue.increment(1),
          forfeits: admin.firestore.FieldValue.increment(1),
          points: admin.firestore.FieldValue.increment(pointsForWin / 2),
        };
      } else if (winningTeam === "Draw") {
        collegeUpdateData[homeTeam] = {
          games: admin.firestore.FieldValue.increment(1),
          ties: admin.firestore.FieldValue.increment(1),
          points: admin.firestore.FieldValue.increment(pointsForWin / 2),
        };
        collegeUpdateData[awayTeam] = {
          games: admin.firestore.FieldValue.increment(1),
          ties: admin.firestore.FieldValue.increment(1),
          points: admin.firestore.FieldValue.increment(pointsForWin / 2),
        };
      } else if (homeForfeit) {
        collegeUpdateData[homeTeam] = {
          games: admin.firestore.FieldValue.increment(1),
          forfeits: admin.firestore.FieldValue.increment(1),
        };
        collegeUpdateData[awayTeam] = {
          games: admin.firestore.FieldValue.increment(1),
          wins: admin.firestore.FieldValue.increment(1),
          points: admin.firestore.FieldValue.increment(pointsForWin),
        };
      } else if (awayForfeit) {
        collegeUpdateData[homeTeam] = {
          games: admin.firestore.FieldValue.increment(1),
          wins: admin.firestore.FieldValue.increment(1),
          points: admin.firestore.FieldValue.increment(pointsForWin),
        };
        collegeUpdateData[awayTeam] = {
          games: admin.firestore.FieldValue.increment(1),
          forfeits: admin.firestore.FieldValue.increment(1),
        };
      } else if (homeScore > awayScore) {
        collegeUpdateData[homeTeam] = {
          games: admin.firestore.FieldValue.increment(1),
          wins: admin.firestore.FieldValue.increment(1),
          points: admin.firestore.FieldValue.increment(pointsForWin),
        };
        collegeUpdateData[awayTeam] = {
          games: admin.firestore.FieldValue.increment(1),
          losses: admin.firestore.FieldValue.increment(1),
        };
      } else if (homeScore < awayScore) {
        collegeUpdateData[homeTeam] = {
          games: admin.firestore.FieldValue.increment(1),
          losses: admin.firestore.FieldValue.increment(1),
        };
        collegeUpdateData[awayTeam] = {
          games: admin.firestore.FieldValue.increment(1),
          wins: admin.firestore.FieldValue.increment(1),
          points: admin.firestore.FieldValue.increment(pointsForWin),
        };
      }

      // doc refs
      const matchRef = db.collection("matches_dha_testing").doc(matchId);
      // const matchRef = db.collection("matches").doc(matchId);
      const awayCollegeRef = db.collection("colleges_testing").doc(awayTeam); // change to colleges
      const homeCollegeRef = db.collection("colleges_testing").doc(homeTeam); // change to colleges

      // batch write
      const batch = db.batch();

      batch.update(matchRef, matchUpdateData);
      batch.update(awayCollegeRef, collegeUpdateData[awayTeam]);
      batch.update(homeCollegeRef, collegeUpdateData[homeTeam]);

      await batch.commit();

      // update ranks -- may be a good idea to have a separate function for this as well, scheduled to run every so often, to protect against failures (if this section doesn't run properly for some reason)
      const collegesSnapshot = await db.collection("colleges_testing").get();
      const colleges: { id: string; points: number; wins: number }[] = [];

      collegesSnapshot.forEach((doc) => {
        colleges.push({
          id: doc.id,
          points: doc.data().points,
          wins: doc.data().wins, // tiebreaker -- need to look into how they actually break ties
        });
      });

      colleges.sort((a, b) => {
        if (b.points !== a.points) {
          return b.points - a.points;
        }
        return b.wins - a.wins; // Tie-breaker: descending by wins; might change
      });

      // ranks batch write
      const rankBatch = db.batch();
      colleges.forEach((college, index) => {
        rankBatch.update(db.collection("colleges_testing").doc(college.id), {
          rank: index + 1,
        });
      });
      await rankBatch.commit();

      // return success response
      return res
        .status(200)
        .send("Match and colleges data updated successfully.");
    } catch (error) {
      console.error("Error scoring match:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});
