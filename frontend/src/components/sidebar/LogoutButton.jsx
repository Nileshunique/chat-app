import { BiLogOut } from "react-icons/bi"
import useLogout from "../../hooks/useLogout"

const LogoutButton = () => {
  // eslint-disable-next-line no-unused-vars
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto">
      {loading ? (
        <span className="loading loading-spinner" />
      ) : (
        <BiLogOut
          className="w-6 h-6 text-shite cursor-pointer"
          onClick={logout}
        />
      )}
    </div>
  )
}

export default LogoutButton