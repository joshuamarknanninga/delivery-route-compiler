// src/components/VoiceCommands.js

import { useEffect } from 'react';
import PropTypes from 'prop-types';

function VoiceCommands({ addAddress, markAsDelivered, addresses }) {
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Browser does not support Speech Recognition');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      
      if (transcript.startsWith('add address')) {
        const address = transcript.replace('add address', '').trim();
        if (address) {
          addAddress({ address, status: 'not_delivered' });
          speak(`Added address: ${address}`);
        }
      } else if (transcript.startsWith('mark delivered')) {
        const indexStr = transcript.replace('mark delivered', '').trim();
        const index = parseInt(indexStr, 10) - 1;
        if (!isNaN(index) && index >= 0 && index < addresses.length) {
          markAsDelivered(addresses[index].id); // Assuming markAsDelivered accepts id
          speak(`Marked address number ${index + 1} as delivered`);
        } else {
          speak(`I didn't understand the address number to mark as delivered.`);
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
  }, [addAddress, markAsDelivered, addresses]);

  const speak = (message) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(message);
    synth.speak(utter);
  };

  return null; // This component does not render anything
}

VoiceCommands.propTypes = {
  addAddress: PropTypes.func.isRequired,
  markAsDelivered: PropTypes.func.isRequired,
  addresses: PropTypes.array.isRequired,
};

export default VoiceCommands;
