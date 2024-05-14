export const up = async (knex) => {
    const exists = await knex.schema.hasTable('user');
    if (!exists) {
      await knex.schema.createTable('user', (table) => {
        table.increments('id').primary();
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.integer('role').defaultTo(0); // Adding the 'role' column with a default value of 0
      });
    } else {
      // If the table already exists, add the 'role' column if it doesn't exist
      const hasColumn = await knex.schema.hasColumn('user', 'role');
      if (!hasColumn) {
        await knex.schema.alterTable('user', (table) => {
          table.integer('role').defaultTo(0); // Adding the 'role' column with a default value of 0
        });
      }
    }
  };
  
  export const down = async (knex) => {
    await knex.schema.dropTableIfExists('user');
  };
  