<template>
  <div id="layout">
    <Header />
    <Scene v-on:save="onSave" v-on:clear="onDelete" />
    <Footer :collection="collection" />
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapActions, mapGetters } = createNamespacedHelpers('scene');

import Header from './components/header.component';
import Scene from './components/scene.component';
import Footer from './components/footer.component';

export default {
  name: 'app',
  components: {
    Header,
    Scene,
    Footer
  },
  computed: {
    ...mapGetters(['collection'])
  },
  methods: {
    ...mapActions(['add', 'del']),
    onSave(payload) {
      this.add(payload);
    },
    onDelete(payload) {
      this.del(payload);
    }
  }
}
</script>

<style>
#layout {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
