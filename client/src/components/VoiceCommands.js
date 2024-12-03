import React, { useEffect } from 'react';
import api from '../services/api';

function VoiceCommands({ addAddress, markAsDelivered }) {
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length -1][0].transcript.trim().toLowerCase();
      if (transcript.startsWith('add address')) {
        const address = transcript.replace('add address', '').trim();
        if (address) {
          addAddress({ address, status: 'not_delivered' });
          speak(`Added address: ${address}`);
        }
      } else if (transcript.startsWith('mark delivered')) {
        const index = parseInt(transcript.replace('mark delivered', '').trim(), 10) - 1;
        if (!isNaN(index)) {
          // Assuming addresses are 0-indexed
          markAsDelivered(index);
          speak(`Marked address number ${index + 1} as delivered`);
        }
      }
      // Add more voice commands as needed
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [addAddress, markAsDelivered]);

  const speak = (message) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(message);
    synth.speak(utter);
  };

  return null; // This component does not render anything
}

export default VoiceCommands;
