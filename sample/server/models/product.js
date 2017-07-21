module.exports = function(sequelize, Sequelize) {

	var Product = sequelize.define('product', {
		id: { primaryKey: true, type: Sequelize.INTEGER},
		name: { type: Sequelize.STRING},
		desc: { type: Sequelize.STRING},
		src: { type: Sequelize.STRING},
		thumb: { type: Sequelize.STRING},
		price : {type: Sequelize.FLOAT},
        available: {type: Sequelize.ENUM('true', 'false'), defaultValue: 'true' }
	});

	return Product; 
}
