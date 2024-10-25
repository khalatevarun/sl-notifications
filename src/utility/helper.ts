// helper function to format date exactly as mentioned in the instructionsexport
export function formatTimestamp(timestamp:number) {
    const date = new Date(timestamp);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[date.getMonth()];

    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const period = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;

    return `${day} ${monthName} ${year}, ${hours}:${minutes}${period}`;
  }