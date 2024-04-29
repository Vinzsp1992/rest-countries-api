import {useState, useEffect} from 'react';
import SearchAndSelect from './SearchAndSelect'

import LoadingOverlay from 'react-loading-overlay-ts';
import { Link } from 'react-router-dom';

interface Country {
    population: number;
    region: string;
    name: string | any;
    flags: string[] | any;
    capital: string;
}
interface ThemeSwitch {
    themeSwitch: boolean;
    onSearch:(countryName: string) => Promise<void>;
    onSelect: (countryRegion: string) =>Promise<void>;
}

const Countries: React.FC<ThemeSwitch> = ({ themeSwitch }) => {
    const [isActive] = useState<boolean>(true) //for loading animation
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errors, setError] = useState<boolean>(false);


    //fetching all countries
    const getCountries = async () => {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            if (!response.ok) throw new Error('Failed to fetch countries data');
            
            const data = await response.json();
            console.log(data);
            setCountries(data);
            setIsLoading(false);
            return data;
        } catch (error: any) {
            console.error('Error fetching countries data:', error);
            setIsLoading(false);
            setError(error.message);
            return null;
        }
    };

    //function for filter by name
    const getCountryByName = async(countryName: string)=>{
        try{
            const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
            if(!res.ok) throw new Error("Country Not found");
                
            const data = await res.json();
            setCountries(data);
            setIsLoading(false);
        }catch(error: any){
            setIsLoading(false);
            
            setError(error.message);
        }
       
    }   
    //function for filter region
    const getCountryByRegion = async (countryRegion: string) =>{
        const res = await fetch(`https://restcountries.com/v3.1/region/${countryRegion}`)
        try{
            if(!res.ok) throw new Error("Region not found");
            const data = await res.json();
            setCountries(data);
            setIsLoading(false);
        }catch(error: any){
            setIsLoading(false);
            setError(error.message);

        }
    }
    useEffect(()=>{
        
    getCountries();
        
    }, []);

  return (
    <div>
        <SearchAndSelect themeSwitch={themeSwitch} onSearch={getCountryByName} onSelect={getCountryByRegion}/>
        <div className={`${themeSwitch ? 'bg-sky-950' : 'bg-slate-50'}
           flex flex-wrap gap-x-4 gap-y-10 justify-evenly `}>

            {isLoading && !errors &&
             <div className='h-[30vh] flex justify-center items-center '>

                <h3 className={` font-bold `}>
                    <LoadingOverlay 
                    active={isActive}
                    spinner
                    text='Loading...'>
                    
                    </LoadingOverlay>
                    
                    </h3>
                    </div>}
            {errors && !isLoading && <h3>{errors}</h3>}

            {
                countries?.map((country, _index) =>(

                    <Link to={`/rest-countries-api/country/${country.name.common}`} key={country.name.common}>
                    <div className='country_card w-[260px] rounded-lg  shadow-lg
                    '  key={_index}>

                        <div className='wrapper '>
                            <div className='country_flag'>
                             <img src={country.flags.png} alt="" className="w-[100%] h-[175px] rounded-tr-md rounded-tl-md" />
                            </div>
                        <div className={`${themeSwitch ? "text-white" : "text-black"} country_data leading-8 p-5`}>
                            <h3 className='text-xl font-bold'>{country.name.common}</h3>
                            <h3 className='font-semibold text-md'>
                                Population: 
                                 <span className='font-normal text-sm'> {country.population.toLocaleString()}</span>
                            </h3>
                            <h3 className='font-semibold'>
                                Region:
                                <span className='font-normal text-sm'> {country.region}</span>
                            </h3>
                            <h3 className='font-semibold text-md' >Capital:
                             <span className='font-normal text-sm'> {country.capital}</span>
                             </h3>
                        </div>


                        </div>
                        
                    </div>
                    </Link>
                ))}
           
        </div>


    </div>
  )
}

export default Countries