'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Stack, TextField, Button, Typography } from '@mui/material';

// Hardcoded responses for the chatbot
const hardcodedResponses = {
  hello: "Hi there! How can I help you today?",
  hi: "Hi there! How can I help you today?",
  help: "Sure, I'm here to assist you. What do you need help with?",
  bye: "Goodbye! Have a great day!",
  thanks: "You're welcome! Is there anything else I can help you with?",
  weather: "I'm not connected to a weather service, but I hope it's nice outside!",
  joke: "Why don't scientists trust atoms? Because they make up everything!",
  time: "I'm not connected to a clock, but you can check your device for the current time.",
  name: "I'm Aria, your personal assistant. How can I assist you today?",
  age: "I'm as old as the latest update. Time flies in the digital world!",
  favoritecolor: "I love all colors equally, but I'm particularly fond of blue!",
  hobby: "My hobby is helping people like you! What are your hobbies?",
  music: "I enjoy all kinds of music, but I can't play any tunes for you. What's your favorite?",
  food: "I don't eat, but I've heard pizza is a popular choice!",
  movie: "I'm a big fan of sci-fi movies. What's your favorite genre?",
  book: "I love to read about technology and science. What do you like to read?",
  sport: "I'm not much of a player, but I enjoy watching all sports!",
  default: "I'm sorry, I don't understand. Can you please rephrase?"
};

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Function to send a message and get a response
  const sendMessage = () => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);

    // Add the user's message to the state
    setMessages(prevMessages => [
      ...prevMessages,
      { role: 'user', content: input }
    ]);

    // Simulate a delay for the bot response
    setTimeout(() => {
      const response = hardcodedResponses[input.toLowerCase()] || hardcodedResponses.default;
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: response }
      ]);
      setIsLoading(false);
      setInput('');
    }, 1000);
  };

  // Handle Enter key press for message submission
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  // Scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Hi, I am Aira, your personal assistant on this website to guide you.
      </Typography>
      <Typography variant="body1" paragraph>
        How can I assist you today? Type your query below and I'll do my best to help!
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Your Query"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={sendMessage} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Submit'}
        </Button>
        <Box>
          {messages.map((msg, index) => (
            <Typography key={index} variant="body1" color={msg.role === 'user' ? 'primary' : 'textSecondary'}>
              {msg.content}
            </Typography>
          ))}
          <div ref={messagesEndRef} />
        </Box>
      </Stack>
    </Box>
  );
};

export default Chatbot;
