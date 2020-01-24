const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// Buscar todos os devs num raio de 10km
// Filtrar a busca por tecnologia
module.exports = {
    async index(request, response) {
        const {latitude, longitude, techs} = request.query

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs:  {
                // $in é um operador da biblioteca do mongoDB(Mongoose)
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({devs});
    }
}