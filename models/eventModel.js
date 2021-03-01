const util = require('../utils/util.js')
const eType = require('eventType.js')
const loopMode = require('eventLoopMode.js')
const displayMode = require('loopedDateEventDisplayMode.js')
const dateRelatedEnums = require('dateRelatedEnums.js');

class todoItem {
  constructor() {
    this.id = util.formatTimeAsId(new Date());
    this.title = '';
    this.isFinished = false;
    this.isNewAdded = true;
  }
}
class tickItem {
  constructor(time, desc) {
    this.time = util.standardDate(time);
    this.desc = desc;
  }
}

class baseEventModel {
  constructor(data, typeId) {
    if (data !== undefined)
      this.migrateOldData(data);

    this.typeId = typeId;
    this.id = data !== undefined ? data.id : util.formatTimeAsId(new Date());
    this.title = data !== undefined ? data.title : '';
    this.autoReserve = data !== undefined ? data.autoReserve : false;
    this.remark = data !== undefined ? data.remark : '';
    this.todoList = data !== undefined ? data.todoList : [];

    if (this.todoList !== undefined) {
      this.countOfUnfinishedTodo = this.todoList.filter(todo => !todo.isFinished).length;
    }
  }

  updateTodo(todoItem) {
    // Initialize todoList.
    if (this.todoList == null) {
      this.todoList = [];
    }

    var idx = this.todoList.findIndex((t) => {
      return t.id === todoItem.id
    });
    if (idx < 0) {
      this.todoList.unshift(todoItem);
    } else {
      this.todoList[idx] = todoItem;
    }

    this.countOfUnfinishedTodo = this.todoList.filter(todo => !todo.isFinished).length;
  }
  removeTodo(todoItem) {
    var idx = this.todoList.findIndex((t) => {
      return t.id === todoItem.id
    });
    if (idx < 0)
      return;
    this.todoList.splice(idx, 1);
    this.countOfUnfinishedTodo = this.todoList.filter(todo => !todo.isFinished).length;
  }

  migrateOldData(data) {}
}
class dateEventModel extends baseEventModel {
  constructor(data) {
    super(data, eType.eventType.date);

    if (data === undefined) {
      var today = new Date();
      this.loopMode = loopMode.eventLoopMode.unLoop;
      this.displayMode = displayMode.loopedDateEventDisplayMode.onlyTheNext;
      this.setEndDate(util.addDays(today, 1));
    } else {
      if (data.loopMode !== undefined)
        this.loopMode = data.loopMode;
      if (data.displayNode !== undefined)
        this.displayMode = data.displayNode;
      if (data.perWeek_weekday !== undefined)
        this.perWeek_weekday = data.perWeek_weekday;
      if (data.perMonth_date !== undefined)
        this.perMonth_date = data.perMonth_date;
      if (data.perYear_month !== undefined)
        this.perYear_month = data.perYear_month;
      if (data.perYear_date !== undefined)
        this.perYear_date = data.perYear_date;
      // setEndDate should be called after all loopDetail updated. Because the loopMode will be used to update the endDays when setEndDate.
      if (data.endDate !== undefined)
        this.setEndDate(data.endDate);
    }
  }

  getLoopDisplay() {
    if (this.loopMode === loopMode.eventLoopMode.unLoop) {
      return '';
    }

    switch (this.loopMode) {
      case loopMode.eventLoopMode.perDay:
        return loopMode.eventLoopMode.properties[loopMode.eventLoopMode.perDay].displayName;
      case loopMode.eventLoopMode.perWeek:
        return loopMode.eventLoopMode.properties[loopMode.eventLoopMode.perWeek].displayName + ' ' + dateRelatedEnums.weekDay.properties[this.perWeek_weekday].displayName;
      case loopMode.eventLoopMode.perMonth:
        return loopMode.eventLoopMode.properties[loopMode.eventLoopMode.perMonth].displayName + ' ' + dateRelatedEnums.monthDay.properties[this.perMonth_date].displayName;
      case loopMode.eventLoopMode.perYear:
        return loopMode.eventLoopMode.properties[loopMode.eventLoopMode.perMonth].displayName + ' ' + dateRelatedEnums.month.properties[this.perYear_month].displayName + ' ' + dateRelatedEnums.monthDay.properties[this.perYear_date].displayName;
    }
  }

  migrateOldData(data) {
    super.migrateOldData(data);

    if (data.loopMode === undefined)
      this.loopMode = loopMode.eventLoopMode.unLoop;
    if (data.displayMode === undefined)
      this.displayMode = displayMode.loopedDateEventDisplayMode.onlyTheNext;

    if (data.perWeek_weekday === undefined && data.perMonth_date === undefined && data.perYear_month === undefined && data.perYear_date === undefined && data.beginDate !== undefined) {
      // old data use only beginDate to calculate loop. Should convert to use loopDetail.
      var beginDate = new Date(data.beginDate);
      switch (data.loopMode) {
        case loopMode.eventLoopMode.perDay:
          break;
        case loopMode.eventLoopMode.perWeek:
          this.perWeek_weekday = beginDate.getDay();
          break;
        case loopMode.eventLoopMode.perMonth:
          this.perMonth_date = beginDate.getDate();
          break;
        case loopMode.eventLoopMode.perYear:
          this.perYear_month = beginDate.getMonth();
          this.perYear_date = beginDate.getDate();
          break;
      }
    }
  }

  // This function will calculate out the next date from now if the event is looped.
  getNextDate() {
    if (this.loopMode === loopMode.eventLoopMode.unLoop)
      return this.endDate;

    return this.calculateNextDate();
  }
  calculateNextDate() {
    var today = new Date();
    if (this.loopMode === loopMode.eventLoopMode.unLoop)
      return today;

    switch (this.loopMode) {
      case loopMode.eventLoopMode.perDay:
        return today;
      case loopMode.eventLoopMode.perWeek:
        var weekDayOfToday = today.getDay();
        if (weekDayOfToday === this.perWeek_weekday) {
          return today;
        } else if (weekDayOfToday < this.perWeek_weekday) {
          var weekDayDiff = this.perWeek_weekday - weekDayOfToday;
          today.setDate(today.getDate() + weekDayDiff);
          return today;
        } else {
          var weekDayDiff = this.perWeek_weekday - weekDayOfToday + 7;
          today.setDate(today.getDate() + weekDayDiff);
          return today;
        }
      case loopMode.eventLoopMode.perMonth:
        var dateOfToday = today.getDate();
        if (dateOfToday === this.perMonth_date) {
          return today;
        } else if (dateOfToday < this.perMonth_date) {
          var dateDiff = this.perMonth_date - dateOfToday;
          today.setDate(today.getDate() + dateDiff);
          return today;
        } else {
          today.setMonth(today.getMonth() + 1);
          today.setDate(this.perMonth_date);
          return today;
        }
      case loopMode.eventLoopMode.perYear:
        var monthOfToday = today.getMonth();
        var dateOfToday = today.getDate();
        if (monthOfToday === this.perYear_month && dateOfToday === this.perYear_date) {
          return today;
        }
        if (today.getTime() < new Date(today.getFullYear(), this.perYear_month, this.perYear_date).getTime()) {
          return new Date(today.getFullYear(), this.perYear_month, this.perYear_date);
        } else {
          today.setFullYear(today.getFullYear() + 1);
          today.setMonth(this.perYear_month);
          today.setDate(this.perYear_date);
          return today;
        }
    }
  }
  set loopDetail(detail) {
    this.loopMode = detail.loopMode;
    this.perWeek_weekday = detail.perWeek_weekday;
    this.perMonth_date = detail.perMonth_date;
    this.perYear_month = detail.perYear_month;
    this.perYear_date = detail.perYear_date;

    this.endDays = this.calculateDaysLeft();
  }

  setEndDate(date) {
    this.endDate = util.standardDate(date);
    this.endDays = this.calculateDaysLeft();
  }

  calculateDaysLeft() {
    if (this.loopMode === undefined) {
      throw new Error("loopMode should be set before calculateDaysLeft");
    }
    if (this.loopMode === loopMode.eventLoopMode.unLoop) 
      return util.diffDays(new Date(), this.endDate);

    var theNextDate = this.getNextDate();

    return util.diffDays(new Date(), theNextDate);
  }
  get isCompleted() {
    var daysLeft = util.diffDays(new Date(), this.endDate);
    return daysLeft < 0;
  }
}

class tickEventModel extends baseEventModel {
  constructor(data) {
    super(data, eType.eventType.tick);

    this.endTicks = data !== undefined ? data.endTicks : 1;
    this.tickList = [];
    if (data !== undefined && data.tickList !== undefined) {
      for (var i in data.tickList) {
        this.tickList.unshift(new tickItem(data.tickList[i].time, data.tickList[i].desc));
      }
    }
  }
  migrateOldData(data) {
    super.migrateOldData(data);
  }
  get isCompleted() {
    return this.tickList.length >= this.endTicks;
  }
  addTick(tick) {
    this.tickList.unshift(tick);
  }
}

// Todo: change setLoopDetail to public to remove this workarround function.
const setLoopDetail = function(event, loopMode, perWeek_weekday, perMonth_date, perYear_month, perYear_date) {
  event.loopDetail = {
    loopMode,
    perWeek_weekday,
    perMonth_date,
    perYear_month,
    perYear_date
  };
}

const addTick = (event, tickDesc) => {
  if (event.tickList == null) {
    event.tickList = [];
  }
  if (event.tickList.length + 1 <= event.endTicks) {
    event.addTick(new tickItem(new Date(), tickDesc));
  }
}

module.exports = {
  todoItem: todoItem,
  dateEventModel: dateEventModel,
  tickEventModel: tickEventModel,
  setLoopDetail: setLoopDetail,
  addTick,
}