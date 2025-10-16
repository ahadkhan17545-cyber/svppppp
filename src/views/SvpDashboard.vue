<template>
  <div class="svp">
    <section class="controls">
      <label>Auth Token (optional):
        <input v-model="tokenInput" placeholder="Bearer ..." style="width:100%"/>
      </label>
      <label>Category ID:
        <input v-model.number="category" type="number" />
      </label>
      <label>City:
        <input v-model="city" />
      </label>
      <label>Exam Date (YYYY-MM-DD):
        <input v-model="examDate" />
      </label>
      <div style="margin-top:8px;">
        <button @click="loadSessions">Load Sessions</button>
        <button @click="loadConstraints">Load Constraints</button>
        <button @click="loadReservations">Load Reservations</button>
      </div>
    </section>

    <div style="display:flex;gap:16px;margin-top:16px;">
      <div style="flex:1;">
        <h3>Sessions</h3>
        <table style="width:100%;border-collapse:collapse">
          <thead><tr><th>ID</th><th>Site ID</th><th>City</th><th>Start</th><th></th></tr></thead>
          <tbody>
            <tr v-for="s in sessions" :key="s.id">
              <td>{{s.id}}</td>
              <td>{{s.test_center?.site_id}}</td>
              <td>{{s.test_center?.city}}</td>
              <td>{{s.start_date_in_tc_time_zone || s.start_date_in_browser_time_zone}}</td>
              <td><button @click="selectSession(s.id)">Select</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="width:420px;">
        <h3>Details & Actions</h3>
        <div v-if="constraints"><h4>Constraints</h4><pre>{{constraints}}</pre></div>
        <div v-if="sessionDetails"><h4>Session {{sessionDetails.id}}</h4><pre>{{sessionDetails}}</pre></div>

        <div style="margin-top:12px;">
          <h4>Create Temporary Seat</h4>
          <label>Occupation ID: <input v-model.number="occupationId" type="number" /></label>
          <label>Language Code: <input v-model="languageCode" /></label>
          <label>Site ID (optional): <input v-model="siteId" /></label>
          <div style="margin-top:8px;"><button @click="createTempSeat">Reserve Temp Seat</button></div>
        </div>

        <div v-if="tempSeatResult" style="margin-top:12px;"><h4>Temporary Seat Result</h4><pre>{{tempSeatResult}}</pre></div>

        <div v-if="reservations" style="margin-top:12px;"><h4>Reservations</h4><pre>{{reservations}}</pre></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SvpDashboard',
  data(){ return { tokenInput:'', category:159, city:'Khulna', examDate:'2025-10-12', selectedId:null, occupationId:2061, languageCode:'bn', siteId:null } },
  computed: {
    sessions(){ return this.$store.getters['svpApi/sessions'] },
    sessionDetails(){ return this.$store.getters['svpApi/sessionDetails'] },
    constraints(){ return this.$store.getters['svpApi/constraints'] },
    tempSeatResult(){ return this.$store.getters['svpApi/tempSeatResult'] },
    reservations(){ return this.$store.getters['svpApi/reservations'] }
  },
  methods:{
    async loadSessions(){
      if(this.tokenInput) this.$store.dispatch('svpApi/setToken', this.tokenInput)
      await this.$store.dispatch('svpApi/fetchExamSessions', { category_id:this.category, city:this.city, exam_date:this.examDate })
    },
    async loadConstraints(){ if(this.tokenInput) this.$store.dispatch('svpApi/setToken', this.tokenInput); await this.$store.dispatch('svpApi/fetchExamConstraints') },
    async selectSession(id){ this.selectedId = id; if(this.tokenInput) this.$store.dispatch('svpApi/setToken', this.tokenInput); await this.$store.dispatch('svpApi/fetchSessionById', id) },
    async createTempSeat(){ const payload = { exam_session_id: Number(this.selectedId), occupation_id: Number(this.occupationId), language_code: this.languageCode, site_id: this.siteId || null, site_city:null, hold_id:null }; if(this.tokenInput) this.$store.dispatch('svpApi/setToken', this.tokenInput); await this.$store.dispatch('svpApi/createTemporarySeat', payload) },
    async loadReservations(){ if(this.tokenInput) this.$store.dispatch('svpApi/setToken', this.tokenInput); await this.$store.dispatch('svpApi/fetchReservations') }
  }
}
</script>
