<script lang="ts">
  import Highlight from '../../../../components/Highlight.svelte';
  import AgGrid from '../../../../icons/AgGrid.svelte';
</script>

<h2>
  Using Sass <a
    href="https://www.ag-grid.com/javascript-data-grid/global-style-customisation-sass/"
    rel="noreferrer"
  >
    <AgGrid />
  </a>
</h2>

<p>
  If you're using SvelteKit, follow the <a
    href="https://kit.svelte.dev/docs/integrations"
    rel="noreferrer"
    target="_blank"
  >
    SvelteKit's section on Integrations
  </a>
  to setup SCSS for your project.
</p>

<p>
  Using the <code>grid-styles</code>
  mixin directly will not work due to scoped styles. The
  <code>:global()</code>
  modifier doesn't seem to help either. Instead, the
  <code>global</code>
  attribute or the
  <code>:global</code>
  rule from
  <a href="https://github.com/sveltejs/svelte-preprocess" rel="noreferrer" target="_blank">
    svelte-preprocess
  </a>
  can save the day:
</p>

<Highlight
  code={`${'<'}script>
  // No need to include these
  // import 'ag-grid-community/styles/ag-grid.css';
  // import 'ag-grid-community/styles/ag-theme-alpine.css';
</script>

${'<'}style lang="scss" global>
  @use 'ag-grid-community/styles' as ag;
  @include ag.grid-styles(
    (
      --ag-row-hover-color: chartreuse
    )
  );
</style>

<!-- or -->

${'<'}style lang="scss">
  @use 'ag-grid-community/styles' as ag;
  :global {
    @include ag.grid-styles(
      (
        --ag-row-hover-color: salmon
      )
    );
  }
</style>`}
  lang="html"
/>
