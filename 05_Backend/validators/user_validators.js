
const validateInputs = (userData) => {
    const { username, email, password } = userData;
  
    // Validate username
    if (!username || typeof username !== 'string' || username.length < 3) {
      return 'Username must be a string with at least 3 characters.';
    }
  
    // Validate email
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return 'Please provide a valid email address.';
      }
    }
    // Validate password
    if (!password || typeof password !== 'string' || password.length < 6) {
      return 'Password must be a string with at least 6 characters.';
    }
    
    return null;
  };
  
  module.exports = { validateInputs };
  