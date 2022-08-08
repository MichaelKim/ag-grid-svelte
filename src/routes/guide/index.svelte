<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = () => {
    return { status: 302, redirect: '/guide/overview' };
  };
</script>
