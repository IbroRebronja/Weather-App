export async function getCitySuggestions(query) {
    if (query.length > 1) {
        try {
            const response = await fetch(`https://api.teleport.org/api/cities/?search=${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch suggestions');
            }
            const data = await response.json();
            return data._embedded["city:search-results"]?.map(city => city.matching_full_name) || [];
        } catch (error) {
            console.error('Error fetching city suggestions:', error);
            return [];
        }
    }
    return [];
}
