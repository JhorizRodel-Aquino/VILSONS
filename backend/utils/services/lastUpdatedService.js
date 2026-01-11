// services/lastUpdatedService.js

/**
 * Get the last updated timestamp for a given table
 * @param {PrismaClient} prisma - Prisma client instance
 * @param {string} tableName - Name of the table/model
 * @param {Object} where - Filter conditions (will be simplified for aggregate)
 * @returns {Promise<Date|null>} - Last updated timestamp or null
 */
const getLastUpdatedAt = async (prisma, tableName, where = {}) => {
  try {
    // Map table name to Prisma model
    const model = prisma[tableName];

    if (!model) {
      throw new Error(`Table/model '${tableName}' not found`);
    }

    // Create a simplified where clause that only includes direct fields
    // Remove nested relations that aggregate() can't handle
    const simplifiedWhere = {};

    for (const [key, value] of Object.entries(where)) {
      // Only include direct field filters (not nested relations)
      // Common direct fields: status, createdAt, id, etc.
      if (
        (key !== "roles" &&
          key !== "branches" &&
          key !== "OR" &&
          key !== "AND" &&
          typeof value !== "object") ||
        value instanceof Date ||
        (value &&
          (value.gte || value.lt || value.lte || value.gt || value.contains))
      ) {
        simplifiedWhere[key] = value;
      }
    }

    // Get the max of both updatedAt and createdAt from main table only
    const aggregation = await model.aggregate({
      where: simplifiedWhere,
      _max: {
        updatedAt: true,
        createdAt: true,
      },
    });

    // Return the most recent timestamp between updatedAt and createdAt
    const updatedAt = aggregation._max.updatedAt;
    const createdAt = aggregation._max.createdAt;

    // If both exist, return the most recent one
    if (updatedAt && createdAt) {
      return updatedAt > createdAt ? updatedAt : createdAt;
    }

    // Otherwise return whichever one exists
    return updatedAt || createdAt || null;
  } catch (error) {
    console.error(`Error getting lastUpdatedAt for ${tableName}:`, error);
    throw error;
  }
};

module.exports = {
  getLastUpdatedAt,
};
