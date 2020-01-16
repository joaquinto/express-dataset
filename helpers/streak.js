const streak = (events) => {
  let aEvents = [];
  let streak = 0;
  let temp = 0;
  events.forEach((event, index) => {
    if (index === events.length - 1) {
      if (event.actor.id === events[index - 1]) {
        streak += 1;
      }
    } else if (event.actor.id === events[index + 1].actor.id) {
      const hours = Math.abs(new Date(event.created_at) - new Date(events[index + 1].created_at)) / 36e5;
      if (hours < 25) {
        streak += 1;
        if (temp < streak) {
          temp = streak;
        }
      } else {
        temp = 0;
        streak = 0;
      }
    }
    event.streak = temp > streak ? temp : streak;
    aEvents.push(events[index]);
    temp = 0;
    streak = 0;
  });
  return aEvents;
}

const sortStreak = (streak) => {
  return streak.sort((a, b) => {
    return (b.streak === a.streak) ? new Date(b.created_at) - new Date(a.created_at) : b.streak - a.streak;
  });
}

const streamlineData = (data) => {
  const eventData = [];
  data.forEach((events) => {
    eventData.push(events.actor);
  });
  return eventData;
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

module.exports = {
  streak: streak,
  sortStreak: sortStreak,
  streamlineData: streamlineData,
  getUniqueActor: getUniqueActor
}
