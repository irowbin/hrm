<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
    <router-link class="navbar-brand text-info h2 mb-0 logo" to="/">NEX HRM</router-link>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <router-link to="/" tag="li" class="nav-item" active-class="active" exact>
          <a class="nav-link">Dashboard</a>
        </router-link>
        <router-link to="/employee" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">Employee</a>
        </router-link>
        <router-link to="/users" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">Users</a>
        </router-link>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <ul class="navbar-nav">
          <li class="nav-item dropdown navbar-right " :class="{'show':showDropdown}">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="showDropdown = !showDropdown">
              Profile
            </a>
            <div class="dropdown-menu " :class="{'show':showDropdown}">
              <a class="dropdown-item" href="#">Edit</a>
              <a class="dropdown-item" href="#">Log Out</a>
            </div>
          </li>
        </ul>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      showDropdown: false
    }
  }
}
</script>

<style scoped>

</style>
