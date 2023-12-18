"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Colocation table
    await queryInterface.createTable("colocation", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin_user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        // references: {
        //   model: "user",
        //   key: "id",
        // },
        // onUpdate: "CASCADE",
        // onDelete: "CASCADE",
      },
    });

    // Create User table
    await queryInterface.createTable("user", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: { type: Sequelize.STRING, allowNull: false },
      birthday: { type: Sequelize.DATE },
      phone: { type: Sequelize.STRING },
      pseudo: { type: Sequelize.STRING },
      gender: { type: Sequelize.STRING },
      avatar: { type: Sequelize.STRING },
      colocation_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "colocation",
          key: "id",
        },
      },
      // Add other user fields as needed
    });

    // Add foreign key to Objective table
    await queryInterface.addConstraint("colocation", {
      fields: ["admin_user_id"],
      type: "foreign key",
      name: "fk_colocation_admin_user",
      references: {
        table: "user",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    // Create Objective table
    await queryInterface.createTable("objective", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      users_assigned: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      deadline: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      colocation_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "colocation",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_by: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });

    await queryInterface.createTable("task", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      estimated_duration: { type: Sequelize.INTEGER },
      objective_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "objective",
          key: "id",
        },
      },
    });
    // Add outgoing foreign key to Objective table
    await queryInterface.createTable("outgoing", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      final_expense: { type: Sequelize.FLOAT, allowNull: false },
      objective_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "objective",
          key: "id",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop tables in reverse order of creation
    await queryInterface.dropTable("user_colocation");
    await queryInterface.dropTable("objective");
    await queryInterface.dropTable("colocation");
    await queryInterface.dropTable("user");
  },
};
