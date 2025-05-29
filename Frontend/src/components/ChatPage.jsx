import { useState } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const getBotResponse = (userMessage) => {
    // Convert message to lowercase for easier matching
    const message = userMessage.toLowerCase();
    
    // Simple pattern matching for different types of user queries
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello there! How can I assist you today?";
    } 
    else if (message.includes('job') || message.includes('career') || message.includes('work')) {
      return "I can help you find job opportunities that match your skills and interests. Would you like to explore open positions?";
    } 
    else if (message.includes('student') || message.includes('study') || message.includes('course')) {
      return "We have resources for students including course materials, internship opportunities, and career guidance. What specific information are you looking for?";
    } 
    else if (message.includes('company') || message.includes('business') || message.includes('employer')) {
      return "I can provide information about partner companies, their profiles, and job openings. Is there a specific company you're interested in?";
    } 
    else if (message.includes('help') || message.includes('support') || message.includes('assistance')) {
      return "I'm here to help! Please let me know what you need assistance with - whether it's about jobs, companies, or your student profile.";
    } 
    else if (message.includes('thank')) {
      return "You're welcome! Feel free to reach out if you need anything else.";
    } 
    else {
      return "I'm not sure I understand what you're asking. Could you please provide more details or rephrase your question?";
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
    
    // Get appropriate bot response based on user input
    const botResponse = getBotResponse(inputValue);
    
    // Clear input field
    setInputValue('');
    
    // Add bot response after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: botResponse, 
        sender: 'bot' 
      }]);
    }, 800);
  };

  return (
    <div className="flex flex-col pl-64"> {/* Add left padding to account for sidebar */}
      <div className="bg-primary text-white p-4 shadow">
        <h1 className="text-xl font-semibold">Chat Support</h1>
      </div>
      
      <div className="flex-1 flex flex-col p-4 max-w-3xl mx-auto w-full">
        <div className="flex-1 mb-4 p-4 bg-gray-50 rounded-lg">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-md p-3 rounded-lg shadow ${message.sender === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-800 border border-gray-200'}`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4">
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSendMessage}
              className="bg-primary text-white px-6 py-3 rounded-r-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;