const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = process.env.DB_PATH || path.join(dataDir, 'app.db');
const db = new sqlite3.Database(dbPath);

function initDb() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        (createErr) => {
          if (createErr) {
            reject(createErr);
            return;
          }

          db.get('SELECT COUNT(*) as count FROM items', (countErr, row) => {
            if (countErr) {
              reject(countErr);
              return;
            }

            if (row.count === 0) {
              db.run('INSERT INTO items (name) VALUES (?)', ['Primer item'], (insertErr) => {
                if (insertErr) {
                  reject(insertErr);
                  return;
                }
                resolve();
              });
            } else {
              resolve();
            }
          });
        }
      );
    });
  });
}

function getItems() {
  return new Promise((resolve, reject) => {
    db.all('SELECT id, name, created_at FROM items ORDER BY id DESC', (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

function addItem(name) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO items (name) VALUES (?)', [name], function onInsert(err) {
      if (err) {
        reject(err);
        return;
      }

      resolve({ id: this.lastID, name });
    });
  });
}

function healthCheck() {
  return new Promise((resolve, reject) => {
    db.get('SELECT 1 as ok', (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ ok: true });
    });
  });
}

module.exports = {
  initDb,
  getItems,
  addItem,
  healthCheck,
  db
};
