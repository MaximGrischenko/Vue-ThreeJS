<template>
  <header id="header">
    <md-toolbar class="md-primary" md-elevation="1">
      <h3 class="md-title" style="flex: 1">ThreeJS Primitives</h3>
      <md-menu md-direction="bottom-end"
               md-size="medium"
               :md-offset-y="5"
               :mdCloseOnSelect="closeOnSelect">
        <md-button class="md-icon-button md-raised md-primary"
                   md-menu-trigger >
          <md-icon>menu</md-icon>
        </md-button>

        <md-menu-content>
          <md-menu-item v-for="option in options"
                        v-bind:data-option="option"
                        v-on:click="handleClick(option)">Add {{option}}</md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-toolbar>
  </header>
</template>

<script>
import { EventBus } from "../../main";

export default {
  name: 'Header',
  props: {
    msg: String
  },
  data () {
    return {
      type: '',
      options: ["Cube", "Cone", "Sphere"],
      closeOnSelect: true
    }
  },
  methods: {
    handleClick: function (type) {
      EventBus.$emit('add', type);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #header {
    margin-bottom: 10px;
  }
  .md-menu-content {
    min-height: auto;
    max-height: 200px;
  }
  .md-menu-item:hover {
    background-color: #eee;
    transition: all 0.3s ease-in-out;
  }
</style>
