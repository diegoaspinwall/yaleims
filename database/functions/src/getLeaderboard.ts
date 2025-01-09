import * as functions from "firebase-functions";
import admin from "./firebaseAdmin.js";
import cors from "cors";


// Enable CORS
const corsHandler = cors({ origin: true });

const db = admin.firestore();

interface College {
  id: string;
  name: string;
  points: number;
}

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
