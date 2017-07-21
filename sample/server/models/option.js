module.exports = function(sequelize, Sequelize) {

	var Option = sequelize.define('option', {
		id: { primaryKey: true, type: Sequelize.INTEGER },
		name: { type: Sequelize.STRING },
		image: { type: Sequelize.STRING	},
		thumb: { type: Sequelize.STRING	},
		price : {type: Sequelize.FLOAT },
        available: {type: Sequelize.ENUM('true', 'false'), defaultValue: 'true' }
        // foreign key: variant_id
	});

	return Option; 
}
