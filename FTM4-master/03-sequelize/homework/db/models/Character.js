const { DataTypes } = require("sequelize");
const Ability = require("./Ability");

module.exports = (sequelize) => {
  sequelize.define(
    "Character",
    {
      code: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        unique: true,
        allowNull: false,
        validate: {
          cdeValidator(valor) {
            if (valor.toLowerCase() === "henry") {
              throw new Error("Valor no puede ser henry");
            }
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notIn: [["Henry", "SoyHenry", "Soy Henry"]],
        },
      },
      age: {
        type: DataTypes.INTEGER,
        get() {
          const edad = this.getDataValue("age");
          return edad ? `${edad} years old` : edad;
        },
      },
      race: {
        type: DataTypes.ENUM(
          "Human",
          "Elf",
          "Machine",
          "Demon",
          "Animal",
          "Other"
        ),
        defaultValue: "Other",
      },
      hp: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      mana: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      date_added: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      abilityId: {
        type: DataTypes.UUID,
        references: {
          model: Ability
        }
      },
    },
    
    {
      timestamps: false,
    }
  );
};
