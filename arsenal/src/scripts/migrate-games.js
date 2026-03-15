const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Load environment variables manually for this script
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') });

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

const db = admin.firestore();

async function migrateGames() {
  const gamesPath = path.resolve(__dirname, '../data/games.json');
  const gamesData = JSON.parse(fs.readFileSync(gamesPath, 'utf8'));

  console.log(`Starting migration of ${gamesData.length} games to Firestore...`);

  const batch = db.batch();
  
  gamesData.forEach(game => {
    // Use the custom ID from our JSON as the document ID in Firestore for consistency
    const docRef = db.collection('games').doc(game.id);
    batch.set(docRef, game);
  });

  try {
    await batch.commit();
    console.log('Migration completed successfully! All games added to Firestore.');
  } catch (error) {
    console.error('Error migrating data: ', error);
  }
}

migrateGames();
