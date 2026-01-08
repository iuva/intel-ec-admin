<template>
  <!-- JSON Viewer component - displays JSON data with syntax highlighting -->
  <div class="json-viewer">
    <!-- Display formatted JSON with HTML content -->
    <pre v-html="formatedJson"></pre>
  </div>
</template>

<script setup>
// JSON Viewer component - displays JSON data with syntax highlighting
import {computed, watch} from 'vue'

// Props:
//   json (String) - JSON string to be formatted and displayed
const props = defineProps({
  json: String
})

// Format JSON string with syntax highlighting
// Parameter: json - JSON string or object to format
// Returns: HTML string with syntax highlighting
function format(json) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, null, 2)
  }

  // Escape HTML characters to prevent XSS
  json = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

  // Apply syntax highlighting to different JSON elements
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

// Computed property that formats the JSON for display
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

/* JSON Color Theme */
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
