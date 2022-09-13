  import { mapGetters } from 'vuex'
  
  export default {
    onShow: function() {
    		this.setBadge()
    	},
    methods: {
        setBadge() {
          uni.setTabBarBadge({
            index: 2,
            text: this.total + ''
          })
        }
    },
    computed: {
        ...mapGetters('m_cart', ['total'])
    },
    watch: {
      total() {
        this.setBadge()
      }
    }
  }