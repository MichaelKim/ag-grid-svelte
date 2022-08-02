<script lang="ts">
  import AddRemove from '../../examples/updating-definitions/add-remove.svelte';
  import ChangingState from '../../examples/updating-definitions/changing-state.svelte';
  import MaintainOrder from '../../examples/updating-definitions/maintain-order.svelte';
  import MatchingCols from '../../examples/updating-definitions/matching-cols.svelte';
  import RefreshHeaders from '../../examples/updating-definitions/refresh-headers.svelte';
  import UpdatingDefs from '../../examples/updating-definitions/updating-defs.svelte';
  import UpdatingState from '../../examples/updating-definitions/updating-state.svelte';
  import Layout from '../../Layout.svelte';
</script>

<Layout title="Updating Definitions">
  <AddRemove />
  <UpdatingDefs />
  <ChangingState />
  <UpdatingState />
  <MatchingCols />
  <MaintainOrder />
  <RefreshHeaders />
</Layout>
