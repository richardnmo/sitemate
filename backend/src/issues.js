/**
  This file manages all portfolio specific functions
*/

import { Database } from "./database.js";

/**
 * Gets all issues
 * Returns issues as array with objects in form:
 * {
 *   id: string,
 *   name: string,
 *   description: string,
 * }
 * @param {string} token
 * @param {Database} database
 * @returns {Promise<array>}
 */
export const issues = async (database) => {
  // Return result of database function
  const issues = await database.getIssues();
  return issues;
};

/**
 * Creates a new issue
 * Returns issue as object in form:
 * {
 *   id: string,
 *   name: string,
 * }
 * Otherwise returns null if new issue not created
 * @param {string} name
 * @param {string} desc
 * @param {Database} database
 * @returns {Promise<array | null>}
 */
export const createIssue = async (name, desc, database) => {
  const id = database.getNewId();

  // Create the issue and return the result
  const idResp = await database.createIssue(id, name, desc);
  if (idResp !== null) {
    const obj = { id: idResp, name: name };
    return obj;
  }
  return null;
};

/**
 * Gets an issue
 * @param {string} id
 * @param {Database} database
 * @returns {Promise<Object>}
 */
export const getIssue = async (id, database) => {
  // Return result of database function
  const issue = await database.getIssue(id);
  return issue;
};

/**
 * Allows the user to edit the issue
 * @param {string} id
 * @param {string} name
 * @param {string} desc
 * @param {Database} database
 * @returns
 */
export const editIssue = async (id, name, desc, database) => {
  // Return result of database function
  const update = await database.editIssue(id, name, desc);
  return update;
};

/**
 * Deletes issue from database
 * @param {string} id
 * @param {Database} database
 * @returns {Promise<boolean>}
 */
export const deleteIssue = async (id, database) => {
  // Return result of database function
  const del = await database.deleteIssue(id);
  return del;
};
