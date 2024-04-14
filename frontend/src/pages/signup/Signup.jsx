import { Link } from "react-router-dom"
import GenderCheckbox from "./GenderCheckbox"
import { useState } from "react"
import useSignup from "../../hooks/useSignup"

const Signup = () => {

  const [values, setValues] = useState({
    [fullName]: "",
    [username]: "",
    [password]: "",
    [confirmPassword]: "",
    [gender]: "",
  })
  // eslint-disable-next-line no-unused-vars
  const { loading, signup } = useSignup()

  const onChange = (e) => {
    const { name, value } = e.target;

    setValues(pre => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(values)
  }

  return (
    <div className="flex flex-col items-center justify-normalmin-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">Sign Up <span className="text-blue-400">ChatApp</span></h1>
        <form onSubmit={handleSubmit}>
          {InputFieldList.map((item, index) => {
            return (
              <div key={index}>
                <label className="label p-2">
                  <span className="text-base label-text">{item.heading}</span>
                </label>
                <input
                  type={item.type}
                  placeholder={item.placeholder}
                  name={item.name}
                  value={values[item.name]}
                  onChange={onChange}
                  className="w-full input input-bordered h-10"
                />
              </div>
            )
          })}

          {/* Gender checkbox gose here */}
          <GenderCheckbox name={gender} value={values[gender]} onChange={onChange} />

          <Link to="/login" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            Already have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm border border-slate-200"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner" /> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;

const fullName = "fullName";
const username = "username";
const password = "password";
const confirmPassword = "confirmPassword";
const gender = "gender";

const InputFieldList = [
  {
    heading: "Full Name",
    name: fullName,
    placeholder: "Enter Full Name",
    type: "text",
  },
  {
    heading: "Username",
    name: username,
    placeholder: "Enter Username",
    type: "text",
  },
  {
    heading: "Password",
    name: password,
    placeholder: "Enter Password",
    type: "password",
  },
  {
    heading: "Confirm Password",
    name: confirmPassword,
    placeholder: "Enter Confirm Password",
    type: "password",
  },
]



// starter code for later use (signup)
// import GenderCheckbox from "./GenderCheckbox"

// const Signup = () => {
//   return (
//     <div className="flex flex-col items-center justify-normalmin-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//         <h1 className="text-3xl font-semibold text-center text-gray-300">Sign Up <span className="text-blue-400">ChatApp</span></h1>

//         <div>
//           <label className="label p-2">
//             <span className="text-base label-text">Full Name</span>
//           </label>
//           <input type="text" placeholder="Enter Full Name" className="w-full input input-bordered h-10" autoComplete="off" />
//         </div>

//         <div>
//           <label className="label p-2">
//             <span className="text-base label-text">Username</span>
//           </label>
//           <input type="text" placeholder="Enter Username" className="w-full input input-bordered h-10" autoComplete="off" />
//         </div>

//         <div>
//           <label className="label p-2">
//             <span className="text-base label-text">Password</span>
//           </label>
//           <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10" autoComplete="off" />
//         </div>

//         <div>
//           <label className="label p-2">
//             <span className="text-base label-text">Confirm Password</span>
//           </label>
//           <input type="password" placeholder="Enter Confirm Password" className="w-full input input-bordered h-10" autoComplete="off" />
//         </div>

//         {/* Gender checkbox gose here */}
//         <GenderCheckbox />

//         <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
//           Already have an account?
//         </a>

//         <div>
//           <button className="btn btn-block btn-sm mt-2">Sign Up</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Signup