const chatModel = require('../../models/chats/chats')
const useModel = require('../../models/RegLog/reglog')




const CreateChat = (req,res)=>{

    res.send('hey')
}

const GetChats = (req,res)=>{

    res.send('holoo')
}


module.exports ={CreateChat,GetChats}