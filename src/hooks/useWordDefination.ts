import { useState, useEffect } from 'react';

interface Definition {
  partOfSpeech: string;
  definition: string;
  example?: string;
}

interface WordDefinition {
  word: string;
  definitions: Definition[];
  isLoading: boolean;
  error?: string;
}

export const useWordDefinition = (word: string): WordDefinition => {
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        setIsLoading(true);
        setError(undefined);
        
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch definition');
        }

        const data = await response.json();
        
        // Extract and format definitions
        const formattedDefinitions = data[0].meanings.flatMap((meaning: any) =>
          meaning.definitions.map((def: any) => ({
            partOfSpeech: meaning.partOfSpeech,
            definition: def.definition,
            example: def.example
          }))
        );

        setDefinitions(formattedDefinitions);
      } catch (err) {
        setError('Could not load definition');
        console.error('Error fetching definition:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (word) {
      fetchDefinition();
    }
  }, [word]);

  return {
    word,
    definitions,
    isLoading,
    error
  };
}; 