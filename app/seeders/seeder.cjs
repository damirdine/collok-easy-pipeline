"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Créer des colocations
    const colocations = await queryInterface.bulkInsert(
      "colocation",
      [
        {
          name: "Colocation 1",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Colocation 2",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    // Créer des utilisateurs pour chaque colocation
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        firstname: `User${i + 1}`,
        lastname: `Lastname${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: "password", // Devrait être haché dans une application réelle
        created_at: new Date(),
        updated_at: new Date(),
        colocation_id: (i % 2) + 1,
      });
    }

    await queryInterface.bulkInsert("user", users);

    // Mettre à jour le champ admin_user_id pour les colocations
    await queryInterface.bulkUpdate(
      "colocation",
      { admin_user_id: 1 },
      { id: 1 }
    );

    await queryInterface.bulkUpdate(
      "colocation",
      { admin_user_id: 6 },
      { id: 2 }
    );

    // Insérer des données pour la table 'objective'
    const objectives = [];
    for (let i = 0; i < 10; i++) {
      objectives.push({
        name: `Objective ${i + 1}`,
        created_at: new Date(),
        updated_at: new Date(),
        users_assigned: "",
        colocation_id: (i % 2) + 1,
        created_by: (i % 10) + 1,
      });
    }

    await queryInterface.bulkInsert("objective", objectives);

    // Insérer des données pour les tableaux 'outgoing' et 'task'
    const outgoings = [];
    const tasks = [];
    for (let i = 0; i < 5; i++) {
      outgoings.push({
        final_expense: Math.random() * 100,
        created_at: new Date(),
        updated_at: new Date(),
        objective_id: i + 1,
      });
    }

    for (let i = 5; i < 10; i++) {
      tasks.push({
        estimated_duration: Math.floor(Math.random() * 5) + 1,
        created_at: new Date(),
        updated_at: new Date(),
        objective_id: i + 1,
      });
    }

    await queryInterface.bulkInsert("outgoing", outgoings);
    await queryInterface.bulkInsert("task", tasks);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("task", null, {});
    await queryInterface.bulkDelete("outgoing", null, {});
    await queryInterface.bulkDelete("objective", null, {});
    await queryInterface.bulkDelete("user", null, {});
    await queryInterface.bulkDelete("colocation", null, {});
  },
};
