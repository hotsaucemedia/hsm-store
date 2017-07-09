module.exports = function(sequelize, Sequelize) {

	var Product = sequelize.import('./product');

	var Variant = sequelize.define('variant', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
		title: { type: Sequelize.STRING },
		image: { type: Sequelize.STRING	},
		thumb: { type: Sequelize.STRING	},
		price : {type: Sequelize.FLOAT },
        status: {type: Sequelize.ENUM('available','notInStock'),defaultValue:'available' }
	});

	Variant.belongsTo(Product, {foreignKey: 'product_id'}); // foreign key
	

	return Variant; 
}
