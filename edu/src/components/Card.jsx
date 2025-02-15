const Card = ({ children, bg= 'bg-gray-100', ...rest}) => {
  return (
    <div className={` ${bg} p-6 rounded-lg shadow-md`}{...rest}>{ children }</div>
  )
}

export default Card
