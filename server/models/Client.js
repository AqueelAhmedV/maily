const {db} = require("../database")
const { DataTypes } = require("sequelize")
const { uid } = require("uid");


const Client = db.define("Client", {
    ClientId: {
        type: DataTypes.STRING,
    },
    UserId: {
        type: DataTypes.STRING,
        // references: {
        //     model: "User",
        //     key: "UserId"
        // },
        allowNull: false
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
    },
    FullName: {
        type: DataTypes.VIRTUAL,
    },
    Email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
        allowNull: false
    }
}, {
    getterMethods: {
        fullName() {
            return this.getDataValue("FirstName") + this.getDataValue("LastName")
        }
    }
})

Client.beforeCreate(async (client, _options) => {
    const existingClient = await Client.findOne({
      where: {
        UserId: client.UserId,
        Email: client.Email,
      },
    });
    client.setDataValue("ClientId", "C"+uid(7))
    if (existingClient) {
      throw new Error('Client with the same UserId and Email already exists');
    }
  });

// Client.afterCreate(async (client, _opts) => {
//     await db.model("ChangeLog").create({
//         TableName: 'Client',
//         Operation: 'create',
//         Data: JSON.stringify(client.dataValues),
//         RecordPk: client.ClientId,
//         UserId: client.UserId
//     })
// })

// Client.afterDestroy(async (client, _opts) => {
//     console.log("Hey")
//     await db.model("ChangeLog").create({
//         TableName: 'Client',
//         Operation: 'destroy',
//         RecordPk: client.ClientId,
//         UserId: client.UserId
//     })
// })

module.exports = Client