const mongoose=require('mongoose');
// schema for batch it includes all the batches and students registred batch
const cacheSchema=new mongoose.Schema({
    // to store to be translate 
    text:{
        type:String,
        required:true,
        unique:true
    },
    // source language of text 
    sourceLang:{
        type:String,
        required:true,
    },
    // map of target languages and translation into it in key value form
    targetLang: {
        type: Map,
        of: String
    }
},{
    timestamps:true
});


const Cache = mongoose.model('Cache', cacheSchema);
module.exports = Cache;