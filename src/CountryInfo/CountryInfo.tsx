import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface FlagType {
  png: string;
  alt: string;
  svg: string;
}
interface Names {
  common: string;
  official: string;
}

interface Country {
  borders: string[];
  population: number;
  region: string;
  name: Names;
  flags: FlagType;
  capital: string;
  subregion: string;
  currencies: string[];
}

interface ThemeSwitch {
  themeSwitch: boolean;
  
}
export const CountryInfo: React.FC<ThemeSwitch> = ({ themeSwitch })=> {
  const [country, setCountry] = useState<Country[]>([]);
  const [_isLoading, setIsLoading] = useState<boolean>(false);
  const [_error, setError] = useState<string>('');

  const {countryName} = useParams();

  const getCountryByName = async() =>{
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      if (!res.ok) throw new Error('Failed to fetch countries data');
      const data = await res.json();
      setCountry(data);
      setIsLoading(false);

    } catch (error: any) {
      setIsLoading(false);  
      setError(error.message);
    }
  }

  useEffect(()=>{
    getCountryByName();
  }, [countryName])

  return (
    <div className="mx-5 h-[100vh] flex flex-col">
      <Link to='/rest-countries-api/'><button className={`${themeSwitch ? "text-white bg-sky-950" 
      : "text-black bg-slate-50"}
       m-4 p-2 px-5 rounded-md shadow-xl`}>
        Back</button></Link>
      {
        country?.map((country, index) => (

          <div key={index}>
            <div className='wrapper flex items-center flex-wrap justify-between lg:justify-evenly gap-x-4 gap-y-10'>
                            <div className='country_flag'>
                             <img src={country.flags.png} alt="" className="w-[100%] h-[320px]" />
                            </div>

                        <div className={`${themeSwitch ? "text-white" : "text-gray-700"} 
                         country_data leading-8 p-5`}>
                            
                            <h3 className='text-4xl mb-10 font-bold'>{country.name.common}</h3>

                            <h3 className='font-semibold'>
                            Native Name: 
                             <span  className='font-normal text-sm'> {country.name.official} </span>
                             </h3>
                            <h3 className='font-semibold text-md'>
                                Population: 
                                 <span className='font-normal text-sm'> {country.population.toLocaleString()}</span>
                            </h3>
                            <h3 className='font-semibold'>
                                Region:
                                <span className='font-normal text-sm'> {country.region}</span>
                            </h3>
                            
                             <h3 className='font-semibold text-md' >
                              Sub Region:
                                  <span className='font-normal text-sm'> {country.subregion}</span>
                             </h3>
                             <h3 className='font-semibold text-md' >
                              Capital:
                                    <span className='font-normal text-sm'> {country.capital}</span>
                             </h3>

                            {country.borders && (
                              <>
                              <h3 className='font-bold text-md mt-8' >
                                 Border countries:
                                 <ul className="flex flex-wrap items-start justify-start gap-x-2">
                                {country.borders.map((border, index) =>(
                                  
                                  <li key={index} className={`${themeSwitch ? "bg-sky-950" : "bg-white"}
                                  p-1 shadow-xl tracking-wide text-xs`}>{border}</li>
                               
                                ))}    
                                 </ul> 
                                </h3>
                              </>
                            )}
                            
                        </div>
              </div>

          </div>
        ))
        
      }
    </div>
  )
}
