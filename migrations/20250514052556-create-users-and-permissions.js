'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Detectamos el dialecto activo
    const dialect = queryInterface.sequelize.options.dialect;

    // Opciones de tabla específicas
    const mysqlTableOpts = {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    };
    const tableOptions = dialect === 'mysql' ? mysqlTableOpts : {};

    // Helper para timestamps
    const createdAtDef = dialect === 'mysql'
      ? Sequelize.literal('CURRENT_TIMESTAMP')
      : Sequelize.fn('GETDATE');
    const updatedAtDef = dialect === 'mysql'
      ? Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      : Sequelize.fn('GETDATE');

    // 1. User
    await queryInterface.createTable(
      'User',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        username: { type: Sequelize.STRING(50), allowNull: false, unique: true },
        email:    { type: Sequelize.STRING(150), allowNull: false, unique: true },
        phone:    { type: Sequelize.STRING(20), allowNull: true, unique: true },
        passwordHash:    { type: Sequelize.STRING(255), allowNull: false },
        isActive:        { type: Sequelize.BOOLEAN,    allowNull: false, defaultValue: true },
        isVerified:      { type: Sequelize.BOOLEAN,    allowNull: false, defaultValue: false },
        twoFactorEnabled:{ type: Sequelize.BOOLEAN,    allowNull: false, defaultValue: false },
        lastLoginAt:     { type: Sequelize.DATE,       allowNull: true },
        failedLoginAttempts:{ type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
        lockoutUntil:    { type: Sequelize.DATE,       allowNull: true },
        createdAt:       { type: Sequelize.DATE, allowNull: false, defaultValue: createdAtDef },
        updatedAt:       { type: Sequelize.DATE, allowNull: false, defaultValue: updatedAtDef }
      },
      tableOptions
    );

    // 2. Person
    await queryInterface.createTable(
      'Person',
      {
        id:        { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        userID:    { 
          type: Sequelize.INTEGER, allowNull: true,
          references: { model: 'User', key: 'id' },
          onUpdate: 'CASCADE', onDelete: 'CASCADE'
        },
        firstName: { type: Sequelize.STRING(100), allowNull: false },
        lastName1: { type: Sequelize.STRING(100), allowNull: false },
        lastName2: { type: Sequelize.STRING(100), allowNull: false },
        dateOfBirth: { type: Sequelize.DATEONLY, allowNull: true },
        gender:      { type: Sequelize.CHAR(1),    allowNull: true },
        documentType:{ type: Sequelize.STRING(20), allowNull: true },
        documentNumber:{ type: Sequelize.STRING(50),allowNull: true },
        address:     { type: Sequelize.STRING(255), allowNull: true },
        phone:       { type: Sequelize.STRING(20),  allowNull: true },
        email:       { type: Sequelize.STRING(150), allowNull: true },
        createdAt:   { type: Sequelize.DATE, allowNull: false, defaultValue: createdAtDef },
        updatedAt:   { type: Sequelize.DATE, allowNull: false, defaultValue: updatedAtDef },
        deletedAt:   { type: Sequelize.DATE, allowNull: true }
      },
      tableOptions
    );

    // 3. UserOtp
    await queryInterface.createTable(
      'UserOtp',
      {
        id:     { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        userID: { 
          type: Sequelize.INTEGER, allowNull: false,
          references: { model: 'User', key: 'id' },
          onUpdate: 'CASCADE', onDelete: 'CASCADE'
        },
        code:      { type: Sequelize.STRING(10), allowNull: false },
        type:      { type: Sequelize.STRING(30), allowNull: false },
        expiresAt: { type: Sequelize.DATE, allowNull: false },
        used:      { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: createdAtDef }
      },
      tableOptions
    );

    // 4. Permission
    await queryInterface.createTable(
      'Permission',
      {
        id:           { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        code:         { type: Sequelize.STRING(100), allowNull: false, unique: true },
        name:         { type: Sequelize.STRING(100), allowNull: false },
        description:  { type: Sequelize.STRING(255), allowNull: true },
        groupName:    { type: Sequelize.STRING(50), allowNull: true },
        subGroup:     { type: Sequelize.STRING(50), allowNull: true },
        httpMethod:   { type: Sequelize.STRING(10), allowNull: true },
        apiPath:      { type: Sequelize.STRING(255), allowNull: true },
        frontendPath: { type: Sequelize.STRING(255), allowNull: true },
        menuLabel:    { type: Sequelize.STRING(50), allowNull: true },
        menuIcon:     { type: Sequelize.STRING(50), allowNull: true },
        createdAt:    { type: Sequelize.DATE, allowNull: false, defaultValue: createdAtDef },
        updatedAt:    { type: Sequelize.DATE, allowNull: false, defaultValue: updatedAtDef },
        deletedAt:    { type: Sequelize.DATE, allowNull: true }
      },
      tableOptions
    );

    // 5. Role
    await queryInterface.createTable(
      'Role',
      {
        id:          { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        name:        { type: Sequelize.STRING(50), allowNull: false, unique: true },
        description: { type: Sequelize.STRING(255), allowNull: true },
        createdAt:   { type: Sequelize.DATE, allowNull: false, defaultValue: createdAtDef },
        updatedAt:   { type: Sequelize.DATE, allowNull: false, defaultValue: updatedAtDef },
        deletedAt:   { type: Sequelize.DATE, allowNull: true }
      },
      tableOptions
    );

    // 6. RolePermission
    await queryInterface.createTable(
      'RolePermission',
      {
        roleID: {
          type: Sequelize.INTEGER, allowNull: false,
          references: { model: 'Role', key: 'id' },
          onUpdate: 'CASCADE', onDelete: 'CASCADE'
        },
        permissionID: {
          type: Sequelize.INTEGER, allowNull: false,
          references: { model: 'Permission', key: 'id' },
          onUpdate: 'CASCADE', onDelete: 'CASCADE'
        }
      },
      tableOptions
    );
    await queryInterface.addConstraint('RolePermission', {
      fields: ['roleID','permissionID'],
      type: 'primary key',
      name: 'pk_RolePermission'
    });

    // 7. UserRole
    await queryInterface.createTable(
      'UserRole',
      {
        userID: {
          type: Sequelize.INTEGER, allowNull: false,
          references: { model: 'User', key: 'id' },
          onUpdate: 'CASCADE', onDelete: 'CASCADE'
        },
        roleID: {
          type: Sequelize.INTEGER, allowNull: false,
          references: { model: 'Role', key: 'id' },
          onUpdate: 'CASCADE', onDelete: 'CASCADE'
        }
      },
      tableOptions
    );
    await queryInterface.addConstraint('UserRole', {
      fields: ['userID','roleID'],
      type: 'primary key',
      name: 'pk_UserRole'
    });

    // 8. UserPermission
    await queryInterface.createTable(
      'UserPermission',
      {
        userID: {
          type: Sequelize.INTEGER, allowNull: false,
          references: { model: 'User', key: 'id' },
          onUpdate: 'CASCADE', onDelete: 'CASCADE'
        },
        permissionID: {
          type: Sequelize.INTEGER, allowNull: false,
          references: { model: 'Permission', key: 'id' },
          onUpdate: 'CASCADE', onDelete: 'CASCADE'
        },
        isAllowed: { type: Sequelize.BOOLEAN, allowNull: false }
      },
      tableOptions
    );
    await queryInterface.addConstraint('UserPermission', {
      fields: ['userID','permissionID'],
      type: 'primary key',
      name: 'pk_UserPermission'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Bajar en orden inverso
    await queryInterface.dropTable('UserPermission');
    await queryInterface.dropTable('UserRole');
    await queryInterface.dropTable('RolePermission');
    await queryInterface.dropTable('Role');
    await queryInterface.dropTable('Permission');
    await queryInterface.dropTable('UserOtp');
    await queryInterface.dropTable('Person');
    await queryInterface.dropTable('User');
  }
};
