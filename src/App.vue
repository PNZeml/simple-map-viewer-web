<template>
  <v-app id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </v-app>
</template>

<style lang="scss">
  #app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  .app-background {
    background: url('/assets/app-background.jpg') no-repeat center center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
  }
</style>
