// ISL Dictionary - Indian Sign Language mappings with real image URLs
export interface ISLSign {
    character: string;
    imageUrl: string;
    videoUrl?: string;
    description?: string;
    category: 'alphabet' | 'number' | 'word' | 'phrase';
}

// Gujarati to English character mapping
export const gujaratiToEnglish: Record<string, string> = {
    'અ': 'a', 'આ': 'aa', 'ઇ': 'i', 'ઈ': 'ii', 'ઉ': 'u', 'ઊ': 'uu',
    'ઋ': 'ru', 'એ': 'e', 'ઐ': 'ai', 'ઓ': 'o', 'ઔ': 'au',
    'ક': 'ka', 'ખ': 'kha', 'ગ': 'ga', 'ઘ': 'gha', 'ઙ': 'nga',
    'ચ': 'cha', 'છ': 'chha', 'જ': 'ja', 'ઝ': 'jha', 'ઞ': 'nya',
    'ટ': 'ta', 'ઠ': 'tha', 'ડ': 'da', 'ઢ': 'dha', 'ણ': 'na',
    'ત': 'ta', 'થ': 'tha', 'દ': 'da', 'ધ': 'dha', 'ન': 'na',
    'પ': 'pa', 'ફ': 'pha', 'બ': 'ba', 'ભ': 'bha', 'મ': 'ma',
    'ય': 'ya', 'ર': 'ra', 'લ': 'la', 'વ': 'va',
    'શ': 'sha', 'ષ': 'sha', 'સ': 'sa', 'હ': 'ha', 'ળ': 'la', 'ક્ષ': 'ksha', 'જ્ઞ': 'gya',
    '૦': '0', '૧': '1', '૨': '2', '૩': '3', '૪': '4',
    '૫': '5', '૬': '6', '૭': '7', '૮': '8', '૯': '9',
};

export const islAlphabetSigns: ISLSign[] = [
    { character: 'A', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/a.gif', category: 'alphabet', description: 'Letter A' },
    { character: 'B', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/b.gif', category: 'alphabet', description: 'Letter B' },
    { character: 'C', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/c.gif', category: 'alphabet', description: 'Letter C' },
    { character: 'D', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/d.gif', category: 'alphabet', description: 'Letter D' },
    { character: 'E', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/e.gif', category: 'alphabet', description: 'Letter E' },
    { character: 'F', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/f.gif', category: 'alphabet', description: 'Letter F' },
    { character: 'G', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/g.gif', category: 'alphabet', description: 'Letter G' },
    { character: 'H', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/h.gif', category: 'alphabet', description: 'Letter H' },
    { character: 'I', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/i.gif', category: 'alphabet', description: 'Letter I' },
    { character: 'J', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/j.gif', category: 'alphabet', description: 'Letter J' },
    { character: 'K', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/k.gif', category: 'alphabet', description: 'Letter K' },
    { character: 'L', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/l.gif', category: 'alphabet', description: 'Letter L' },
    { character: 'M', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/m.gif', category: 'alphabet', description: 'Letter M' },
    { character: 'N', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/n.gif', category: 'alphabet', description: 'Letter N' },
    { character: 'O', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/o.gif', category: 'alphabet', description: 'Letter O' },
    { character: 'P', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/p.gif', category: 'alphabet', description: 'Letter P' },
    { character: 'Q', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/q.gif', category: 'alphabet', description: 'Letter Q' },
    { character: 'R', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/r.gif', category: 'alphabet', description: 'Letter R' },
    { character: 'S', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/s.gif', category: 'alphabet', description: 'Letter S' },
    { character: 'T', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/t.gif', category: 'alphabet', description: 'Letter T' },
    { character: 'U', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/u.gif', category: 'alphabet', description: 'Letter U' },
    { character: 'V', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/v.gif', category: 'alphabet', description: 'Letter V' },
    { character: 'W', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/w.gif', category: 'alphabet', description: 'Letter W' },
    { character: 'X', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/x.gif', category: 'alphabet', description: 'Letter X' },
    { character: 'Y', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/y.gif', category: 'alphabet', description: 'Letter Y' },
    { character: 'Z', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/z.gif', category: 'alphabet', description: 'Letter Z' },
];

export const islNumberSigns: ISLSign[] = [
    { character: '0', imageUrl: 'https://raw.githubusercontent.com/ardamavi/Sign-Language-Digits-Dataset/master/Examples/example_0.JPG', category: 'number', description: 'Number 0' },
    { character: '1', imageUrl: 'https://raw.githubusercontent.com/ardamavi/Sign-Language-Digits-Dataset/master/Examples/example_1.JPG', category: 'number', description: 'Number 1' },
    { character: '2', imageUrl: 'https://raw.githubusercontent.com/ardamavi/Sign-Language-Digits-Dataset/master/Examples/example_2.JPG', category: 'number', description: 'Number 2' },
    { character: '3', imageUrl: 'https://raw.githubusercontent.com/ardamavi/Sign-Language-Digits-Dataset/master/Examples/example_3.JPG', category: 'number', description: 'Number 3' },
    { character: '4', imageUrl: 'https://raw.githubusercontent.com/ardamavi/Sign-Language-Digits-Dataset/master/Examples/example_4.JPG', category: 'number', description: 'Number 4' },
    { character: '5', imageUrl: 'https://raw.githubusercontent.com/ardamavi/Sign-Language-Digits-Dataset/master/Examples/example_5.JPG', category: 'number', description: 'Number 5' },
    { character: '6', imageUrl: 'https://raw.githubusercontent.com/ardamavi/Sign-Language-Digits-Dataset/master/Examples/example_6.JPG', category: 'number', description: 'Number 6' },
    { character: '7', imageUrl: 'https://raw.githubusercontent.com/ardamavi/Sign-Language-Digits-Dataset/master/Examples/example_7.JPG', category: 'number', description: 'Number 7' },
    { character: '8', imageUrl: 'https://raw.githubusercontent.com/ardamavi/Sign-Language-Digits-Dataset/master/Examples/example_8.JPG', category: 'number', description: 'Number 8' },
    { character: '9', imageUrl: 'https://raw.githubusercontent.com/ardamavi/Sign-Language-Digits-Dataset/master/Examples/example_9.JPG', category: 'number', description: 'Number 9' },
];

export const islCommonWords: ISLSign[] = [
    { character: 'hello', imageUrl: 'https://www.lifeprint.com/asl101/images-signs/hello.gif', category: 'word', description: 'Hello' },
    { character: 'thank you', imageUrl: 'https://www.lifeprint.com/asl101/images-signs/thankyou.gif', category: 'word', description: 'Thank you' },
    { character: 'please', imageUrl: 'https://www.lifeprint.com/asl101/images-signs/please.gif', category: 'word', description: 'Please' },
    { character: 'yes', imageUrl: 'https://www.lifeprint.com/asl101/images-signs/yes.gif', category: 'word', description: 'Yes' },
    { character: 'no', imageUrl: 'https://www.lifeprint.com/asl101/images-signs/no.gif', category: 'word', description: 'No' },
];

export const getISLSign = (char: string): ISLSign | null => {
    const upperChar = char.toUpperCase();
    const alphabetSign = islAlphabetSigns.find(sign => sign.character === upperChar);
    if (alphabetSign) return alphabetSign;
    const numberSign = islNumberSigns.find(sign => sign.character === char);
    if (numberSign) return numberSign;
    return null;
};

export const textToISL = (text: string): ISLSign[] => {
    const signs: ISLSign[] = [];
    for (const char of text.trim()) {
        if (char === ' ') {
            signs.push({ character: ' ', imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Ctext x="50%25" y="50%25" font-size="60" text-anchor="middle" dominant-baseline="middle"%3E␣%3C/text%3E%3C/svg%3E', category: 'alphabet', description: 'Space' });
            continue;
        }
        const sign = getISLSign(char);
        if (sign) signs.push(sign);
    }
    return signs;
};

export const gujaratiToISL = (gujaratiText: string): ISLSign[] => {
    let englishText = '';
    for (const char of gujaratiText) {
        if (gujaratiToEnglish[char]) englishText += gujaratiToEnglish[char];
        else if (char === ' ') englishText += ' ';
    }
    return textToISL(englishText);
};

// Simple dictionary for games - maps character to image URL
export const islDictionary: Record<string, string> = {};
[...islAlphabetSigns, ...islNumberSigns].forEach(sign => {
    islDictionary[sign.character] = sign.imageUrl;
});

