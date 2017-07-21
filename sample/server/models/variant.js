module.exports = function(sequelize, Sequelize) {

	var Variant = sequelize.define('variant', {
		id: { primaryKey: true, type: Sequelize.INTEGER },
		name: { type: Sequelize.STRING }
		// foreign key: product_id
	});

	return Variant; 
}
