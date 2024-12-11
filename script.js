// 主题切换
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
});

// 聊天功能
const chatToggle = document.querySelector('.chat-toggle');
const chatContainer = document.querySelector('.chat-container');
const closeChat = document.querySelector('.close-chat');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input');
const sendButton = document.querySelector('.send-message');

// OpenAI API配置
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const API_URL = 'http://localhost:3000/api/chat';

// 切换聊天窗口
chatToggle.addEventListener('click', () => {
    chatContainer.style.display = 'flex';
    chatToggle.style.display = 'none';
});

closeChat.addEventListener('click', () => {
    chatContainer.style.display = 'none';
    chatToggle.style.display = 'block';
});

// 发送消息函数
async function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // 添加用
        addMessage(message, 'user');
        chatInput.value = '';
        
        try {
            // 通过你的后端服务器调用API
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            
            // 添加AI响应
            if (data.choices && data.choices[0]) {
                addMessage(data.choices[0].message.content, 'ai');
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage('抱歉，我现在遇到了一些问题。请稍后再试。', 'ai');
        }
    }
}

// 添加息到聊天界面
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 发送消息事件监听
sendButton.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 自动调整输入框高度
chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = chatInput.scrollHeight + 'px';
});

// 添加平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
