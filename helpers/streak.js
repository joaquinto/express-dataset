const streak = (events) => {
  let aEvents = [];
  let streak = 0;
  events.forEach((event, index) => {
    if (index === events.length - 1) {
      if (event.actor.id === events[index - 1]) {
        streak += 1;
      }
    } else if (event.actor.id === events[index + 1].actor.id) {
      const hours = Math.abs(new Date(event.created_at) - new Date(events[index + 1].created_at)) / 36e5;
      if (hours < 25) {
        streak += 1;
      } else {
        streak = 0;
      }
    }
    event.streak = streak;
    aEvents.push(events[index]);
    streak = 0;
  });
  const sortedStreak = sortEvent(aEvents, 'streak', 'created_at');
  return filterData(sortedStreak);
}

const filterData = (data) => {
  const eventData = [];
  data.forEach((events) => {
    eventData.push(events.actor);
  });
  return getUniqueActor(eventData);
}

const getUniqueActor = (data) => {
  return Array.from(new Set(data.map(s => s.id)))
    .map(id => {
      return {
        id: id,
        login: data.find(s => s.id === id).login,
        avatar_url: data.find(s => s.id === id).avatar_url
      }
    });
}

const sortEvent = (events, condition1, condition2) => {
  return events.sort((a, b) => {
    return (b[condition1] === a[condition1]) ? new Date(b[condition2]) - new Date(a[condition2]) : b[condition1] - a[condition1];
  });
}

const getEventCount = (events) => {
  let actorList = [];
  let counter = 0;
  events.forEach((e) => {
    actorList.push(e.actor);
  });
  actorList = getUniqueActor(actorList);
  actorList.forEach((al) => {
    events.forEach((e) => {
      if (e.actor.login === al.login) {
        counter += 1;
        al.created_at = e.created_at;
      }
    });
    al.eventCount = counter;
    counter = 0;
  });
  const actors = sortEvent(actorList, 'eventCount', 'created_at');
  cleanup(actors);
  return actors;
}

const cleanup = (actors) => {
  return actors.forEach((e) => {
    delete e.created_at;
    delete e.eventCount;
  });
}

module.exports = {
  streak: streak,
  getEventCount: getEventCount,
}
