import React, { useState, useRef, useEffect } from "react";
import "./CraftsmanRegister.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CraftsmanRegister() {

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

  const [commercialFile,setCommercialFile] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  
  // قفل القائمة لما نضغط بره
 useEffect(() => {
  const handleClickOutside = (event) => {

    if (
      jobDropdownRef.current &&
      !jobDropdownRef.current.contains(event.target)
    ) {
      setShowJobDropdown(false);
    }

    if (
      maritalDropdownRef.current &&
      !maritalDropdownRef.current.contains(event.target)
    ) {
      setShowMarital(false);
    }

  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
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
// رقم الهاتف
  const handlePhoneChange=(e)=>{
    const val=e.target.value;
    if(!/^\d*$/.test(val)) return;
    if(val.length>11) return;
    setPhone(val);
  };

<<<<<<< HEAD
  const rules={
    firstCapital:/^[A-Z]/,
    specialChar:/[!@#$%^&*()/\\]/,
    minLength:/.{8,}/,
  };

  const checkRule=(rule)=>rule.test(password);

  const passwordsNotMatch =
    confirmPassword.length > 0 && password !== confirmPassword;

   // التحقق من رقم الهاتف كامل الشروط
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
    // commercialFile!==null &&
    password!=="" &&
    confirmPassword!=="" &&
    password===confirmPassword;

=======
  

const isFormValid =
  username.trim() !== "" &&
  email.trim() !== "" &&
  emailError === "" &&
  age !== "" &&
  age >= 18 &&
  maritalStatus !== "" &&
  nationalId.trim() !== "" &&
  nationalId.length === 14 &&
  selectedJob.trim() !== "" &&
  password !== "" &&
  confirmPassword !== "" &&
  password === confirmPassword;

  const passwordsNotMatch =
    confirmPassword.length > 0 && password !== confirmPassword;
   const [age, setAge] = useState("");
const [maritalStatus, setMaritalStatus] = useState("");
>>>>>>> 5b2035b123794d80ec46b350fd1cb90d42b428da
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
                 {/* اسم المستخدم */}
              <div className="field-container">
                <input
                  type="text"
                  placeholder="اسم المستخدم"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
                       {/* البريد الالكتروني */}
              <div className="field-container">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && <p className="error-msg">{emailError}</p>}
              </div>
<<<<<<< HEAD
                  {/* العمر */}
              <div className="field-container">
                <input
                  type="number"
                  placeholder="العمر"
                  value={age}
                  onChange={(e)=>setAge(e.target.value)}
                  min="18"
                />
                {age && age<18 && (
                  <p className="error-msg">يجب ألا يقل العمر عن 18 سنة</p>
                )}
              </div>
                  {/* الحالة الاجتماعية */}
              <div className="field-container marital-dropdown" ref={maritalDropdownRef}>
                <input
                  type="text"
                  placeholder="الحالة الاجتماعية"
                  value={maritalStatus}
                  readOnly
                  onClick={()=>setShowMarital(!showMarital)}
                />

                {showMarital && (
                  <ul className="dropdown-list">
                    {maritalList.map((item,index)=>(
                      <li
                        key={index}
                        onClick={()=>{
                          setMaritalStatus(item);
                          setShowMarital(false);
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
                   {/* الرقم القومي */}
=======
       {/* العمر */}
<div className="field-container">
  <input
    type="number"
    placeholder="العمر"
    value={age}
    onChange={(e) => setAge(e.target.value)}
    min="18"
    required
  />
  {age && age < 18 && (
    <p className="error-msg">يجب ألا يقل العمر عن 18 سنة</p>
  )}
</div>

{/* الحالة الاجتماعية */}
<div className="field-container">
  <select
    value={maritalStatus}
    onChange={(e) => setMaritalStatus(e.target.value)}
    required
  >
    <option value=""  >
      الحالة الاجتماعية
    </option>
    <option value="اعزب">أعزب</option>
    <option value="متزوج">متزوج</option>
    <option value="مطلق">مطلق</option>
    <option value="ارمل">أرمل</option>
  </select>
</div>
>>>>>>> 5b2035b123794d80ec46b350fd1cb90d42b428da
              <div className="field-container">
                <input
                  type="text"
                  placeholder="الرقم القومي"
                  value={nationalId}
                  onChange={handleNationalIdChange}
                />

                {nationalId.length>0 && nationalId.length<14 && (
                  <p className="error-msg">
                    الرقم القومي يجب أن يكون 14 رقم
                  </p>
                )}
              </div>
                     {/* المهنة */}
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
                        <li
                          key={index}
                          onClick={()=>{
                            setSelectedJob(j);
                            setJobSearchTerm("");
                            setShowJobDropdown(false);
                          }}
                        >
                          {j}
                        </li>
                      ))
                    ) : (
                      <li className="no-result">لا توجد نتائج</li>
                    )}
                  </ul>
                )}

              </div>

              {/* رقم الهاتف */}
              <div className="field-container phone-field">
                <input
                  type="text"
                  placeholder="رقم الهاتف"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />

                {/* رسائل الخطأ للهاتف */}
                {(phone.length > 0 && phone.length < 11) ||
                phone[0] !== "0" ||
                (phone.length >= 3 &&
                  !["010", "011", "012", "015"].includes(phone.substring(0, 3))) ? (
                  <ul className="phone-errors">
                    {phone.length > 0 && phone.length < 11 && (
                      <li>رقم الهاتف يجب أن يكون 11 رقم</li>
                    )}
                    {phone.length >= 1 && phone[0] !== "0" && (
                      <li>رقم الهاتف يجب أن يبدأ بالرقم 0</li>
                    )}
                    {phone.length >= 3 &&
                      !["010", "011", "012", "015"].includes(
                        phone.substring(0, 3)
                      ) && (
                        <li>رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015</li>
                      )}
                  </ul>
                ) : null}
              </div>

              <div
                className="field-container password-field-container"
                style={{position:"relative"}}
              >
                    {/* كلمة السر */}
                <input
                  type={showPassword?"text":"password"}
                  placeholder="كلمة السر"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  onFocus={()=>setIsFocused(true)}
                  onBlur={()=>setIsFocused(false)}
                />

                <span
                  className="eye"
                  onClick={()=>setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEye/> : <FiEyeOff/>}
                </span>

                {isFocused && (
                  <div
                    className="password-rules"
                    style={{
                      position:"absolute",
                      top:"100%",
                      left:0,
                      width:"100%"
                    }}
                  >

                    <ul>

                      <li style={{
                        color:checkRule(rules.firstCapital)
                        ?"rgb(114,114,243)"
                        :"rgb(235,138,138)"
                      }}>
                        يجب ان يكون أول حرف Capital
                      </li>

                      <li style={{
                        color:checkRule(rules.specialChar)
                        ?"rgb(114,114,243)"
                        :"rgb(235,138,138)"
                      }}>
                        يجب أن يحتوي على !@#$%
                      </li>

                      <li style={{
                        color:checkRule(rules.minLength)
                        ?"rgb(114,114,243)"
                        :"rgb(235,138,138)"
                      }}>
                        يجب ان يكون على الأقل 8 أحرف
                      </li>

                    </ul>
                   
                  </div>
                )}

              </div>

              {/* تأكيد كلمة السر */}

              <div className="field-container confirm-password-field-container">

                <input
                  type={showConfirmPassword?"text":"password"}
                  placeholder="تأكيد كلمة السر"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                />

                <span
                  className="eye"
                  onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEye/> : <FiEyeOff/>}
                </span>

                {passwordsNotMatch && (
                  <p className="password-error-msg">
                    يجب أن تكون كلمة السر مطابقة
                  </p>
                )}

              </div>

            </div>

            {/* زرار تسجيل */}
            <Link
<<<<<<< HEAD
              to={isFormValid ? "/CompanyOTP" : "#"}
=======
              to={isFormValid ? "/Verify-otp" : "#"}
>>>>>>> 5b2035b123794d80ec46b350fd1cb90d42b428da
              className={`link-button ${!isFormValid ? "disabled" : ""}`}
              style={{
                pointerEvents: !isFormValid ? "none" : "auto",
                opacity: !isFormValid ? 0.5 : 1,
              }}
            >
              تسجيل
            </Link>

         <h4 className="h4-craftsman-login">
          هل لديك حساب ؟ <Link to="/Login" className="Link">تسجيل الدخول</Link>
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