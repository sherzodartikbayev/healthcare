interface Props {
  label: string,
  icon: string,
  count: number
}

const DashboardCard = ({label, icon, count}: Props) => {
  return (
    <div
      className='md:max-w-70 w-full md:h-22 h-16 bg-white rounded-lg md:py-5 py-2 md:px-6 px-3 d-start md:gap-6 gap-3 shadow-md'>
      <figure className='md:size-10 size-8'>
        <img src={icon} alt={label} className='size-full'/>
      </figure>

      <div>
        <h2 className='font-bold md:text-sm text-xs text-black'>{label}</h2>
        <p className='md:text-lg text-sm text-blue'>{count || 0}</p>
      </div>
    </div>
  )
}

export default DashboardCard;
