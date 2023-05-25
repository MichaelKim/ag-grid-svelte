<script lang="ts" context="module">
  import hljs from 'highlight.js/lib/core';
  import css from 'highlight.js/lib/languages/css';
  import plaintext from 'highlight.js/lib/languages/plaintext';
  import typescript from 'highlight.js/lib/languages/typescript';
  import xml from 'highlight.js/lib/languages/xml';
  import 'highlight.js/styles/github.css';

  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('typescript', typescript);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('plaintext', plaintext);
  hljs.registerLanguage('svelte', (hljs) => ({
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT('<!--', '-->', { relevance: 10 }),
      {
        begin: /^(\s*)(<script(\s*context="module")?>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: 'typescript',
        excludeBegin: true,
        excludeEnd: true,
        contains: [
          {
            begin: /^(\s*)(\$:)/gm,
            end: /(\s*)/gm,
            className: 'keyword'
          }
        ]
      },
      {
        begin: /^(\s*)(<style.*>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: 'css',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /\{/gm,
        end: /\}/gm,
        subLanguage: 'typescript',
        contains: [
          {
            begin: /[{]/,
            end: /[}]/,
            skip: true
          },
          {
            begin: /([#:/@])(if|else|each|await|then|catch|debug|const|html)/gm,
            className: 'keyword',
            relevance: 10
          }
        ]
      }
    ]
  }));
</script>

<script lang="ts">
  export let code: string;
  export let lang = 'svelte';

  $: highlighted = hljs.highlight(code, { language: lang }).value;
</script>

<pre><code class="hljs">{@html highlighted}</code></pre>
