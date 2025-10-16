import axios from 'axios'

const BASE = 'https://svp-international-api.pacc.sa/api/v1/individual_labor_space'

export function makeClient(token) {
  const headers = {}
  if (token) headers.Authorization = token
  return axios.create({ baseURL: BASE, headers, timeout: 20000 })
}

export async function getExamSessions(client, params = {}) {
  const res = await client.get('/exam_sessions', { params: Object.assign({ locale: 'en' }, params) })
  return res.data
}

export async function getExamSessionById(client, id) {
  const res = await client.get(`/exam_sessions/${encodeURIComponent(id)}`, { params: { locale: 'en' } })
  return res.data
}

export async function getExamConstraints(client) {
  const res = await client.get('/exam_constraints', { params: { locale: 'en' } })
  return res.data
}

export async function postTemporarySeat(client, payload) {
  const res = await client.post('/temporary_seats', payload, { params: { locale: 'en' } })
  return res.data
}

export async function getExamReservations(client) {
  const res = await client.get('/exam_reservations', { params: { locale: 'en' } })
  return res.data
}
