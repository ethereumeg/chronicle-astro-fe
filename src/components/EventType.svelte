<script>
    export let type;

    const defs = {
        "conference": { color: "bg-teal-500" },
        "hackathon": { color: "bg-blue-500" },
        "collaborative-week": { color: "bg-orange-500", name: 'Collaborative week' }
    }
</script>

<div class="text-xs px-1.5 py-0.5 text-white rounded uppercase {defs[type].color}">{defs[type].name || type}</div>