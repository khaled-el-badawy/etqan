/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import "./CraftsmanRegister.css";
import { FiEye, FiEyeOff, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 

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
  const dateInputRef = useRef(null); 
 const[isLoading, setIsLoading] = useState(false);
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [birthDate, setBirthDate] = useState(""); 
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

    // إغلاق القوائم عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (jobDropdownRef.current && !jobDropdownRef.current.contains(event.target)) setShowJobDropdown(false);
      if (maritalDropdownRef.current && !maritalDropdownRef.current.contains(event.target)) setShowMarital(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // حساب التاريخ الأقصى لضمان سن 18+ (سنة 2008 وما قبلها)
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0];
  

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

  const handleUsernameChange = (e)=>{
    const val = e.target.value;
    if(/^[a-zA-Z\u0600-\u06FF\s]*$/.test(val)){ setUsername(val); }
  };

  const handleEmailChange = (e)=>{
    const val = e.target.value.trim();
    setEmail(val);
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(val && !emailRegex.test(val)){ setEmailError("البريد الإلكتروني غير صالح"); }
    else{ setEmailError(""); }
  };

  const handleNationalIdChange=(e)=>{
    const val=e.target.value;
    if(/^\d*$/.test(val) && val.length<=14){ setNationalId(val); }
  };

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
  const passwordsNotMatch = confirmPassword.length > 0 && password !== confirmPassword;

  // إرجاع شروط رقم الهاتف الأصلية بدقة
  const isPhoneValid =
    phone.length === 11 &&
    phone[0] === "0" &&
    ["010", "011", "012", "015"].includes(phone.substring(0, 3));

  const isAgeValid = birthDate !== "" && birthDate <= maxDate;

  const isFormValid =
    username.trim()!=="" && email.trim()!=="" && emailError==="" &&
    isAgeValid && maritalStatus!=="" && nationalId.trim()!=="" &&
    nationalId.length===14 && selectedJob.trim()!=="" && isPhoneValid &&
    password!=="" && confirmPassword!=="" && password===confirmPassword;



    // 2. دالة الربط باستخدام Axios
  const handleRegister = async () => {
    setIsLoading(true);
    const registerData = {
      fullname: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      birthDate: parseInt(birthDate),
      maritalStatus: maritalList.indexOf(maritalStatus), 
      nationalId: nationalId,
      phoneNumber: phone,
      jobId: 1 
      
    };

    try {
      // إرسال الطلب للباك إند (تأكد من البورت 5036)
      const response = await axios.post("https://jeanette-unhumanistic-makayla.ngrok-free.dev/api/ClientAccount/register-step1-send-otp", registerData);

      if (response.status === 200) {
        // نجاح: ننتقل لصفحة الـ OTP ونمرر الإيميل في الـ state
        navigate("/login-otp/craftsman", { state: { email: email } });
      }
    } catch (error) {
      if (error.response) {
        // خطأ راجع من السيرفر (مثلاً ModelState Error)
        alert(error.response.data.message || "خطأ في البيانات المرسلة");
      } else {
        // خطأ في الاتصال (السيرفر طافي أو CORS)
        alert("فشل الاتصال بالسيرفر، تأكد من تشغيل الـ .NET وتفعيل الـ CORS");
      }
    }
    finally {
      setIsLoading(false);
    }
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

              
              <div className="field-container" style={{position: "relative"}}>
                <input 
                  type="text" 
                  placeholder="تاريخ الميلاد" 
                  value={birthDate}
                  readOnly 
                  onClick={() => dateInputRef.current.showPicker()}
                  style={{ paddingLeft: "45px", cursor: "pointer" }} 
                />
                <input 
                  ref={dateInputRef}
                  type="date"
                  max={maxDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={{
                    position: "absolute",
                    left: 0, 
                    opacity: 0,
                    width: "40px",
                    height: "100%",
                    cursor: "pointer",
                    zIndex: 2
                  }}
                />
                <FiCalendar 
                  onClick={() => dateInputRef.current.showPicker()}
                  style={{
                    position: "absolute",
                    left: "25px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#40798C",
                    fontSize: "26px",
                    cursor: "pointer",
                    zIndex: 1
                  }}
                />
                {birthDate && birthDate > maxDate && (
                  <p className="error-msg">يجب أن يكون العمر 18 سنة أو أكثر</p>
                )}
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
                <input
                  type="text"
                  placeholder="رقم الهاتف"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
                {(phone.length > 0 && phone.length < 11) ||
                phone[0] !== "0" ||
                (phone.length >= 3 &&
                  !["010", "011", "012", "015"].includes(phone.substring(0, 3))) ? (
                  <ul className="phone-errors">
                    {phone.length > 0 && phone.length < 11 && <li>رقم الهاتف يجب أن يكون 11 رقم</li>}
                    {phone.length >= 1 && phone[0] !== "0" && <li>رقم الهاتف يجب أن يبدأ بالرقم 0</li>}
                    {phone.length >= 3 &&
                      !["010", "011", "012", "015"].includes(phone.substring(0, 3)) && (
                        <li>رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015</li>
                      )}
                  </ul>
                ) : null}
              </div>

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
                  <p className="password-error-msg">يجب أن تكون كلمة السر مطابقة</p>
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
            <button type="button" className={`link-button ${!isFormValid ? "disabled" : ""}`} onClick={handleRegister} 
              disabled={!isFormValid || isLoading} style={{ pointerEvents: !isFormValid ? "none" : "auto", opacity: !isFormValid ? 0.5 : 1 }}>
             {isLoading ? "جاري إنشاء الحساب..." : "تسجيل"}
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