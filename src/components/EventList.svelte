<script>
    import EventCard from "./EventCard.svelte";
    import { formatPeriod, normalizedName } from "../lib/helpers.js";
    export let data;
    export let items;
</script>

<div class="grid grid-cols-1 gap-2">
    {#each items as event}
        <div>
            <EventCard item={event} {data} />
        </div>
    {/each}
</div>

<style>
    table a { @apply underline; }
    table a:hover { @apply no-underline; }
</style>