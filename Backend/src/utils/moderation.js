const inappropriateWords = [
    "abuse", "hate", "violence", "racist", "sexist", "drugs", "kill", "murder", "terror", "bomb", 
    "fraud", "scam", "corrupt", "illegal", "crime", "theft", "harrass", "assault", "rape", "porn",
    "nude", "explicit", "gambling", "hack", "phish", "spam", "profanity", "slur", "curse", "swear",
    "discriminate", "offensive", "insult", "degrade", "bully", "troll", "extort", "blackmail", "bribe",
    "exploit", "trafficking", "molest", "prostitution", "kidnap", "abduction", "genocide", "hatecrime",
    "misogyny", "bigot", "homophobic", "xenophobia"
];

const isComplaintClean = (complaint) => {
    const lowerCaseComplaint = complaint.toLowerCase(); // Normalize text
    return !inappropriateWords.some(word => lowerCaseComplaint.includes(word));  // true (if no bad words)
}

module.exports = { isComplaintClean };