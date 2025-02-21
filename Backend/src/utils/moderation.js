function isComplaintClean(complaint) {
    const lowerCaseComplaint = complaint.toLowerCase(); // Normalize text
    return !inappropriateWords.some(word => lowerCaseComplaint.includes(word));  // true (if no bad words)
}

module.exports = {isComplaintClean};