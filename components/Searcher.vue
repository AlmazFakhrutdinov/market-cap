<template>
  <div v-if="coinsId" class="searcher">
    <input v-model="coinId" class="searcher__input" type="text" />
    <!-- <div class="searcher__item">
      <recycle-scroller
        v-slot="{ item }"
        class="scroller"
        :items="coinsId"
        key-field="id"
      > -->
    <!-- <label>
          <fa class="dropdown__icon" :icon="['fa', 'star']" />
          <fa class="dropdown__icon" :icon="['far', 'star']" />
        </label> -->
    <!-- <div style="height: 32px;">
          {{ item }}
        </div>
      </recycle-scroller> -->
    <!-- </div> -->
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  props: ['coinsId'],
  data() {
    return {
      coinId: '',
      lal: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.scroller {
  height: 320px;
  overflow: auto;
}
// .searcher {
//   position: relative;

//   &__input {
//     height: 30px;

//     // width:
//   }
//   &__item {
//     border-radius: 5px;
//     border: 1px solid black;
//     padding: 10px;
//     background-color: #00d1b2;
//     // overflow: auto;
//     position: absolute;
//     width: 300px;
//     height: 300px;
//     left: 0;
//     top: 20;
//   }
//   &__coin-id {
//   }
// }

.dropdown {
  display: flex;
}
</style>
