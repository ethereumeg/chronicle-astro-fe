<script>
    import EventList from '../components/EventList.svelte';
    import { isFuture } from 'date-fns';

    export let data;
    let q = '';

    const upcoming = data.events.filter(e => isFuture(new Date(e.date))).sort((x, y) => (new Date(x.date) > new Date(y.date) ? 1 : -1))
    const past = data.events.filter(e => !isFuture(new Date(e.date))).sort((x, y) => (new Date(x.date) < new Date(y.date) ? 1 : -1))

    $: results = q ? data.events.filter(e => e.name.match(new RegExp(q, 'i'))) : null
</script>

<div class="text-lg">
    <div>
        Search: <input type="text" class="border rounded py-0.5 px-1 w-80" bind:value={q} />
    </div>
</div>

{#if q}
    <h1 class="header1">Events results for "{q}":</h1>
    {#if results && results.length > 0}
        <EventList items={results} data={data} />
    {:else}
        <div>Nothing found.</div>
    {/if}

{:else}

    <h1 class="header1">Upcoming ({upcoming.length})</h1>
    <EventList items={upcoming} data={data} />

    <h1 class="header1">Past ({past.length})</h1>
    <EventList items={past} data={data} />
{/if}