<template>
  <div class="json-viewer">
    <pre v-html="formatedJson"></pre>
  </div>
</template>

<script setup>
import {computed, watch} from 'vue'

const props = defineProps({
  json: String
})

function format(json) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, null, 2)
  }

  json = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

  return json.replace(
      /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = 'number'
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'key' : 'string'
        } else if (/true|false/.test(match)) {
          cls = 'boolean'
        } else if (/null/.test(match)) {
          cls = 'null'
        }
        return `<span class="${cls}">${match}</span>`
      }
  )
}

const formatedJson = computed(() => format(props.json))

</script>

<style scoped>
pre {
  background: #1e1e1e;
  padding: 16px;
  border-radius: 8px;
  color: #f8f8f2;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
}

/* JSON 颜色主题 */
.key {
  color: #ff79c6;
}

.string {
  color: #8be9fd;
}

.number {
  color: #bd93f9;
}

.boolean {
  color: #50fa7b;
}

.null {
  color: #6272a4;
}
</style>
