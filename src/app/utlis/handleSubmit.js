// utils/handleSubmit.js
const handleSubmit = (e, isNewUser, email, password, onSignupComplete, router) => {
    e.preventDefault();
  
    if (isNewUser) {
      // Handle signup logic
      console.log('Signing up:', { email, password });
      // Simulate successful signup
      onSignupComplete();
    } else {
      // Handle login logic
      console.log('Logging in:', { email, password });
      // Simulate successful login
      router.push('/personal-info');
    }
  };
  
  export default handleSubmit;
  