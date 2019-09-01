<template>
  <v-layout row wrap>
    <v-flex offset-md2 md8>
      <v-card dark
      outlined>
        <v-layout row-wrap>
          <v-flex md3>
            <v-img :src="beer.image_url" max-height="400px" contain :title="beer.name" class="bottle"></v-img>
          </v-flex>
          <v-flex md9>
            <v-card-title>
              {{beer.name}}
              <v-icon v-if="beer.isFavorite" class="fav" title="Remove from favorites" @click="unfav">star</v-icon>
              <v-icon v-else class="unfav" title="Add to favorites" @click="fav">star</v-icon>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="descr">
              {{beer.description}}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="pairing">
              Best food pairings: <span v-for="pair in beer.food_pairing"><span class="pair">{{pair}} </span></span>
            </v-card-text>
            <v-divider></v-divider>
            <span class="character">Alcohol by volume: <span class="amount">{{beer.abv}}%</span></span>
            <span class="character">International bitterness units: <span class="amount">{{beer.ibu}}</span></span>
            <span class="character">SRM: <span class="amount">{{beer.srm}}</span>; EBC: <span class="amount">{{beer.ebc}}</span></span>
            <span class="character">First brewed: <span class="amount">{{this.brewDate}}</span></span>
            <span class="character">Attenuation level: <span class="amount">{{beer.attenuation_level}}%</span></span>
          </v-flex>
        </v-layout>
      </v-card>
      <v-flex md2>
        <v-btn dark class="back" @click="back"><v-icon>arrow_left</v-icon>Back</v-btn>
      </v-flex>
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
      computed: {
          brewDate () {
            var mas = this.beer.first_brewed.split('/')
            switch (mas[0]) {
              case '01':
                return 'January, ' + mas[1]
              case '02':
                return 'February, ' + mas[1]
              case '03':
                return 'March, ' + mas[1]
              case '04':
                return 'April, ' + mas[1]
              case '05':
                return 'May, ' + mas[1]
              case '06':
                return 'June, ' + mas[1]
              case '07':
                return 'July, ' + mas[1]
              case '08':
                return 'August, ' + mas[1]
              case '09':
                return 'September, ' + mas[1]
              case '10':
                return 'October, ' + mas[1]
              case '11':
                return 'November, ' + mas[1]
              case '12':
                return 'December, ' + mas[1]
            }
          }
      },
      created() {
          this.beer = this.$store.getters.BEER(this.$route.params.id)
        document.title = this.beer.name
      },
      methods: {
          back() {
            history.back()
            console.log('we are back')
          },
        fav() {
          this.$store.dispatch('favBeer', this.beer)
          this.$forceUpdate()
        },
        unfav() {
          this.$store.dispatch('unfavBeer', this.beer)
          this.$forceUpdate()
        }
      }
    }
</script>

<style scoped>
.bottle {
  margin: 10px auto
}
  .descr {
    text-align: justify;
    font-size: initial;
  }
  .pairing {
    text-align: left;
    font-size: larger;
  }
  .character {
    text-align: left;
    display: block;
    padding-left: 20px;
    margin-top: 3px;
    font-size: 15px;
    color: #d4d4d4;
    font-style: italic;
  }
  .amount {
    font-weight: bolder;
    color: black;
  }
  .pair {
    font-weight: bolder;
    color: black;
    display: block;
    font-size: initial;
  }
  .back {
    margin-top: 20px
  }
  .fav {
    color: rgb(255, 255, 0);
    margin-left: 10px
  }
  .unfav {
    margin-left: 10px
  }
</style>
