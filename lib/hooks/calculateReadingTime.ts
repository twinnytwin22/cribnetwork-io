export function calculateReadingTime(text: string, wordsPerMinute: number = 200): string {
    // Calculate the number of words in the text by splitting it using spaces
    const words = text.split(/\s+/).filter(Boolean);
    
    // Calculate the estimated reading time in minutes
    const readingTimeInMinutes = words.length / wordsPerMinute;
  
    // Format the reading time as "X minute(s)"
    const formattedReadingTime =
      readingTimeInMinutes < 1
        ? 'less than a minute'
        : `${Math.ceil(readingTimeInMinutes)} minute(s)`;
  
    return formattedReadingTime;
  }
  