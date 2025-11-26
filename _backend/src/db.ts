// Database connection using better-sqlite3 as a fallback since Prisma has network restrictions
import Database, { type Database as DatabaseType } from 'better-sqlite3';
import path from 'path';

export const db: DatabaseType = new Database(path.join(__dirname, '../dev.db'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Helper functions for common operations
export const dbHelpers = {
  findMany: (table: string, orderBy?: string) => {
    const query = orderBy
      ? `SELECT * FROM ${table} ORDER BY ${orderBy}`
      : `SELECT * FROM ${table}`;
    return db.prepare(query).all();
  },

  findById: (table: string, id: string) => {
    return db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id);
  },

  create: (table: string, data: any) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;

    db.prepare(query).run(...values);
    return dbHelpers.findById(table, data.id);
  },

  update: (table: string, id: string, data: any) => {
    const updates = Object.keys(data)
      .map(key => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(data), id];
    const query = `UPDATE ${table} SET ${updates} WHERE id = ?`;

    db.prepare(query).run(...values);
    return dbHelpers.findById(table, id);
  },

  delete: (table: string, id: string) => {
    return db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id);
  },
};

// Graceful shutdown
process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  db.close();
  process.exit(0);
});
