<template>
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
                        <span title="Alcohol by volume">abv: {{beer.abv}}%</span>, <span v-if="beer.ibu" title="International bitterness units">ibu: {{beer.ibu}}</span>
                        <span v-else title="International bitterness units">ibu: not defined</span>
                      </v-list-tile-sub-title>

                      <v-list-tile-action>
                          <v-icon v-if="beer.isFavorite" class="fav picked" @click="unfavBeer(beer)" title="Remove from favorites">
                            star
                          </v-icon>
                          <v-icon v-else class="fav" @click="favBeer(beer)" title="Add to favorites">
                            star
                          </v-icon>
                      </v-list-tile-action>
                      <v-list-tile-action>
                          <v-icon class="buy">add_shopping_cart</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-action class="moreInfo" @click="moveTo(beer)" title="Get more info">
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
            :length="this.pags"
            dark
            circle
            @change="this.$forceUpdate()"
          ></v-pagination>
        </div>
      </v-container>
      <v-bottom-navigation
        :value="activeBtn"
        color="yellow"
        horizontal
        dark
      >
        <v-btn @click="toAll">
          <span>All</span>
          <v-icon>dashboard</v-icon>
        </v-btn>

        <v-btn @click="toFavorites">
          <span>Favorites</span>
          <v-icon>star</v-icon>
        </v-btn>

      </v-bottom-navigation>
    </v-flex>

  </v-layout>
</template>

<script>
    export default {
      name: "BeersView",
      data() {
        return {
          beers: [],
          loaded: false,
          page: 1,
          pags: 6,
          activeBtn: 0
        }
      },
      async mounted() {
        if (!this.loaded)
          await this.$store.dispatch('getBeers')
        if (this.$route.name === 'favorites') {
          this.page = 1
          this.beers = this.$store.getters.FAVORITES((this.page - 1) * 15 + 1)
          this.activeBtn = 1
        } else {
          this.beers = this.$store.getters.BEERS((this.page - 1) * 15 + 1)
        }
        this.loaded = true
        this.forceUpdate()
      },
      beforeUpdate() {
        if (this.$route.name === 'favorites') {
          this.beers = this.$store.getters.FAVORITES((this.page - 1) * 15 + 1)
          this.pags = Math.trunc(this.$store.getters.FAV_SIZE / 15) + 1
          if (this.$store.getters.FAV_SIZE % 15 === 0) {
            this.pags -= 1
          }
        } else {
          this.beers = this.$store.getters.BEERS((this.page - 1) * 15 + 1)
          this.pags = 6
        }
      },
      methods: {
        favBeer(beer) {
          this.$store.dispatch('favBeer', beer)
          this.$forceUpdate()
        },
        unfavBeer(beer) {
          this.$store.dispatch('unfavBeer', beer)
          this.$forceUpdate()
        },
        moveTo(beer) {
          this.$router.push({name: 'beer', params: {id: beer.id}})
        },
        toFavorites() {
          this.$router.push('favorites')
          this.page = 1
          this.beers = this.$store.getters.FAVORITES((this.page - 1) * 15 + 1)
          this.pags = Math.trunc(this.$store.getters.FAV_SIZE / 15) + 1
          if (this.$store.getters.FAV_SIZE % 15 === 0) {
            this.pags -= 1
          }

        },
        toAll() {
          this.$router.push('/')
          this.beers = this.$store.getters.BEERS(16)
          this.pags = 6
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
    margin-right: 30px;
  }
  .fav {
    margin: 0 40px;
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
    margin-left: 20px;
  }
  .mx-auto {
    opacity: 0.95;
  }
  .buy {
    margin-left: 1px;
    margin-right: 50px;
    cursor: pointer;
  }



</style>
