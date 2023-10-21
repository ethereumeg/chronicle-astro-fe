<script>
    import { format } from 'date-fns';
    import { formatPeriod, normalizedName } from "../lib/helpers.js";
    import EventType from "../components/EventType.svelte";
    import CountryIco from "../components/CountryIco.svelte";

    export let item;
    export let data;
    
    const contributorsTypes = [
        { name: 'Speakers', role: 'speaker' },
        { name: 'Mentors', role: 'mentor' },
        { name: 'Judge', role: 'judge' },
        { name: 'Team', role: 'team' },
    ]
    const serie = item.series ? data.series.find(s => s.id === item.series) : null
</script>

<div class="bg-gradient-to-br from-white to-gray-300">
    <div class="py-10 text-center">
        <div class="text-3xl font-semibold">{normalizedName(item)}</div>
        <div class="text-lg mt-2">
            {formatPeriod(item.date, item.days)} ({item.days} days)
            <div class="text-lg inline-block ml-2">👥 {@html item.attendees_real ? `${item.attendees_real} <span class="text-sm">(≈${item.attendees})</span>` : (item.attendees ? '≈'+item.attendees : '?')}</div>
        </div>
        <div class="text-lg mt-2"><CountryIco country={item.country} /> {item.place} [{item.region}]</div>
        <div class="inline-block mt-3">
            <div class="flex gap-2">
                {#each item.types as type}
                    <EventType {type} />
                {/each}
            </div>
        </div>
    </div>
</div>

<div class="event-detail">

    <div class="flex flex-wrap mt-2 gap-4 items-center">
    </div>
    <div class="flex flex-wrap gap-2 mt-3">
        {#if serie}
            <div>Series: <a class="link" href="/s/{item.series}">{serie.name}</a></div>
        {/if}
        {#if item.host_name}
            <div>Host: {item.host_name}</div>
        {/if}
    </div>

    {#if item.hackathon}
        <h2 class="header2">Hackathon</h2>
        <div class="p-3 border border-blue-100">
            <div class="flex flex-wrap gap-2 text-center">
                <div class="card hackathon"><span class="card-head">{item.hackathon.projects || '?'}</span><br />projects</div>
                <div class="card hackathon"><span class="card-head">{@html item.hackathon.hackers_real ? `${item.hackathon.hackers_real}<span class="text-sm font-normal"> (≈${item.hackathon.hackers})</span>` : ( item.hackathon.hackers ? '≈'+item.hackathon.hackers : '?')}</span><br />hackers</div>
                <div class="card hackathon"><span class="card-head">{item.hackathon.prizes_total || '?'}</span><br/> in prizes 🏆</div>
                {#if item.hackathon.bounties_total}
                    <div class="card hackathon"><span class="card-head">{item.hackathon.bounties_total}</span><br/> in sponsor bounties</div>
                {/if}
            </div>
            {#if item.hackathon.prizes}
                <h3 class="header3">Prizes 🏆</h3>
                <table>
                    {#each item.hackathon.prizes as prize}
                        <tr><td>{prize.name}</td><td class="pl-4">{prize.amount}</td></tr>
                    {/each}
                </table>
            {/if}
        </div>
    {/if}

    {#if item.contributors}
        <h2 class="header2">Contributors</h2>
        {#each contributorsTypes as ct}
            <h3 class="header3">{ct.name} ({item.contributors.filter(c => c.roles.includes(ct.role)).length})</h3>
            <div class="flex flex-wrap gap-3 mt-3">
                {#each item.contributors.filter(c => c.roles.includes(ct.role)) as person}
                    <div class="w-26 text-center">
                        <img src={person.image} class="w-24 aspect-square object-cover mx-auto rounded" />
                        <div class="my-2 text-sm w-24">{person.name}</div>
                    </div>
                {/each}
            </div>
        {/each}
    {/if}

    {#if item.aftermovie}
        <h2 class="header2">Aftermovie</h2>
        <iframe width="560" height="315" src={item.aftermovie.replace("/watch?v=", '/embed/')} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    {/if}

    <!--pre class="mt-64 p-4 bg-gray-200 mt-4"><code class="whitespace-pre-wrap">{JSON.stringify(item, null, 2)}</code></pre-->
</div>

<style>
    .card {
        @apply p-2.5 text-sm;
    }
    .card.hackathon {
        @apply bg-blue-100;
    }
    .card-head {
        @apply text-lg font-semibold;
    }
</style>