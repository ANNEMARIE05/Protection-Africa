<template>
    <div>
      <NuxtLink to="/">
        <h1 :class="titleClass" class="text-2xl font-bold sm:text-2xl">Protect_Africa</h1>
      </NuxtLink>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const titleClass = route.path === '/register' ? 'text-white' : 'text-indigo-600'
  </script>
  