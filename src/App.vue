<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <router-link
            class="navbar-brand"
            to="/home">
            JDM Store  
          </router-link>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
              <router-link 
                tag= "button"
                class="menu btn btn-dark"
                v-for="link in links"
                :key="link.title"
                :to="link.url"
                >
                  <i :class="'bx nav_icon '+ link.icon"></i> 
                  {{ link.title }}
              </router-link>
              <button
                v-if="isUserLoggedIn"
                class="btn btn-dark"
                @click="onLogout"><i class="bx nav_icon bx-log-out"></i>Logout</button>
            </ul>
          </div>

        </div>
      </nav>

      <!-- Sizes your content based upon application components -->
      <main>
        <router-view></router-view>
      </main>

      <!-- Modal -->
      <div 
          :class="{'self-flow-root': errorMessage}"
          class="modal" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Error</h5>
            </div>
            <div class="modal-body">
              {{ errorMessage }}
            </div>
            <div class="modal-footer">
              <button
                type="button" 
                class="btn btn-danger"
                @click="closeError()">OK</button>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  data(){
    return {
      drawer: false
    }
  },
  computed: {
    errorMessage () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          {'title': 'Orders','icon': 'bx-bookmark', 'url': '/orders'},
          {'title': 'New ad','icon': 'bx-file-earmark-plus', 'url': '/newad'},
          {'title': 'My ads','icon': 'bx-list-ul', 'url': '/list'}
        ]
      } else {
        return [
          {'title': 'Login','icon': 'bx-user', 'url': '/login'},
          {'title': 'Registration','icon': 'bx-file-earmark', 'url': '/registration'}
        ]
      }
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .self-flow-root {
    display: flow-root !important;
  }
  .menu {
    cursor: pointer;
    margin: auto;
    margin-inline: 5px;
  }
</style>