<template>
<main>
  <v-layout row>
    <v-flex offset-md3 md6>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="beer in beers" :key="beer.id" md4>
            <v-card class="mx-auto"
                    max-width="400"
                    outlined>
              <v-list-item two-line>
                <v-list-item-icon>
                  <v-img :src="beer.image_url" max-height="100px" contain></v-img>
                </v-list-item-icon>
              </v-list-item>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>

  </v-layout>
</main>
</template>

<script>
    export default {
        name: "BeersView",
      data () {
          return {
            beers: [],
            loaded: false
          }
      },
      async beforeCreate() {
        if (!this.loaded) {
          await this.$store.dispatch('getBeers')
          this.beers = this.$store.getters.BEERS
          console.log('got')
          this.loaded = true
        }
      }
    }
</script>

<style scoped>

</style>
