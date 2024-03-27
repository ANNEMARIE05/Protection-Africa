<template>
    <div>
      <input 
        :type="props.inputType" 
        :value="props.modelValue" 
        @input="updateValue($event.target.value)" 
        :placeholder="props.placeholder" 
        class="py-3 text-base w-full font-medium px-7 text-dark dark:text-white focus:outline-none custom-input"
      >
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
      inputType: {
          type: String,
          default: 'text'
      },
      modelValue: {
          type: String,
          default: ''
      },
      placeholder: {
          type: String,
          default: ''
      }
  });
  
  const emit = defineEmits(['update:modelValue']);
  const updateValue = (value) => {
      emit('update:modelValue', value);
  };
  </script>
  
  <style scoped>
  /* Styles for removing default blue focus outline */
  .custom-input {
      border: 1px solid rgba(0, 0, 0, 0); /* Remove default border */
      border-radius: 7px; /* Add border radius */
      background-color: rgb(247, 247, 231);
      color: black; /* Set text color to black */
  }
  
  /* Styles for adding border on focus */
  .custom-input:focus {
      border: 1px solid #667EEA; /* Add border on focus */
  }
  
  /* Set background color to white and text color to black when typing */
  .custom-input:focus {
      color: black;
      background-color: white;
  }
  </style>