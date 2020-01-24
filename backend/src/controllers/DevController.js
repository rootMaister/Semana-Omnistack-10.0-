const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');
const mongoose = require('mongoose');

module.exports = {


    // Método GET (Show para o controller) de Devs/Usuários
    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs)
    },

    // Método Delete(Destroy para o controller) de Dev/Usuário pelo ID
    async destroy(request, response){
        const dev = await Dev.findByIdAndRemove({_id: request.params.id}).then(function(dev){
            response.send(dev);
        })
    },


    // Método Put(Update para o controller) de Dev/Usuário pelo ID
    async update(request, response){

        mongoose.set('useFindAndModify', false);

        const dev = await Dev.findByIdAndUpdate({_id: request.params.id}, request.body).then(function(){
            
           Dev.findOne({_id: request.params.id}).then(function(dev){
                response.send(dev);
            })
        })
    },


    // Método Post (Store para o controller) de Dev/Usuário
    async store(request, response){
        const {github_username, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            
            const { name = login, avatar_url, bio} = apiResponse.data;
            
            const techsArray = parseStringAsArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        
            console.log(name, avatar_url, bio, github_username);
        }
        
        return response.json(dev);
    }


}