import { format, addDays } from 'date-fns';

export function formatPeriod(date, days) {
    const start = new Date(date)
    if (days === 1) {
        return format(start, 'MMMM d, yyyy')
    }

    const end = addDays(start, days-1)
    if (format(start, 'MM') === format(end, 'MM')) {
        return format(start, 'MMMM d-') + format(end, 'd, yyyy')
    }
    return format(start, 'MMMM d-') + format(end, 'MMMM d, yyyy')
}

export function normalizedName(item) {
    const year = format(new Date(item.date), 'yyyy')
    if (item.name.match(new RegExp(`${year}$`))) {
        return item.name
    }
    return `${item.name} (${year})`
}