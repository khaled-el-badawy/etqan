/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import "./CraftsmanRegister.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function CraftsmanRegister() {
  const navigate = useNavigate();
  const jobsList = [
    "حداد","نجارة","فني تكييفات","سباكة","كهرباء","سيراميك","فني كاميرات",
    "عامل بناء","نقاش","فني غاز","سواق نقل","تكسير وإزالة","الومنتال",
    "منجد","أمن وأنظمة ذكية","محارة","تنظيف","استشارات هندسية",
    "رش مبيدات","صيانة اجهزة كهربائية","فني تركيب دش",
  ];

  const maritalList = ["أعزب", "متزوج", "مطلق", "أرمل"];
  const jobDropdownRef = useRef(null);
  const maritalDropdownRef = useRef(null);
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [age,setAge] = useState("");
  const [maritalStatus,setMaritalStatus] = useState("");
  const [nationalId,setNationalId] = useState("");
  const [phone,setPhone] = useState("");
  const [selectedJob,setSelectedJob] = useState("");
  const [jobSearchTerm,setJobSearchTerm] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [emailError,setEmailError] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const [showJobDropdown,setShowJobDropdown] = useState(false);
  const [showMarital,setShowMarital] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // قفل القوايم
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (jobDropdownRef.current && !jobDropdownRef.current.contains(event.target)) {
        setShowJobDropdown(false);
      }
      if (maritalDropdownRef.current && !maritalDropdownRef.current.contains(event.target)) {
        setShowMarital(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredJobs = jobsList.filter((j) => j.includes(jobSearchTerm));

  // اسم المستخدم
  const handleUsernameChange = (e)=>{
    const val = e.target.value;
    if(/^[a-zA-Z\u0600-\u06FF\s]*$/.test(val)){
      setUsername(val);
    }
  };

  // البريد الإلكتروني
  const handleEmailChange = (e)=>{
    const val = e.target.value.trim();
    setEmail(val);

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(val && !emailRegex.test(val)){
      setEmailError("البريد الإلكتروني غير صالح");
    }else{
      setEmailError("");
    }
  };

  // الرقم القومي
  const handleNationalIdChange=(e)=>{
    const val=e.target.value;
    if(/^\d*$/.test(val) && val.length<=14){
      setNationalId(val);
    }
  };

  // الهاتف
  const handlePhoneChange=(e)=>{
    const val=e.target.value;
    if(!/^\d*$/.test(val)) return;
    if(val.length>11) return;
    setPhone(val);
  };

  const rules={
    firstCapital:/^[A-Z]/,
    specialChar:/[!@#$%^&*()/\\]/,
    minLength:/.{8,}/,
  };

  const checkRule=(rule)=>rule.test(password);

  const passwordsNotMatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const isPhoneValid =
    phone.length === 11 &&
    phone[0] === "0" &&
    ["010", "011", "012", "015"].includes(phone.substring(0, 3));

  const isFormValid =
    username.trim()!=="" &&
    email.trim()!=="" &&
    emailError==="" &&
    age!=="" &&
    Number(age)>=18 &&
    maritalStatus!=="" &&
    nationalId.trim()!=="" &&
    nationalId.length===14 &&
    selectedJob.trim()!=="" &&
    isPhoneValid &&
    password!=="" &&
    confirmPassword!=="" &&
    password===confirmPassword;

  // التسجيل
  const handleRegister = () => {
    const data = {
      username,
      email,
      age,
      maritalStatus,
      nationalId,
      phone,
      job: selectedJob,
      password,
      confirmPassword,
    };

    console.log("DATA TO BACK:", data);

    
    navigate("/login-otp/craftsman");
  };

  return (
    <div className="craftsman-page-container">

      <motion.div
        className="form-section"
        initial={{y:60,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:1,ease:"easeOut",delay:0.4}}
      >

        <div className="form-fields">

          <form>

            <h1>مرحباً بك</h1>
            <h3>قم بإنشاء حسابك لبدء استخدام الخدمة</h3>

            <div className="fields-row">

              <div className="field-container">
                <input type="text" placeholder="اسم المستخدم" value={username} onChange={handleUsernameChange}/>
              </div>

              <div className="field-container">
                <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={handleEmailChange}/>
                {emailError && <p className="error-msg">{emailError}</p>}
              </div>

              <div className="field-container">
                <input type="number" placeholder="العمر" value={age} onChange={(e)=>setAge(e.target.value)} min="18"/>
                {age && age<18 && <p className="error-msg">يجب ألا يقل العمر عن 18 سنة</p>}
              </div>

              <div className="field-container marital-dropdown" ref={maritalDropdownRef}>
                <input type="text" placeholder="الحالة الاجتماعية" value={maritalStatus} readOnly onClick={()=>setShowMarital(!showMarital)}/>
                {showMarital && (
                  <ul className="dropdown-list">
                    {maritalList.map((item,index)=>(
                      <li key={index} onClick={()=>{setMaritalStatus(item); setShowMarital(false);}}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="field-container">
                <input type="text" placeholder="الرقم القومي" value={nationalId} onChange={handleNationalIdChange}/>
                {nationalId.length>0 && nationalId.length<14 && (
                  <p className="error-msg">الرقم القومي يجب أن يكون 14 رقم</p>
                )}
              </div>

              <div className="field-container" ref={jobDropdownRef}>
                <input
                  type="text"
                  placeholder="المهنة"
                  value={selectedJob || jobSearchTerm}
                  onChange={(e)=>{
                    setJobSearchTerm(e.target.value);
                    setSelectedJob("");
                    setShowJobDropdown(true);
                  }}
                  onFocus={()=>setShowJobDropdown(true)}
                />

                {showJobDropdown && jobSearchTerm && (
                  <ul className="dropdown-list">
                    {filteredJobs.length>0 ? (
                      filteredJobs.map((j,index)=>(
                        <li key={index} onClick={()=>{
                          setSelectedJob(j);
                          setJobSearchTerm("");
                          setShowJobDropdown(false);
                        }}>
                          {j}
                        </li>
                      ))
                    ) : (
                      <li className="no-result">لا توجد نتائج</li>
                    )}
                  </ul>
                )}
              </div>

              <div className="field-container phone-field">
                <input type="text" placeholder="رقم الهاتف" value={phone} onChange={handlePhoneChange}/>
              </div>

              {/* password */}
              <div className="field-container password-field-container" style={{position:"relative"}}>
                <input
                  type={showPassword?"text":"password"}
                  name="password"
                  placeholder="كلمة السر"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  onFocus={()=>setIsFocused(true)}
                  onBlur={()=>setIsFocused(false)}
                />

                <span className="eye" onClick={()=>setShowPassword(!showPassword)}>
                  {showPassword ? <FiEye/> : <FiEyeOff/>}
                </span>

                {isFocused && (
                  <div className="password-rules" style={{position:"absolute",top:"100%",left:0,width:"100%"}}>
                    <ul>
                      <li style={{color:checkRule(rules.firstCapital)?"rgb(114,114,243)":"rgb(235,138,138)"}}>
                        يجب ان يكون أول حرف Capital
                      </li>
                      <li style={{color:checkRule(rules.specialChar)?"rgb(114,114,243)":"rgb(235,138,138)"}}>
                        يجب أن يحتوي على !@#$%
                      </li>
                      <li style={{color:checkRule(rules.minLength)?"rgb(114,114,243)":"rgb(235,138,138)"}}>
                        يجب ان يكون على الأقل 8 أحرف
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* confirm */}
              <div className="field-container confirm-password-field-container">
                <input
                  type={showConfirmPassword?"text":"password"}
                  name="confirmPassword"
                  placeholder="تأكيد كلمة السر"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                />

                <span className="eye" onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FiEye/> : <FiEyeOff/>}
                </span>

                {passwordsNotMatch && (
                  <p className="password-error-msg">
                    يجب أن تكون كلمة السر مطابقة
                  </p>
                )}
              </div>

            </div>

            <button
              type="button"
              className={`link-button ${!isFormValid ? "disabled" : ""}`}
              onClick={handleRegister}
              disabled={!isFormValid}
              style={{
                pointerEvents: !isFormValid ? "none" : "auto",
                opacity: !isFormValid ? 0.5 : 1,
              }}
            >
              تسجيل
            </button>

            <h4 className="h4-craftsman-login">
              هل لديك حساب ؟ <Link to="/login/craftsman" className="Link">تسجيل الدخول</Link>
            </h4>

          </form>

        </div>

        <div className="image">
          <motion.img
            src="/images/Frame 18.svg"
            initial={{x:"20%",y:0,opacity:0}}
            animate={{x:0,y:[0,-10,0],opacity:1}}
            transition={{
              x:{duration:1.8,ease:"easeOut"},
              y:{duration:3,ease:"easeInOut",repeat:Infinity},
              opacity:{duration:1.8,ease:"easeOut"},
            }}
          />
        </div>

      </motion.div>

    </div>
  );
}

export default CraftsmanRegister;