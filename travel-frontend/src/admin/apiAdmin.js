// import { API } from '../config';

// // export const createEvent = (userId, token, event) => {
// //   return fetch(`${API}/event/create/${userId}`, {
// //     method: 'POST',
// //     headers: {
// //       Accept: 'application/json',
// //       'Content-Type': 'application/json',
// //       Authorization: `Bearer ${token}`,
// //     },
// //     body: JSON.stringify(event),
// //   })
// //     .then((response) => {
// //       return response.json();
// //     })
// //     .catch((err) => {
// //       console.log(err);
// //     });
// // };

// export const createEvent = (userId, token, event) => {
//   return fetch(`${API}/event/create/${userId}`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: event,
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export const updateEvent = (eventId, userId, token, event) => {
//   return fetch(`${API}/event/${eventId}/${userId}`, {
//     method: 'PUT',
//     headers: {
//       // content type?
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(event),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

// export const createTrip = (userId, token, trip) => {
//   return fetch(`${API}/trip/create/${userId}`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: trip,
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export const getEvent = (eventId) => {
//   return fetch(`${API}/event/${eventId}`, {
//     method: 'GET',
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

// //  rechck this
// export const getEvents = () => {
//   return fetch(`${API}/events`, {
//     method: 'GET',
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };
