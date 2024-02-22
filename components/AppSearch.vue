<template>
  <div class="search">
    <input
      class="search-input"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <NuxtIcon
      class="search-cross"
      name="Cross"
      size="55px"
      v-show="modelValue"
      @click="$emit('clear')"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    require: true,
    default: '',
  },
  placeholder: {
    type: String,
    require: true,
    default: '',
  },
});
defineEmits(['update:modelValue', 'clear']);
</script>

<style></style>
