import { makeClient, getExamSessions, getExamSessionById, getExamConstraints, postTemporarySeat, getExamReservations } from '@/api/svpService'

export default {
  namespaced: true,
  state: () => ({ sessions: [], sessionDetails: null, constraints: null, tempSeatResult: null, reservations: [], loading: false, error: null, token: '' }),
  mutations: {
    SET_LOADING(state,v){ state.loading=v },
    SET_ERROR(state,e){ state.error=e },
    SET_SESSIONS(state,s){ state.sessions=s },
    SET_SESSION_DETAILS(state,d){ state.sessionDetails=d },
    SET_CONSTRAINTS(state,c){ state.constraints=c },
    SET_TEMPSEAT(state,r){ state.tempSeatResult=r },
    SET_RESERVATIONS(state,r){ state.reservations=r },
    SET_TOKEN(state,t){ state.token=t }
  },
  actions: {
    setToken({commit}, token){ commit('SET_TOKEN', token) },
    async fetchExamSessions({commit,state},{category_id,city,exam_date}){ commit('SET_LOADING', true); commit('SET_ERROR', null); try{ const client = makeClient(state.token); const data = await getExamSessions(client,{category_id,city,exam_date}); commit('SET_SESSIONS', data.exam_sessions || []); return data }catch(e){ commit('SET_ERROR', e); throw e }finally{ commit('SET_LOADING', false) } },
    async fetchExamConstraints({commit,state}){ commit('SET_LOADING', true); try{ const client = makeClient(state.token); const d = await getExamConstraints(client); commit('SET_CONSTRAINTS', d); return d }catch(e){ commit('SET_ERROR', e); throw e }finally{ commit('SET_LOADING', false) } },
    async fetchSessionById({commit,state}, sessionId){ commit('SET_LOADING', true); try{ const client = makeClient(state.token); const d = await getExamSessionById(client, sessionId); commit('SET_SESSION_DETAILS', d); return d }catch(e){ commit('SET_ERROR', e); throw e }finally{ commit('SET_LOADING', false) } },
    async createTemporarySeat({commit,state}, payload){ commit('SET_LOADING', true); try{ const client = makeClient(state.token); const d = await postTemporarySeat(client, payload); commit('SET_TEMPSEAT', d); return d }catch(e){ commit('SET_ERROR', e); throw e }finally{ commit('SET_LOADING', false) } },
    async fetchReservations({commit,state}){ commit('SET_LOADING', true); try{ const client = makeClient(state.token); const d = await getExamReservations(client); commit('SET_RESERVATIONS', d.exam_reservations || []); return d }catch(e){ commit('SET_ERROR', e); throw e }finally{ commit('SET_LOADING', false) } }
  },
  getters: { sessions: s => s.sessions, sessionDetails: s => s.sessionDetails, constraints: s => s.constraints, tempSeatResult: s => s.tempSeatResult, reservations: s => s.reservations, loading: s => s.loading, error: s => s.error, token: s => s.token }
}
