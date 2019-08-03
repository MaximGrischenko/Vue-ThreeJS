<template>
  <section id="WebGL" ref="el"></section>
</template>

<script>
  import * as Three from 'three';
  import { EventBus } from "../../main";

  export default {
    name: "Scene",
    data() {
      return {
        camera: null,
        scene: null,
        renderer: null,
        requestAF: null,
        coordinates: {
          x: -6,
          y: 2
        },
      }
    },
    methods: {
      handleWindowResize: function() {
        const width = this.$refs.el.clientWidth;
        const height = this.$refs.el.clientHeight;

        this.renderer.setSize(width, height);
        this.camera.aspect = width/height;
        this.camera.updateProjectionMatrix();
      },
      init: function() {
        this.camera = new Three.PerspectiveCamera(70, this.$refs.el.clientWidth/this.$refs.el.clientHeight, 0.01, 1000);
        this.camera.position.z = 15;

        this.scene = new Three.Scene();

        this.renderer = new Three.WebGLRenderer({antialias: true});
        this.renderer.setClearColor(0xeeeeee);
        this.renderer.setSize(this.$refs.el.clientWidth, this.$refs.el.clientHeight);
        this.$refs.el.appendChild(this.renderer.domElement);

       const lights = [];
       lights[0] = new Three.PointLight(0xffffff, 1, 0);
       lights[0].position.set(0, 200, 0);
       this.scene.add(lights[0]);
      },
      animate: function() {
        this.requestAF = requestAnimationFrame(this.animate);

        this.scene.children.forEach((mesh) => {
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.02;
        });

        this.renderer.render(this.scene, this.camera);
      },
      addToScene: function (x, y, obj) {
        obj.position.x = x * 2;
        obj.position.y = y * 2;

        this.scene.add(obj);

        const mesh = {
          uuid: obj.uuid,
          type: obj.geometry.type,
        };
        this.$emit('save', {mesh});
      },
      createMaterial: function () {
        const material = new Three.MeshPhongMaterial({
          side: Three.DoubleSide,
        });

        const hue = Math.random();
        const saturation = 1;
        const luminance = 0.5;
        material.color.setHSL(hue, saturation, luminance);

        return material;
      },
      createGeometry: function (x, y, geometry) {
        const mesh = new Three.Mesh(geometry, this.createMaterial());
        this.addToScene(x, y, mesh);
      },
      calcPosition: function (step) {
        if(this.scene.children.length === 1) {
          this.coordinates.x = -6;
          this.coordinates.y = 2;
        }
        if(this.scene.children.length % 6 === 0 && this.scene.children.length > 1) {
          this.coordinates.y -= step;
          this.coordinates.x = -4;
        } else {
          this.coordinates.x += step;
        }
      }
    },
    created() {
      EventBus.$on("add", (type) => {
        this.calcPosition(2);
        switch (type) {
          case "Cube": {
            this.createGeometry(this.coordinates.x, this.coordinates.y, new Three.BoxBufferGeometry(2, 2, 2));
          } break;
          case "Cone": {
            this.createGeometry(this.coordinates.x, this.coordinates.y, new Three.ConeBufferGeometry(1.5, 2, 16));
          } break;
          case "Sphere": {
            this.createGeometry(this.coordinates.x, this.coordinates.y, new Three.SphereBufferGeometry(1.5, 16, 16));
          } break;
        }
      });
      EventBus.$on("del", (uuid) => {
        this.scene.children = this.scene.children.filter(child => child.uuid !== uuid);
        this.$emit('clear', (uuid));
      });
    },
    mounted() {
      window.addEventListener('resize', this.handleWindowResize);
      this.init();
      this.animate();
    },
    destroyed() {
      window.removeEventListener('resize', this.handleWindowResize);
      cancelAnimationFrame(this.requestAF);
    }
  }
</script>

<style scoped>
  #WebGL {
    height: 300px;
  }
</style>