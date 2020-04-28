<template>
    <div id="app" class="container container__mod pt-2 mb-2">
        <app-navbar></app-navbar>
        <transition name="component-fade" mode="out-in">
            <router-view/>
        </transition>
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
    .component-fade-enter-active {
        animation: slide-left 300ms ease-in forwards;
    }
    .component-fade-leave-active {
        animation: slide-right 300ms ease-in forwards;
    }
    @keyframes slide-left {
        from{
            transform: translateY(-10px);
            opacity: 0;
        }
        to{
            transform: translateY(0);
            opacity: 1;
        }
    }
    @keyframes slide-right {
        from{
            transform: translateY(0);
            opacity: 1;
        }
        to{
            transform: translateY(10px);
            opacity: 0;
        }
    }
</style>
