import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logo, sun } from '../assets';
import { navlinks } from '../constants';

const Icon = ({ styles, name, imgUrl, isActive, disabled, onClickCallback }) => {
    console.log('ksfjskf', imgUrl);
    return (
        <div className={`w-[48px] h-[48px] rounded-md flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles} ${isActive && isActive === name && 'bg-[#2c2f32]'}`}
            onClick={onClickCallback}>
            {isActive ? (<img src={imgUrl} alt='logo' className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />) : (<img src={imgUrl} alt='logo' className={`w-1/2 h-1/2`} />)}
        </div>
    )
}

function Sidebar() {
    const navigate = useNavigate();
    const [active, setActive] = useState('dashboard')

    return (
        <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
            <Link to="/">
                <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
            </Link>

            <div className='flex flex-1 flex-col justify-between items-center bg-[#1c1c24] rounded-[18px] w-[76px] py-4 mt-12'>
                <div className='flex flex-col justify-center items-center gap-3'>
                    {navlinks.map(item => (<Icon key={item.name} {...item} isActive={active} onClickCallback={() => {
                        if (!item.disabled) {
                            setActive(item.name)
                            navigate(item.link)
                        }
                    }} />))}
                </div>

                <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
            </div>
        </div>
    )
}

export default Sidebar