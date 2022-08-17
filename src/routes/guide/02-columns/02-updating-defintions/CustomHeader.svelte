<script lang="ts">
  import type { IHeaderParams } from 'ag-grid-community';
  import type { IOlympicData } from '../../types';

  export let params: IHeaderParams<IOlympicData>;

  let menuButtonRef: HTMLDivElement;

  $: ({ enableMenu, displayName, showColumnMenu } = params);
  $: console.log('CustomHeader rendered -> ' + params.displayName);
</script>

<div class="header">
  {#if enableMenu}
    <div
      bind:this={menuButtonRef}
      class="ag-icon ag-icon-menu"
      style:cursor="pointer"
      on:click={() => showColumnMenu(menuButtonRef)}
    />
  {/if}
  <h4 style:margin="0">{displayName}</h4>
</div>

<style>
  .header {
    display: flex;
    align-items: center;
    gap: 4px;
  }
</style>
