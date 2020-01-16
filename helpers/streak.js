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
  const sortedStreak = sortStreak(aEvents);
  return filterData(sortedStreak);
}

const sortStreak = (streak) => {
  return streak.sort((a, b) => {
    return (b.streak === a.streak) ? new Date(b.created_at) - new Date(a.created_at) : b.streak - a.streak;
  });
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

const sortEventCount = (events, ...condition) => {
  return events.sort((a, b) => {
    return (b.eventCount === a.eventCount) ? new Date(b.created_at) - new Date(a.created_at) : b.eventCount - a.eventCount;
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
  const actors = sortEventCount(actorList);
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
