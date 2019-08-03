<template>
  <footer>
    <md-list>
      <md-list-item v-for="mesh in collection"
                    v-bind:key="mesh.uuid">
        <md-button class="md-icon-button md-raised md-primary"
                   v-on:click="handleClick(mesh.uuid)">
          <md-icon>delete</md-icon>
        </md-button>
        <span class="md-list-item-text">{{mesh.type}} - ({{mesh.uuid}})</span>
        <md-divider class="md-inset"></md-divider>
      </md-list-item>
    </md-list>
  </footer>
</template>

<script>
  import { EventBus } from "../../main";

  export default {
    name: "Footer",
    props: ["collection"],
    methods: {
      handleClick: function (uuid) {
        EventBus.$emit('del', uuid);
      }
    }
  }
</script>

<style scoped>

</style>