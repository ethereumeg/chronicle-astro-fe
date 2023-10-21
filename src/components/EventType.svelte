<script>
    export let type;

    const defs = {
        "conference": { color: "border-teal-500/50 text-teal-500" },
        "hackathon": { color: "border-red-500/50 text-red-500" },
        "collaborative-week": { color: "border-orange-500 text-orange-500", name: 'Collaborative week' }
    }
</script>

<div class="text-sm px-2.5 text-black rounded capitalize border {defs[type].color}">{defs[type].name || type}</div>