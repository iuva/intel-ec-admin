<script setup>
// Root application component - serves as the main entry point for the Vue application
// Contains the router view that renders different pages based on the current route
</script>

<template>
  <!-- Root application container -->
  <div id="app">
    <!-- Router view - renders the component associated with the current route -->
    <router-view />
  </div>
</template>

<style>
/* Global CSS reset - removes default margins and padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Body styling - sets default font family and text rendering */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* App container styling - ensures the app takes full viewport height and hides overflow */
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
