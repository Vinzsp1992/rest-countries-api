import { useState } from "react";

interface Props {
    themeSwitch: boolean;
    onSearch: (countryName: string) => Promise<void>;
    onSelect: (countryRegion: string) => Promise<void>;
}

const Search: React.FC<Props> = ({ themeSwitch, onSearch, onSelect }) => {

  const [input, setInput] = useState<string>('');

  //function handler for country by name
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSearch(input);
} 
//function handler for filter by region
const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) =>{
  const region = e.target.value;
  onSelect(region);
}
  return (
    <div className={`lg:ml-7 p-5 flex justify-between lg:flex-row flex-col gap-y-2 w-[100%]`}>

        <form onSubmit={handleSubmit} className={` p-2 w-[auto] gap-x-3 rounded-md shadow-2xl flex items-center
        justify-evenly ${themeSwitch ? "bg-sky-950 text-white" : "bg-white text-black"}`}>
        <ion-icon name="search-outline"></ion-icon>
        <input
        type='search'
        onChange={(e) => setInput(e.target.value)}
        value={input}
         id='search-country'
         className={`${themeSwitch ? "bg-sky-950" : "bg-white"} p-2 border-none`}
         placeholder="Search for a country" />
         </form>
         
    <div className={`${themeSwitch ? "bg-sky-950" : "bg-white"} lg:mr-12 lg:flex item-center px-2 rounded-md`}>
         <select defaultValue="Filter by Region" name="contenents"  id="contenents"
          onChange={selectHandler}
         className={`${themeSwitch ? "bg-sky-950 text-white" : "bg-white text-black"} 
         w-[176px] text-center shadow-xl rounded-md h-[50px]`}>
            
            <option hidden disabled>Filter by Region</option>
            <option className="hover:text-sky-400" value='africa'>Africa</option>
            <option className="hover:text-sky-400" value='america'>America</option>
            <option className="hover:text-sky-400" value='asia'>Asia</option>
            <option className="hover:text-sky-400" value='europe'>Europe</option>
            <option className="hover:text-sky-400" value='oceania'>Ocenia</option>
            <option className="hover:text-sky-400" value='antarctic'>Antarctic</option>
           
        </select>
    </div>
    </div>
  )
}

export default Search