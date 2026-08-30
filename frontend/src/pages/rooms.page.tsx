import RoomList from "../components/lists/room.list.tsx";

const RoomsPage = () => {
  return (
    <section>
      <div className='container md:px-9 px-5 mb-2'>
        <h2 className='section-title'>Palatalar</h2>

        <RoomList/>
      </div>
    </section>
  )
}

export default RoomsPage;
