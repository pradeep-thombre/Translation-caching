const googleTranslate = require('@vitalets/google-translate-api');
const { response } = require('express');
const Cache = require('../models/cache');

module.exports.home = async function(req, res) {
    return res.render('home');
}


module.exports.translate = async function(req, res) {

    try{
        // extracting data from query 
        let parameters = req.query;
        let output =await getData(parameters);

        // returning response
        res.status(200).json({
            success: true,
            data: output,
        });
    }
    catch(error){

        // if any error occured returning the error 
        res.status(500).json({
            success: false,
            data: error,
        });
    }
}

getData = async function(parameters){
    
    let output = {};
    try {

        // fetching data of text to be translate from database 
        const data=await Cache.findOne({text:parameters.text});

        if(data && data.targetLang.has(parameters.lang)){

            // if data found in database and also translation in required language
            output.result = data.targetLang.get(parameters.lang);
            output.language = data.sourceLang;

        }else{
            
            // fetching translation from google translator
            const response = await googleTranslate(parameters.text, { to: parameters.lang });
            output.result = response.text;
            output.language = response.from.language.iso;
            
            if(data){
                
                // if translation of same text is present in database with in different lanaguage 
                // appending the translation of same text in this language in database 
                data.targetLang.set(parameters.lang,response.text);
                map=data.targetLang;
                student=await Cache.findByIdAndUpdate(data._id,{targetLang:map})
                student.save();

            }else{

                // if unique request is made creating new map to store translation 
                var map = new Map();
                map.set(parameters.lang,response.text);

                // creating new doc of translated language
                let newdoc={
                    text:parameters.text,
                    sourceLang:response.from.language.iso,
                    targetLang:map
                }
                let cache= await Cache.create(newdoc);
            }
        }
    } catch (error) {
        console.log(error);
    }
    return output;
}
