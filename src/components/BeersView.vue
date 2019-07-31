<template>
<main>
  <v-layout row>
    <v-flex offset-md2 md8>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="beer in beers" :key="beer.id" md4>
            <v-card class="mx-auto"
                    max-width="400"
                    elevation="14"
                    dark
                    outlined>
              <v-list>
                <v-list-item two-line class="beer">
                  <v-list-item-icon  class="bottle" :title="beer.name">
                    <v-img :src="beer.image_url" max-height="100px" contain max-width="100px"></v-img>
                  </v-list-item-icon>
                    <v-list-tile-content class="inform">
                      <v-list-tile-title>
                        {{ beer.name }}
                      </v-list-tile-title>
                      <v-divider></v-divider>
                      <v-list-tile-sub-title class="descr">
                        <span title="Alcohol by volume">abv: {{beer.abv}}%</span>, <span title="International bitterness units">ibu: {{beer.ibu}}</span>
                      </v-list-tile-sub-title>

                      <v-list-tile-action>
                          <v-icon v-if="beer.isFavorite" class="fav picked" @click="unfavBeer(beer)" title="Remove from favorites">
                            star_rate
                          </v-icon>
                          <v-icon v-else class="fav" @click="favBeer(beer)" title="Add to favorites">
                            star_rate
                          </v-icon>
                      </v-list-tile-action>
                      <v-list-tile-action class="moreInfo" @click="moveTo(beer.id)" title="Get more info">
                        Learn more...
                      </v-list-tile-action>
                    </v-list-tile-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="6"
            dark
            circle
            @change="this.$forceUpdate()"
          ></v-pagination>
        </div>
      </v-container>
    </v-flex>

  </v-layout>
</main>
</template>

<script>
    export default {
      name: "BeersView",
      data() {
        return {
          beers: [],
          loaded: false,
          page: 5
        }
      },
      async beforeCreate() {
        if (!this.loaded) {
          await this.$store.dispatch('getBeers')
          this.beers = this.$store.getters.BEERS((this.page-1)*15 + 1)
          this.loaded = true
        }
      },
      beforeUpdate() {
        this.beers = this.$store.getters.BEERS((this.page-1)*15 + 1)
      },
      methods: {
        favBeer(beer) {
          this.$store.dispatch('favBeer', beer)
          this.beers = this.$store.getters.BEERS
          this.$forceUpdate()
        },
        unfavBeer(beer) {
          this.$store.dispatch('unfavBeer', beer)
          this.beers = this.$store.getters.BEERS
          this.$forceUpdate()
        }
      }
    }

</script>

<style scoped>
  .bottle {
    margin: 20px 0;
  }
  .beer {
    padding: 0
  }
  .inform {
    margin: 0 10px;
    max-width: 250px;
    font-size: larger;
    font-weight: bold;
  }
  .inform .descr {
    font-size: smaller;
    color: #a9a9a9;
    font-weight: normal;
  }
  .fav {
    margin-right: 150px;
    margin-left: 150px;
    max-width: 24px;
  }
  .picked {
    color: rgb(255, 255, 0);
  }
  .moreInfo {
    font-size: smaller;
    font-weight: normal;
    font-style: italic;
    cursor: pointer;
    margin-left: 1px;
  }
  .mx-auto {
    opacity: 0.95;
  }



</style>
