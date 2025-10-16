<template>
  <div>
    <header style="background:#007bff;color:#fff;padding:12px;">
      <h1 style="margin:0;">SVP Live Dashboard</h1>
    </header>
    <main style="padding:16px;">
      <SvpDashboard />
    </main>
  </div>
</template>

<script>
import SvpDashboard from './views/SvpDashboard.vue'
export default { components: { SvpDashboard } }
</script>
