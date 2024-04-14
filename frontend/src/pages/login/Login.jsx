import { useState } from "react";
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [values, setValues] = useState({
    [username]: "",
    [password]: "",
  })
  const { loading, login } = useLogin();

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
    await login(values)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-4 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-blue-400">ChatApp</span>
        </h1>
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
          <Link to={"/signup"} className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            {"Don't"} have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner" /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login


const username = "username";
const password = "password";

const InputFieldList = [
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
]


// starter page for the file
// const Login = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-4 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//         <h1 className="text-3xl font-semibold text-center text-gray-300">
//           Login <span className="text-blue-400">ChatApp</span>
//         </h1>
//         <form>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Username</span>
//             </label>
//             <input type="text" placeholder="Enter Username" className="w-full input input-bordered h-10" autoComplete="off" />
//           </div>

//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Password</span>
//             </label>
//             <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10" autoComplete="off" />
//           </div>
//           <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
//             {"Don't"} have an account?
//           </a>
//           <div>
//             <button className="btn btn-block btn-sm mt-2">Login</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login