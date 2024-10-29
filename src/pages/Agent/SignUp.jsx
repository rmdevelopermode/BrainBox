/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useFormik } from "formik";
import { AgentSignUpValidationSchema } from "../../utils/Fromik_Validation/AuthValidationSchema";
import { useEffect, useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import useAuthContexts from "../../context/AuthContext";



const AgentSignUp = () => {
  const { pathname } = useLocation();
  const lastPath = location.pathname.split("/").pop();
  const { authuser, setAuthUser } = useAuthContexts()
  const [registretbox, setopenregistretbox] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const user_token = import.meta.env.VITE_AGENT_TOKEN;



  const [error, seterror] = useState("");

  const onSubmit = async (values, action) => {
    try {
      let formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('nic', values.nic);
      formData.append('mobile', values.mobile);
      formData.append('password', values.password);
      formData.append('password_confirmation', values.password_confirmation);
      formData.append('promoCode', values.promoCode ? values.promoCode : ''); // Handle optional promoCode
      formData.append('terms', values.terms);

      const res = await fetch(
        `${apiUrl}auth/agent/registration`,

        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      seterror("");

      if (data.error) {
        seterror(data.error);
      }

      if (data.success) {
        setopenregistretbox(true)

        Cookies.set(user_token, data.token, {
          expires: 15, // Set the expiration in days
        });

        setAuthUser(data);
        // window.location = 'http://localhost:5173/student/dashboard/profile';

        // action.resetForm();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      nic: "",
      mobile: "",
      password: "",
      password_confirmation: "",
      promoCode: "",
      terms: "",
    },
    validationSchema: AgentSignUpValidationSchema,
    onSubmit,
  });


  const [grades, setgrades] = useState([''])
  const [gender, setgender] = useState([''])
  useEffect(() => {
    const getGrades = async () => {
      const res = await fetch(
        `${apiUrl}grade`,
        {
          method: "GET",


        }
      );
      const data = await res.json();
      setgrades(data.grades)


    }
    const getGender = async () => {
      const res = await fetch(
        `${apiUrl}gender`,
        {
          method: "GET",


        }
      );
      const data = await res.json();
      setgender(data.gender)


    }
    getGrades();
    getGender();
  }, [])



  return (
    <div className="flex relative w-full bg-[#64748B]/5 h-full">
      {registretbox ? (
        <div
          onClick={() => setopenregistretbox(false)}
          class="bg-black/10 overflow-y-auto overflow-x-hidden fixed backdrop-blur-md flex  left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
              <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Success</span>
              </div>
              <p class="mb-4 text-lg font-semibold text-gray-900 ">
                Successfully Registret {lastPath.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="fixed top-0 hidden p-6 lg:block lg:px-12">
        <a href="#" className="flex items-center space-x-2">
          <img
            className="h-12 w-12 "
            src="https://lms.brainbox.lk/images/app-logo-gold.png"
            alt="logo"
          />
          <p className="text-xl font-semibold uppercase text-slate-700 dark:text-navy-100">
            BrainBox
          </p>
        </a>
      </div>
      <div className="hidden w-full place-items-center lg:grid">
        <div className="w-full max-w-lg p-6">
          <img
            className="w-full"
            x-show="!$store.global.isDarkModeEnabled"
            src="https://lms.brainbox.lk/images/illustrations/dashboard-meet.svg"
            alt="image"
          />
          {/* <img className="w-full" x-show="$store.global.isDarkModeEnabled" src="https://lms.brainbox.lk/images/illustrations/dashboard-meet-dark.svg" alt="image" style="display: none;" /> */}
        </div>
      </div>
      <main className="flex w-full flex-col items-center bg-white dark:bg-navy-1500 lg:max-w-md">
        <div className="flex w-full max-w-sm grow flex-col justify-center p-5">
          <div className="text-center">
            <img
              className="mx-auto h-16 w-16 lg:hidden"
              src="https://lms.brainbox.lk/images/app-logo-gold.png"
              alt="logo"
            />
            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-slate-600 dark:text-navy-100">
                Welcome To BrainBox
              </h2>
              <p className="text-slate-400 dark:text-navy-300">
                Please sign up to continue
              </p>
              <p className="mt-2 text-xl font-medium text-blue-500 dark:text-blue-600">
                Agent Registrationd
              </p>
            </div>
          </div>

          <div className="my-7 flex items-center space-x-3">
            <div className="h-px flex-1 bg-slate-300 "></div>
            <p className="text-tiny+ uppercase">sign up with your details</p>

            <div className="h-px flex-1 bg-slate-300 "></div>
          </div>
          <div className="flex justify-center">
            {error ? (
              <p className="text-red-400 text-[14px]  font-semibold">{error}</p>
            ) : (
              ""
            )}
          </div>

          <form className="mt-4" onSubmit={formik.handleSubmit}>
            <div className="space-y-3">
              {/* <!-- First Name Field --> */}

              <CInput
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                icon={"fa-user"}
                name={"firstName"}
                placeholder={"First Name"}
                type={"text"}
              />
              {formik.errors.firstName && formik.touched.firstName ? (
                <p className="text-red-400 text-[14px]  ">
                  {formik.errors.firstName}
                </p>
              ) : (
                ""
              )}

              {/* <!-- Last Name Field --> */}
              <CInput
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                icon={"fa-user"}
                name={"lastName"}
                placeholder={"Last Name"}
                type={"text"}
              />
              {formik.errors.lastName && formik.touched.lastName ? (
                <p className="text-red-400 text-[14px]  ">
                  {formik.errors.lastName}
                </p>
              ) : (
                ""
              )}

              {/* <!-- Email Field --> */}
              <CInput
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                icon={"fa-envelope"}
                name={"email"}
                placeholder={"Email"}
                type={"email"}
              />
              {formik.errors.email && formik.touched.email ? (
                <p className="text-red-400 text-[14px]  ">
                  {formik.errors.email}
                </p>
              ) : (
                ""
              )}


              {/* <!-- Nic Field --> */}
              <CInput
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.nic}
                icon={"fa-id-card"}
                name={"nic"}
                placeholder={"nic"}
                type={"text"}
              />
              {formik.errors.nic && formik.touched.nic ? (
                <p className="text-red-400 text-[14px]  ">
                  {formik.errors.nic}
                </p>
              ) : (
                ""
              )}

              {/* <!-- Phone Number Field --> */}
              <CInput
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.mobile}
                icon={"fa-phone"}
                name={"mobile"}
                placeholder={"Phone Number"}
                type={"text"}
              />
              {formik.errors.mobile && formik.touched.mobile ? (
                <p className="text-red-400 text-[14px]  ">
                  {formik.errors.mobile}
                </p>
              ) : (
                ""
              )}


              {/* <!-- Password Field --> */}
              <CInput
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                icon={"fa-lock"}
                name={"password"}
                placeholder={"Password"}
                type={"password"}
              />
              {formik.errors.password && formik.touched.password ? (
                <p className="text-red-400 text-[14px]  ">
                  {formik.errors.password}
                </p>
              ) : (
                ""
              )}

              {/* <!-- Repeat Password Field --> */}
              <CInput
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password_confirmation}
                icon={"fa-lock"}
                name={"password_confirmation"}
                placeholder={"Repeat Password"}
                type={"password"}
              />
              {formik.errors.password_confirmation &&
                formik.touched.password_confirmation ? (
                <p className="text-red-400 text-[14px]  ">
                  {formik.errors.password_confirmation}
                </p>
              ) : (
                ""
              )}


              {/* <!-- Promotion Code Field --> */}


              <>
                <CInput
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.promoCode}
                  icon={"fa-user"}
                  name={"promoCode"}
                  placeholder={"Promotion Code"}
                  type={"text"}
                />
                {formik.errors.promoCode && formik.touched.promoCode ? (
                  <p className="text-red-400 text-[14px]  ">
                    {formik.errors.promoCode}
                  </p>
                ) : (
                  ""
                )}
              </>

              {/* <!-- Terms and Conditions Checkbox --> */}
              <div className="flex items-center my-3">
                <CInput
                  type={"checkbox"}
                  name={"terms"}
                  onBlur={formik.handleChange}
                  value={formik.values.terms}
                  onChange={formik.handleChange}
                  className="custom-checkbox"

                />
                <label
                  htmlFor="terms" className="text-slate-700 dark:text-slate-700"  >
                  I accept the{" "}
                  <a href="/tandc/student" className="text-primary hover:underline">
                    terms and conditions
                  </a>
                  .
                </label>
              </div>
              {formik.errors.terms && formik.touched.terms ? (
                <p className="text-red-400 text-[14px]  ">
                  {formik.errors.terms}
                </p>
              ) : (
                ""
              )}



            </div>

            <button type="submit" className="btn rounded-md mt-4 h-10 w-full bg-primary font-medium text-white hover:bg-indigo-700 focus:bg-primary-focus active:bg-primary-focus/90 " >
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center text-xs+">
            <p className="line-clamp-1">
              <span>Already have an account? </span>
              <a
                className="text-primary transition-colors hover:text-primary-focus "
                href="/login/student"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};


const CInput = ({ name, icon, type, placeholder, onBlur, onChange, value }) => {
  return (
    <div className="">
      <label className="relative flex">
        <input placeholder={placeholder} type={type} id={name} onBlur={onBlur} value={value} onChange={onChange} className="form-input border-none outline-none transition-all duration-200  text-[15px]  peer w-full rounded-lg   bg-slate-200 dark:bg-slate-100 hover:bg-slate-300 dark:hover:bg-slate-200 px-3 py-2 pl-9  ring-primary/50  focus:border-none focus:outline-none focus:ring placeholder:text-slate-400" />
        <span className="pointer-events-none text-[16px] absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary ">
          <i className={`fas ${icon} h-5 w-5 transition-colors duration-200`}></i>
        </span>

      </label>

    </div>
  )
}
export default AgentSignUp;
