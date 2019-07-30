<template>
  <v-app id="app">
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  beforeCreate() {
    console.log('before create app')
  },
  created() {
    console.log('create app')
  },
  beforeMount() {
    console.log('before mount app')
  },
  mounted() {
    console.log('mounted app')
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
