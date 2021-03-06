export default function reducer(state = {
  city: '',
  date: new Date().toDateString(),
  fromHour: (new Date()).getHours(),
  toHour: (new Date()).getHours() + 1,
  hourlyRate: '',
  intro: '',
  statement: '',
  pointsOfInterest: []
}, action) {
  if (action.type === 'BECOME_GUIDE_CITY') {
    return {...state, city: action.payload}
  } else if (action.type === 'BECOME_GUIDE_DATE') {
    return {...state, date: action.payload}
  } else if (action.type === 'BECOME_GUIDE_FROM_HOUR') {
    return {...state, fromHour: action.payload}
  } else if (action.type === 'BECOME_GUIDE_TO_HOUR') {
    return {...state, toHour: action.payload}
  } else if (action.type === 'BECOME_GUIDE_RATE') {
    return {...state, hourlyRate: action.payload}
  } else if (action.type === 'BECOME_GUIDE_INTRO') {
    return {...state, intro: action.payload}
  } else if (action.type === 'BECOME_GUIDE_STATEMENT') {
    return {...state, statement: action.payload}
  } else if (action.type === 'BECOME_GUIDE_POINTS_OF_INTEREST') {
    return {...state, pointsOfInterest: action.payload}
  }
  return state;
}