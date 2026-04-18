// ============================================================
// Firebase Realtime Sync + Team Battle System
// ============================================================
(function() {
  'use strict';

  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBK26QpLc4fMFRajmwnQwT2hH4pJgB4stQ",
    authDomain: "cirecourse.firebaseapp.com",
    databaseURL: "https://cirecourse-default-rtdb.firebaseio.com",
    projectId: "cirecourse",
    storageBucket: "cirecourse.firebasestorage.app",
    messagingSenderId: "249154326902",
    appId: "1:249154326902:web:72bf76bf5e95b8fd12ea57",
    measurementId: "G-11YJF9JZ0Z"
  };

  let db = null;
  let firebaseReady = false;
  let _version = 'en'; // 'en' or 'kr'

  // ---- Initialize Firebase ----
  window.FirebaseSync = {
    init(version) {
      _version = version || 'en';
      try {
        if (!firebase || !firebase.database) {
          console.warn('Firebase SDK not loaded');
          return;
        }
        if (!firebase.apps.length) {
          firebase.initializeApp(FIREBASE_CONFIG);
        }
        db = firebase.database();
        firebaseReady = true;
        console.log('🔥 Firebase connected — version:', _version);
      } catch(e) {
        console.warn('Firebase init failed:', e);
      }
    },

    isReady() { return firebaseReady && db !== null; },

    // ---- Push student session data in real-time ----
    pushSessionUpdate(sessionData) {
      if (!firebaseReady || !db) return;
      try {
        const sid = sessionData.sessionId || sessionData.session_id || ('S-' + Date.now());
        const ref = db.ref(`live/${_version}/students/${sid}`);
        ref.set({
          nickname: sessionData.nickname || 'Anonymous',
          team: sessionData.team || null,
          score: sessionData.total_score || 0,
          level: sessionData.max_level || 1,
          streak: sessionData.max_streak || 0,
          modes_completed: sessionData.modes_completed || [],
          current_mode: sessionData.current_mode || null,
          current_progress: sessionData.current_progress || null,
          device: sessionData.device || 'unknown',
          updated_at: firebase.database.ServerValue.TIMESTAMP,
          started_at: sessionData.started_at || new Date().toISOString()
        });
      } catch(e) { console.warn('Firebase push failed:', e); }
    },

    // ---- Push mode result in real-time ----
    pushModeResult(sessionId, modeResult) {
      if (!firebaseReady || !db) return;
      try {
        const ref = db.ref(`live/${_version}/mode_results/${sessionId}`);
        ref.push({
          mode: modeResult.mode,
          score: modeResult.score || 0,
          correct: modeResult.correct || 0,
          total: modeResult.total || 0,
          time_sec: modeResult.time_sec || 0,
          at: new Date().toISOString()
        });
      } catch(e) { console.warn('Firebase mode result push failed:', e); }
    },

    // ---- Push answer in real-time ----
    pushAnswer(sessionId, answer) {
      if (!firebaseReady || !db) return;
      try {
        db.ref(`live/${_version}/answers/${sessionId}`).push({
          mode: answer.mode,
          question_id: answer.question_id,
          selected: answer.selected,
          correct: answer.correct,
          time_sec: answer.time_sec || 0,
          at: new Date().toISOString()
        });
      } catch(e) {}
    },

    // ---- Team management ----
    saveTeams(teams) {
      if (!firebaseReady || !db) return;
      db.ref(`config/${_version}/teams`).set(teams);
    },

    loadTeams(callback) {
      if (!firebaseReady || !db) { callback([]); return; }
      db.ref(`config/${_version}/teams`).once('value', snap => {
        callback(snap.val() || []);
      });
    },

    // ---- Assign student to team ----
    assignTeam(sessionId, teamName) {
      if (!firebaseReady || !db) return;
      db.ref(`live/${_version}/students/${sessionId}/team`).set(teamName);
    },

    // ---- Listen to all live student data (for admin dashboard) ----
    onStudentsUpdate(callback) {
      if (!firebaseReady || !db) return;
      db.ref(`live/${_version}/students`).on('value', snap => {
        const data = snap.val() || {};
        callback(data);
      });
    },

    // ---- Listen to all mode results ----
    onModeResultsUpdate(callback) {
      if (!firebaseReady || !db) return;
      db.ref(`live/${_version}/mode_results`).on('value', snap => {
        callback(snap.val() || {});
      });
    },

    // ---- Listen to live config (teams) ----
    onTeamsUpdate(callback) {
      if (!firebaseReady || !db) return;
      db.ref(`config/${_version}/teams`).on('value', snap => {
        callback(snap.val() || []);
      });
    },

    // ---- Clear live data (admin reset) ----
    clearLiveData() {
      if (!firebaseReady || !db) return;
      db.ref(`live/${_version}`).remove();
    },

    // ---- Get session count from Firebase ----
    getSessionCount(callback) {
      if (!firebaseReady || !db) { callback(0); return; }
      db.ref(`live/${_version}/students`).once('value', snap => {
        const data = snap.val() || {};
        callback(Object.keys(data).length);
      });
    }
  };

})();
