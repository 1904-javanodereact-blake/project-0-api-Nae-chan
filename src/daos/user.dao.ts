import { connectionPool } from '.';
import { PoolClient } from 'pg';
import { convertSqlUser, convertSqlRole } from '../util/sql.converter';

/**
 * This dao retrieves users information from the database
 */

/**
 * This connects the database to retrieve user for log in
 * @param username is the user's username
 * @param password is the user's password
 */
export async function findLogInInfo(username: string, password: string) {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    const queryString = `SELECT * FROM users.users as u INNER JOIN
      users.roles as r ON (u.role = r.role_id) WHERE user_name = $1 AND password = $2`;
    const result = await client.query(queryString, [username, password]);
    const user = result.rows[0];
    if (user) {
      const convertedUser = convertSqlUser(user);
      convertedUser.role = convertSqlRole(user);
      return convertedUser;
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}
/**
 * This connects the database to retrieve user information
 */
export async function findAllUsers() {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    const result = await client.query(`SELECT * FROM users.users as u INNER JOIN
    users.roles as r ON (u.role = r.role_id)`);
    const usersResult = result.rows;
    const convertedUser = result.rows.map(convertSqlUser);
    if (usersResult) {
      for (let i = 0; i < usersResult.length; i++) {
        convertedUser[i].role = convertSqlRole(usersResult[i]);
      }
      return convertedUser;
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}
/**
 * This connects the database to retrieve user information by id
 */
export async function findUserById(id: number) {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    const queryString = 'SELECT * FROM users.users WHERE user_id = $1';
    const result = await client.query(queryString, [id]);
    const user = result.rows[0];
    console.log (user);
    if (user) {
      const convertedUser = convertSqlUser(user);
      convertedUser.role = convertSqlRole(user);
      return convertedUser;
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}
/**
 * Add new user
 */
export async function addNewUsers(newUser) {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    const queryString = `INSERT INTO users.users (user_id, user_name, password, firstname,
      lastname, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    const input = await client.query(queryString, [newUser.userId, newUser.username,
      newUser.password, newUser.firstName, newUser.lastName, newUser.email]);
      const user = input.rows[0];
    if (user) {
      const convertedUser = convertSqlUser(user);
      convertedUser.role = convertSqlRole(user.role);
      return convertedUser;
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}
/**
 * This connects the database to retrieve user information and updates fields
 */
export async function updateUser(id: number, username: string, password: string,
  firstName: string, lastName: string, email: string, role) {

  const arrayForUpdate = [id, username, password, firstName, lastName, email, role];

  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    // get the info for this id
    const checkString = `SELECT * FROM users.users WHERE user_id = $1`;
    const userInfo = await client.query(checkString, [id]);
    console.log('step 3', userInfo.rows);
    const ui = userInfo.rows[0];
    // update the old info with the new info
    let i = 0;
    for (const key in ui) {
      if (ui[key] !== arrayForUpdate[i] && arrayForUpdate[i] !== undefined) {
        if (arrayForUpdate[i].length > 0) {
          console.log(arrayForUpdate[i].length);
          ui[key] = arrayForUpdate[i];
        }
      }
      i++;
    }
    const updateInfoString = `UPDATE users.users SET user_name = $1,
    password =  $2, firstname = $3, lastname = $4, email = $5,
    role = $6 WHERE user_id = $7 RETURNING *`;
    const input = await client.query(updateInfoString, [ui.user_name, ui.password,
      ui.firstname, ui.lastname, ui.email, ui.role, ui.user_id]);
      const user = input.rows[0];
    if (user) {
      const convertedUser = convertSqlUser(user);
      convertedUser.role = convertSqlRole(user);
      return convertedUser;
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}