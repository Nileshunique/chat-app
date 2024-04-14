const GenderCheckbox = (props) => {
  const { name, value, onChange } = props;

  const handleChange = (e, newValue) => {
    onChange({
      target: {
        name: name,
        value: e.target.checked ? newValue : ""
      }
    })
  }

  return (
    <div className="flex">
      {CheckboxFieldList.map((item, index) => {
        return (
          <div className="form-control" key={index}>
            <label className={`label gap-2 cursor-pointer ${value === item.name ? "selected" : ""}`}>
              <span className="label-text">{item.label}</span>
              <input
                type={item.type}
                className="checkbox border-slate-900"
                name={name}
                checked={value === item.name}
                onChange={(e) => handleChange(e, item.name)}
              />
            </label>
          </div>
        )
      })}
    </div>
  )
}

export default GenderCheckbox

const male = "male";
const female = "female";

const CheckboxFieldList = [
  {
    label: "Male",
    name: male,
    type: "checkbox",
  },
  {
    label: "Female",
    name: female,
    type: "checkbox",
  },
]


// starter code for gender component
// const GenderCheckbox = () => {
//   return (
//     <div className="flex">
//       <div className="form-control">
//         <label className="label gap-2 cursor-pointer">
//           <span className="label-text">Male</span>
//           <input type="checkbox" className="checkbox border-slate-900" />
//         </label>
//       </div>
//       <div className="form-control">
//         <label className="label gap-2 cursor-pointer">
//           <span className="label-text">Female</span>
//           <input type="checkbox" className="checkbox border-slate-900" />
//         </label>
//       </div>
//     </div>
//   )
// }

// export default GenderCheckbox