
interface ToggleTheme {
  themeSwitch: boolean;
  toggleTheme: () => void;

}
const Navbar: React.FC<ToggleTheme> = ({themeSwitch, toggleTheme}) => {
  
  
  return (
    <div className={`${themeSwitch ? "bg-sky-950" : "bg-white"} flex justify-between
     items-center shadow-xl p-5`}>
        <h1 className={`${themeSwitch ? "text-gray-300" : "text-black"} font-bold text-xl`}>Where in the world?</h1>
        <div className='flex items-center gap-2 justify-between'>
        <span className={`cursor-pointer ${themeSwitch ? 'text-white' : 'text-black'}`}
         onClick={toggleTheme}>  
        {!themeSwitch ? <ion-icon name="moon-outline"></ion-icon> : <ion-icon name="sunny-outline"></ion-icon>}
    
        </span>
        <h2 className={`${themeSwitch ? 'text-gray-300' : 'text-black'}`}>Dark mode</h2>
        </div>
    </div>
  )
}

export default Navbar