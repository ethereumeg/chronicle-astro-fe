<script>
    import { formatPeriod, normalizedName } from "../lib/helpers.js";
    export let data;
</script>

{#each data.events as event}
    <div><a class="link" href="/{event.id}">{normalizedName(event)}</a></div>
{/each}