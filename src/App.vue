<template>
    <div id="app" class="container container__mod pt-2 mb-2">
        <app-navbar></app-navbar>
        <router-view/>
    </div>
</template>
<script>
import Navbar from '@/components/layout/navbar'
export default {
  components: {
    'app-navbar': Navbar
  }
}
</script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Kumar+One+Outline&family=Monoton&display=swap');

    .logo {
        font-family: 'Audiowide', cursive;
    }

    .container__mod {
        min-height: 98vh;
        box-shadow: 0 0 10px 0 #c9d7e2;
    }
</style>
