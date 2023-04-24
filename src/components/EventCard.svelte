<script>
    import CountryIco from "../components/CountryIco.svelte";
    import { formatPeriod, normalizedName } from "../lib/helpers.js";
    export let item;
    export let data;
</script>

<div class="px-3 py-2 border border-1 hover:bg-gray-50 hover:cursor-pointer" onclick="location.href='/{item.id}';">
    <div class="text-lg font-semibold"><a class="link" href="/{item.id}">{normalizedName(item)}</a></div>
    <div class="mt-1 flex flex-wrap gap-3">
        <div class="">{formatPeriod(item.date, item.days)}</div>
        <div class=""><CountryIco country={item.country} /> {item.place}, {item.country.toUpperCase()}</div>
        <div class="">👥 {@html item.attendees_real ? `${item.attendees_real} <span class="text-sm">(≈${item.attendees})</span>` : (item.attendees ? '≈'+item.attendees : '?')}</div>
    </div>
</div>
