<template>
  <section class="container">
    <div>
      <h1>welcome to first page</h1>
    </div>
  </section>
</template>

<script>


export default {
  name: "Index",
  components: {},
  props: {},
  data: () => {
    return {}
  },
  computed: {
    data(){
      return true
      // return this.$store.getters['data/getLoading']
    }
  },
  watch: {
    items(newParams, oldParams) {
      // console.log('oldParams is:', oldParams)
      // console.log('newParams is:', newParams)
    }
  },
  created: function () {
    // this.$store.dispatch({
    //     type: 'dataTables/resetData'
    // })
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$store.dispatch({
        type: 'dataTables/resetData'
      })
      this.param = this.$route.params.dataTables
      this.$store.dispatch({
        type: 'dataTables/getParam',
        param: this.$route.params.dataTables
      })
      this.$store.dispatch({
        type: 'dataTables/getData'
      })
    }
  }
}
</script>

<style>

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
