
/* List view is already a component */

ListView = Vue.component('list-view', (
{
  data: function() {
    return {
        entrylist: this.$store.state.alchemists
    }
  },
  template: 
  `
  <div class="three columns">
  <button @click="filter">Filtreeri välja vesi</button>
  <ul><list-item v-for="item in entrylist" :key="item.id" :idnum="item.id" :name="item.name"></list-item></ul>
  </div>
  `,
    methods: {
      filter: function() {
          this.entrylist =  this.$store.getters.airElements
      }
    }

}
))


/* nice component */
Vue.component( 'list-item', (
  {
    props: [ 'idnum', 'name'],
    computed: {
      addr: function() {
        return "#/item/" + this.idnum;
      }
    },
    template: '<li><a :href="addr">{{name}}</a></li>'
  }
))

const Add = Vue.component('add-view', ({ 
  
  data: function() {
    return { 
      entrylist: this.$store.state.alchemists,
      name: "",
      fav: "",
      newId: 3
     } 
  },
  methods: {
    addNew: function() {
      this.newId = this.newId + 1;
      store.commit('add', {id: this.newId, name: this.name, fav: this.fav});
      this.name = "";
      this.fav = "";
    }
  },
  template: 
  `
  <div>
  <h2>Lisamine</h2>
  <form>
  <input type="text" placeholder="Nimi" id="name" v-model="name"/>
  <input type="text" placeholder="Element" id="name" v-model="fav"/>
  <input type="submit" @click="addNew"/>
  </form>
  </div>
  `
}
))

Details = Vue.component('details', (
    {
        data: function() {
            return { entrylist: this.$store.state.alchemists }
        },
        template:
            `
            <div><h1>Detailid {{$route.params.id}}</h1>
            <div>
            Nimi: {{ entrylist[$route.params.id].name}}
            </div>
            <div>
            Element: {{ entrylist[$route.params.id].fav}}
            </div>
            </div>
            `
    }
))


/* nice component */
Vue.component( 'list-item', (
    {
        props: [ 'idnum', 'name'],
        computed: {
            addr: function() {
                return "#/item/" + this.idnum;
            }
        },
        template: '<li><a :href="addr">{{name}}</a></li>'
    }
))


/* ROUTER ELEMENTS */
routes = [
  { path: '/list', component: ListView },
  { path: '/add', component: Add },
  { path: '/item/:id', component: Details} // change into a proper component
]

const router = new VueRouter(
  {routes, linkActiveClass: "button-primary"}
)

/* ADD STORE HERE*/
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        alchemists: [
            { id: 0, name: 'Hermes Trismegistus', fav:'Earth'},
            { id: 1, name: 'Ostanes', fav:'Fire'},
            { id: 2, name: 'Nicolas Flamel', fav:'Air'},
            { id: 3, name: 'Perenelle Flamel', fav:'Water'}
        ]
    },
    mutations: {
        add (state, alchemist) {
            state.alchemists.push(alchemist)
        }
    },
    getters: {
        airElements: state => {
            return state.alchemists.filter(x => (x.fav === 'Water'));
        }
    }
})
// store needs an alchemist list with
// a mutator to add alchemists
// a getter for a free alchemist in it and a getter which filters only Water alchemists


/* VUE APP */

var vm = new Vue(
{ 
  router,
  store // provides this.$store object to the components, but you need to create store obj first
}
).$mount('#app');
