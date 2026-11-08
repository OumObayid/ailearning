import mysql from 'mysql2/promise';
import type { ExecuteValues } from 'mysql2';

declare global {
  var mysqlPool: mysql.Pool | undefined;
}

export function getDbPool(): mysql.Pool {
  if (!global.mysqlPool) {
    global.mysqlPool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'iaexamen',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }

  return global.mysqlPool;
}

export async function query<T = unknown>(sql: string, params?: ExecuteValues): Promise<T> {
  const pool = getDbPool();
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}
