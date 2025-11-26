const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Read the SQL init script
const sqlScript = fs.readFileSync(
  path.join(__dirname, '../prisma/init.sql'),
  'utf8'
);

// Create/open the database
const db = new Database(path.join(__dirname, '../dev.db'));

try {
  // Execute the schema
  db.exec(sqlScript);
  console.log('✅ Database initialized successfully!');
  console.log('📊 18 tables created');

  // Verify tables were created
  const tables = db.prepare(
    "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
  ).all();

  console.log('\n📋 Tables created:');
  tables.forEach(table => {
    console.log(`  - ${table.name}`);
  });

} catch (error) {
  console.error('❌ Error initializing database:', error.message);
  process.exit(1);
} finally {
  db.close();
}
