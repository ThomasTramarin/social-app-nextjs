export function dateFormat(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const userTimezoneOffset = now.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localDate = new Date(date.getTime() - userTimezoneOffset);
    const diff = now.getTime() - localDate.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (dateString === "now") {
      return "now";
    }
    if (seconds < 60) {
      return "now";
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return "yesterday";
    } else if (days <= 7) {
      return `${days}d ago`;
    } else {
      return localDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
  }