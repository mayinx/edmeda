// Message::Create-Service
// Creates a new messsage
const Message = require("../../models/Message");
const _ = require("lodash");

function CreateMessageService() {}

CreateMessageService.prototype.run = async function (messageAttributes) {
  // let message = new Message(msg);
  // console.log("--- message", message);
  // var ObjectID = require("mongodb").ObjectID;
  // const _id = new ObjectID(message.creator);
  // message.creator = _id;
  // message.createdAt = new Date();
  // const { groupId, userId } = args;
  // const roomId = groupId.toString();

  try {
    let { content, creator, type, group } = messageAttributes;

    const message = await Message.create({
      content,
      creator,
      type,
      group,
    });

    return message;
  } catch (err) {
    console.log("[ERROR] CreateMessageService#run: ", err);
    throw err;
  }
};

module.exports = CreateMessageService;
