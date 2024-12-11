require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// 初始化OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(cors({
    origin: 'http://127.0.0.1:5500', // 允许你的前端地址访问
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

// 聊天API端点
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            temperature: 0.7,
        });

        res.json(completion);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 