<template>
  <v-layout row wrap>
    <v-flex offset-md2 md8>
      <v-card dark
      outlined>
        <v-layout row-wrap>
          <v-flex md4>
            <v-img :src="beer.image_url" max-width="200px" contain :title="beer.name"></v-img>
          </v-flex>
          <v-flex md8>
            <v-card-title>
              {{beer.name}}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              {{beer.description}}
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
    export default {
        name: "BeerInfo",
      data () {
          return {
            beer: JSON
          }
      },
      created() {
          this.beer = this.$store.getters.BEER(this.$route.params.id)
        document.title = this.beer.name
        console.log(this.beer)
      }
    }
</script>

<style scoped>
.v-card-text {
  padding-top: 0;
}
</style>
