import { getDBPool } from '../../db/getPool.js';

export const selectUserByIdModel = async (userId) => {
  const pool = await getDBPool();

  // Obtener el usuario con ese id.
  const [user] = await pool.query(
    `SELECT * FROM Users WHERE id_user = ?`,
    [userId]
  );

  return user[0];
};