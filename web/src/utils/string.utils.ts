export function startCase(str: string): string {
    return str.replace(/_/g, ' ') // Replace underscores with spaces
            .toLowerCase() // Convert to lowercase
            .replace(/\b\w/g, match => match.toUpperCase()); // Capitalize first letter of each word
}