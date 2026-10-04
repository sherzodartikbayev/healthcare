import {Link, useParams} from "react-router-dom";
import Button from "../ui/button.tsx";
import {useMedicalRecords} from "../../hooks/useMedicalRecords.ts";
import ErrorCard from "../cards/error.card.tsx";
import type {MedicalRecordType} from "../../types/medical-record.type.ts";
import MedicalRecordCard from "../cards/medical-record.card.tsx";

const MedicalHistoryList = () => {
  const {id} = useParams();
  const {isLoading, data, isError} = useMedicalRecords(id!)
  const records: MedicalRecordType[] = data?.medicalRecord;

  if(!records) {
    return (
      <div className="w-full overflow-hidden rounded-lg bg-white shadow-md">
        <div className="d-between py-4 px-6">
          <h2 className="font-bold text-lg md:text-xl">Kasallik tarixi</h2>
          <Link to='/medical-record/create' className='ml-auto'>
            <Button variant="primary" icon="/icons/plus.svg">Yangi kasallik tarixi</Button>
          </Link>
        </div>

        <div className='d-flex p-15'>
          <h2>Kasallik tarixi mavjud emas.</h2>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="w-full overflow-hidden rounded-lg bg-white shadow-md">
        <div className="d-between py-4 px-6">
          <h2 className="font-bold text-lg md:text-xl">Kasallik tarixi</h2>
          <Link to='/medical-record/create' className='ml-auto'>
            <Button variant="primary" icon="/icons/plus.svg">Yangi kasallik tarixi</Button>
          </Link>
        </div>

        <div className='d-flex p-15'>
          <h2>Kasallik tarixi yuklanmoqda...</h2>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full overflow-hidden rounded-lg bg-white shadow-md">
        <div className="d-between py-4 px-6">
          <h2 className="font-bold text-lg md:text-xl">Kasallik tarixi</h2>
          <Link to='/medical-record/create' className='ml-auto'>
            <Button variant="primary" icon="/icons/plus.svg">Yangi kasallik tarixi</Button>
          </Link>
        </div>

        <div className='p-5'>
          <ErrorCard/>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow-md">
      <div className="d-between py-4 px-6">
        <h2 className="font-bold text-lg md:text-xl">Kasallik tarixi</h2>
        <Link to='/medical-record/create' className='ml-auto'>
          <Button variant="primary" icon="/icons/plus.svg">Yangi kasallik tarixi</Button>
        </Link>
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-225 text-left">
          <thead className="bg-[#E8E8E8] text-sm font-bold">
          <tr>
            <th className="whitespace-nowrap pl-6 py-4">Davolanish sanasi</th>
            <th className="whitespace-nowrap py-4">Kasallik turi</th>
            <th className="whitespace-nowrap w-90 px-2 py-4">Diagnoz</th>
            <th className="whitespace-nowrap py-4">Shifokor</th>
            <th className="px-6 py-4">Amallar</th>
          </tr>
          </thead>

          <tbody>
          {records.map(record => (
            <MedicalRecordCard record={record} key={record.id} />
          ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 p-4 md:hidden">
      </div>
    </div>
  )
}

export default MedicalHistoryList;
