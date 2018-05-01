const Group = require('../models').Group;
const User = require('../models').User;
const GroupUser = require('../models').GroupUser;
const Message = require('../models').Message;
const UserMessage = require('../models').UserMessage;

// 	•	An API route that allows a logged in user post messages to created groups:
// o	POST: /api/group/<group id>/message
// •	An API route that allows a logged in user retrieve messages that have been posted to groups he/she belongs to:
// o	GET: /api/group/<group id>/messages

module.exports = {
    
    postMessage(req, res) { 

        return User
            .findById(req.body.groupMemberId)
            .then(existingUser=>{
                if (!existingUser && existingUser.active == true){
                    return res.status(400).send({message:'You Sign Up or login in if you have signed up'})
                }
                return GroupUser
                     .find({
                    //ensuring old user is a group member
                         where:{
                             groupid: req.params.groupid,
                             userid: req.body.groupMemberId,
                         }
                    })
                    .then((authorizedGroupMember)=>{
                         if (!authorizedGroupMember){
                            return res.status(400).send({message:'You are not a group member'})
                        }
                        return Message
                            .create({
                                messagecontent: req.body.message
                            })
                            .then(getMessageId=>{
                                
                                if (!getMessageId){
                                    return res.status(200).send('Messages cannot be null')
                                }
                                return UserMessage
                                    .create({
                                          groupid: req.params.groupid,
                                          userid: req.body.groupMemberId, 
                                          Messageid: getMessageId.id,
                                })
                                .then(messageCreated=>{
                                  return res.status(200).send({message:  getMessageId.messagecontent  +'message delivered'  } )
                                })
                            })
                            .catch(e=>{ return res.status(400).send(e)})
                    }).catch(e=>{ return res.status(400).send(e)})
            }).catch(e=>{ return res.status(400).send(e)})
        },

        listMessages (req, res) {
            return Message
                .findAll({
                    include: [{
                         model: UserMessage,
                         as: 'Author',
                    }],
                })
                .then(messages => res.status(200).send(messages))
                .catch(error => res.status(400).send(error));
        }
}