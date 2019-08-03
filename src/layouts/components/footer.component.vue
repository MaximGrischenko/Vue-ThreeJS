<template>
  <footer>
    <md-list>
      <md-list-item v-for="(mesh, index) in collection"
                    v-bind:key="mesh.uuid">
        <md-button class="md-icon-button md-raised md-primary"
                   v-on:click="handleClick(mesh.uuid)">
          <md-icon>delete</md-icon>
        </md-button>
        <span class="md-list-item-text">{{mesh.type}} - ({{mesh.uuid}})</span>
        <span class="md-list-item-text label">Scale: {{scale[index]}}</span>
        <div class="ui-slider">
          <input type="range" min="1" max="10" v-model="scale[index]" v-on:change="handleChange(mesh.uuid, index)" class="slider">
        </div>
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
    data() {
      return {
        scale: []
      }
    },
    methods: {
      handleClick: function (uuid) {
        EventBus.$emit('del', uuid);
      },
      handleChange: function (uuid, index) {
        EventBus.$emit('scale', uuid, this.scale[index]);
      }
    }
  }
</script>

<style scoped>
  .md-list-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .md-list-item-text {
    display: block;
    margin: 0 20px;
  }
  .label {
    max-width: 70px;
  }
  .ui-slider {
    width: 120px;
  }
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    background: #d3d3d3;
    border-radius: 5px;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }
  .slider:hover {
    opacity: 1;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: orangered;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: orangered;
    cursor: pointer;
  }
</style>