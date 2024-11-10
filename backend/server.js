const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/word-frequency', async (req, res) => {
    const { url, n } = req.body;

    try {
        // Launch Puppeteer and open a new page
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // Navigate to the specified URL
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        // Extract the text content from the fully rendered page
        const text = await page.evaluate(() => document.body.innerText);
        
        // Close the browser
        await browser.close();

        // Process the text to find word frequencies
        const wordCounts = text.toLowerCase().match(/\b\w+\b/g).reduce((counts, word) => {
            counts[word] = (counts[word] || 0) + 1;
            return counts;
        }, {});
        
        // Sort and retrieve the top n words
        const sortedWords = Object.entries(wordCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, n)
            .map(([word, count]) => ({ word, count }));
        
        res.json(sortedWords);
    } catch (error) {
        console.error('Error fetching or processing URL:', error);
        res.status(500).json({ error: 'Error fetching or processing URL' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
