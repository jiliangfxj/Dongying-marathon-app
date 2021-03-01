const eType = require('eventType.js')
const model = require('eventModel.js')

function getDefaultEventModel(eventType) {
  switch (eventType) {
    case eType.eventType.date:
      return new model.dateEventModel();
    case eType.eventType.tick:
      return new model.tickEventModel();
    default:
      return new model.baseEventModel();
  }
}

function create(data){
  switch (data.typeId) {
    case eType.eventType.date:
      return new model.dateEventModel(data);
    case eType.eventType.tick:
      return new model.tickEventModel(data);
    default:
      return new model.baseEventModel(data);
  }
}

module.exports = {
  getDefaultEventModel: getDefaultEventModel,
  create
}