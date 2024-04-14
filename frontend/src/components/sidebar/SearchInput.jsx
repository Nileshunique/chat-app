import { useState } from "react"
import { IoSearchSharp } from "react-icons/io5"
import useGetConvarsations from "../../hooks/useGetConvarsations";
import useConvarsation from "../../zustand/useConvarsation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState();
  const { setSelectedConvarsation } = useConvarsation();
  const { conversations } = useGetConvarsations();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(search.trim())) return;
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))

    if (conversation) {
      setSelectedConvarsation(conversation)
      setSearch("");
    } else {
      toast.error("No such user found")
    }

    // await getSearch(search);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  )
}

export default SearchInput


// starter code for the search input
// import { IoSearchSharp } from "react-icons/io5"

// const SearchInput = () => {
//   return (
//     <form className="flex items-center gap-2">
//       <input type="text" placeholder="Search..." className="input input-bordered rounded-full" />
//       <button type="submit" className="btn btn-circle bg-sky-500 text-white">
//         <IoSearchSharp className="w-6 h-6 outline-none" />
//       </button>
//     </form>
//   )
// }

// export default SearchInput