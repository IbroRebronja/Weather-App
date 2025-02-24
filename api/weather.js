export default async function handler(req, res) {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
