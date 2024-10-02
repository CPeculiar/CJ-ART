import React, { useState } from "react";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../services/AuthContext";

 
const RegistrationForm = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    country: "",
    state: "",
    city: "",
    role: "user" // Default role
  });

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    //First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    //Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone validation (allowing for international numbers)
    const phoneRegex = /^\+?[0-9\s\-()]+$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    // State validation
    if (!formData.state) {
      newErrors.state = "State is required";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (!profilePicture) {
      newErrors.profilePicture = "Profile picture is required";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      setError((prevErrors) => ({ ...prevErrors, profilePicture: "" }));
    }
  };


  // const validateProfilePicture = (file) => {
  //   const maxSize = 5 * 1024 * 1024; // 5MB
  //   const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
  //   if (!allowedTypes.includes(file.type)) {
  //     return "Please select an image file (JPG, PNG, or GIF)";
  //   }
    
  //   if (file.size > maxSize) {
  //     return "File size must be less than 5MB";
  //   }
    
  //   return null;
  // };
  
  // Use this in your form's file input onChange handler
  // const handleProfilePictureChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const error = validateProfilePicture(file);
  //     if (error) {
  //       setError(prev => ({ ...prev, profilePicture: error }));
  //       setProfilePicture(null);
  //     } else {
  //       setError(prev => ({ ...prev, profilePicture: null }));
  //       setProfilePicture(file);
  //     }
  //   }
  // };

  const handleProfilePictureUpload = async (file) => {
    if (!file) return null;
    
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
  
      const fileExtension = file.name.split('.').pop();
      const fileName = `${user.uid}/${Date.now()}.${fileExtension}`; // Add timestamp to prevent conflicts
      const storageRef = ref(storage, `profilePictures/${fileName}`);
      
      console.log('Attempting to upload file:', fileName);
      
      const metadata = {
        contentType: file.type,
      };
  
      const uploadTask = uploadBytes(storageRef, file, metadata);
      
      const snapshot = await uploadTask;
      console.log('Upload successful:', snapshot);
      
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('File available at:', downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      if (error.code === 'storage/unauthorized') {
        throw new Error('User is not authorized to upload files. Please check Firebase Storage rules.');
      }
      throw error;
    }
  };

  
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setStates(State.getStatesOfCountry(country.value));
    setSelectedState(null);
    setFormData({ ...formData, country: country.label, state: "" });
    setError({ ...error, country: "", state: "" });
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setFormData({ ...formData, state: state.label });
    setError({ ...error, state: "" });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({});
    // if (!validateForm()) {
    //   return;
    // }
    setIsLoading(true);

    try {
      console.log("Starting user registration...");

      // Validate form before proceeding
    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   setError(validationErrors);
    //   return;
    // }
      
       // Create user with email and password
       const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      let profilePictureUrl = "";
      if (profilePicture) {
        try {
          profilePictureUrl = await handleProfilePictureUpload(profilePicture);
        } catch (uploadError) {
          console.error('Failed to upload profile picture:', uploadError);
          // Continue with registration even if picture upload fails
        }
      }


      // Prepare user data for Firestore
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        profilePictureUrl,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        address: {
          country: formData.country,
          state: formData.state,
          city: formData.city,
        },
        
        profilePictureStatus: profilePictureUrl === "pending" ? "failed" : "uploaded",
        role: formData.role, // Include the role in the user data
        createdAt: new Date().toISOString()
      };
      console.log("Storing user data in Firestore...");

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), userData);
      
      // Update the current user in the auth context
      // setCurrentUser(userCredential.user);
      setCurrentUser({
        ...userCredential.user,
        ...userData
      });

       // If profile picture upload failed, show a warning to the user
    if (profilePictureUrl === "pending") {
      alert("Your account was created successfully, but there was an issue uploading your profile picture. You can try uploading it again from your profile settings.");
    }

      console.log("Registration successful, redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during registration:", error);
      const errorMessage = error.code ? error.code : error.message;
      setError({ form: `Registration failed: ${errorMessage}` });
    } finally {
      setIsLoading(false);
    }
  };

  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const statesOptions = states.map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  return (

    <>
      
    
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="max-w-4xl w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">Registration Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-700">
                First Name
              </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="First Name"
                    required
                  />
                    {error.firstName && (
                      <span className="error text-red-500 text-sm">{error.firstName}</span>
                    )}
                  </div>

                  <div>
              <label htmlFor="lastName" className="block text-gray-700">
                Last Name
              </label>
                    <input
                      type="text"
                      className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Last Name"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                    {error.lastName && <span className="text-red-500 text-sm">{error.lastName}</span>}
                  </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-gray-700">
                Phone Number
              </label>
                    <input
                      type="tel"
                      className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Phone Number"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    {error.phone && <span className="text-red-500 text-sm">{error.phone}</span>}
                  </div>
                 
                  <div>
              <label htmlFor="email" className="block text-gray-700">
                Email Address
              </label>
                  <input
                    type="email"
                    className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                  {error.email && <span className="text-red-500 text-sm">{error.email}</span>}
                </div>
                </div>


                <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your Password"
                    required
                    style={{ paddingRight: '40px' }} // Add padding to prevent text overlap with the icon
                  />
                  <div className="input-group-append position-absolute end-0 top-50 translate-middle-y" style={{ zIndex: 10, paddingRight: '10px' }}>
                  <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                        onClick={togglePasswordVisibility}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          padding: 0,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={passwordVisible ? faEyeSlash : faEye}
                          style={{ color: '#6c757d' }}
                        />
                      </button>
                    </div>
                    </div>
                  {error.password && <span className="text-red-500 text-sm">{error.password}</span>}
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="gender" className="block text-gray-700">Gender</label>
                    <select
                      className="form-select w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      name="gender"
                      id="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select your Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {error.gender && <span className="text-red-500 text-sm">{error.gender}</span>}
                  </div>

                  <div>
                    <label htmlFor="dateOfBirth" className="form-label block text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                    {error.dateOfBirth && <span className="text-red-500 text-sm">{error.dateOfBirth}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                <label htmlFor="country" className="block text-gray-700 mb-2">Country</label>
                    <Select
                      id="country"
                      name="country"
                      options={countries}
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      placeholder="Select your Country"
                      isClearable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      required
                    />
                    {error.country && <span className="text-red-500 text-sm">{error.country}</span>}
                  </div>

                  <div>
                    <label htmlFor="state" className="form-label block text-gray-700 mb-2">State</label>
                    <Select
                      id="state"
                      name="state"
                      options={statesOptions}
                      value={selectedState}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      onChange={handleStateChange}
                      placeholder="Select your state"
                      isClearable
                      isDisabled={!selectedCountry}
                      required
                    />
                    {error.state && <span className="text-red-500 text-sm">{error.state}</span>}
                  </div>

                <div>
                    <label htmlFor="city" className="block text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your City"
                      required
                    />
                    {error.city && <span className="text-danger text-red-500 text-sm">{error.city}</span>}
                  </div>
                </div>
   

              
          <div>
                  <label htmlFor="profilePicture" className="form-label block text-gray-700">Profile Picture</label>
                  <input
                    type="file"
                    className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    name="profilePicture"
                    id="profilePicture"
                    onChange={handleProfilePictureChange}
                    accept="image/*"
                    required
                  />
                  {error.profilePicture && <span className="text-red-500 text-sm">{error.profilePicture}</span>}
                </div>

                <div className="text-center">

                  <button
                    type="submit"
                    className="w-full bg-yellow-500 text-white py-3 rounded-md font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:bg-yellow-600"
                    style={{ height: '3em', backgroundColor: isHovered ? '#cc8a00' : '#ffc107', 
                    color: isHovered ? "white" : "black", fontSize: "1.1em", fontWeight: "bolder", 
                    border: 'none', transition: 'background-color 0.3s', cursor: 'pointer'  }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                  {error.form && <span className="text-red-500 text-sm mt-2">{error.form}</span>}
                </div>
              </form>
            </div>
          </div>
      

    </>
  );
};

export default RegistrationForm;
