import {type FormEvent, useState} from "react";
import Input from "../shared/input.tsx";

const SearchForm = () => {
  const [search, setSearch] = useState("")

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <form>
      <Input
        className='md:min-w-[350px] max-w-[350px] py-3 px-10 md:text-[13px] text-xs bg-white border-none rounded-3xl'
        icon='/icons/search.svg'
        placeholder='Qidiruv'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClick={onSubmit}
      />
    </form>
  )
}

export default SearchForm;
