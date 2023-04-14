import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { themeChange } from '../utils/themeSlice';
import { useEffect } from 'react';
import {HiSun, HiMoon} from 'react-icons/hi';

const ThemeToggle = () => {

    const dispatch = useDispatch();
    const theme = useSelector(store => store.theme.theme);

    useEffect(() => {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
            dispatch(themeChange('dark'));
        }
        else {
            dispatch(themeChange('light'));
        }
      }, [])   //verifying the system default theme and adjusting it 

      useEffect(() => {
        if (theme === "dark") {
            window.document.documentElement.classList.remove("light");
            window.document.documentElement.classList.add("dark");
            //if the theme is dark means light should be removed and dark should be added
         } else {
           window.document.documentElement.classList.remove("dark");
           window.document.documentElement.classList.add("light");
           //if the theme is light means dark should be removed and light should be added
         }

        // const root = window.document.documentElement;
        // root.classList.remove(theme === 'dark' ? 'light' : 'dark') //if the theme is dark means light should be removed
        // root.classList.add(theme);

      }, [theme]);  //changing the theme based on the switching and rerendering the component

      const handleThemeSwitch = () => {
        dispatch(themeChange(theme === "dark" ? "light" : "dark"));
      };

  return (
    <div className='cursor-pointer p-2'>
        {theme === 'dark' ? 
        (<div className='flex items-center' onClick={handleThemeSwitch}> 
            <HiSun className='text-2xl mr-2'/>LightMode
        </div>) : 
        (<div className='flex items-center' onClick={handleThemeSwitch}>
            <HiMoon className='text-2xl mr-2'/>DarkMode
        </div>)}
    </div>
  )
}

export default ThemeToggle