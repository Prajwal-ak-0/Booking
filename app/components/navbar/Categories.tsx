'use client';

import React from 'react'
import {MdOutlineVilla} from 'react-icons/md'
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi'
import {TbBeach,TbMountain,TbPool} from 'react-icons/tb'
import {FaSkiing} from 'react-icons/fa'
import {BsSnow} from 'react-icons/bs'
import {IoIosGlobe} from 'react-icons/io'
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories=[
  {
    label:'Beach',
    icon:TbBeach,
    description:'This property is close to the beach'
  },
  {
    label:'Windmill',
    icon:GiWindmill,
    description:'This property has windmills'
  },
  {
    label:'Modern',
    icon:MdOutlineVilla,
    description:'This property is modern'
  },
  {
    label:'CountrySide',
    icon: TbMountain ,
    description:'This property is in the countryside',
  },
  {
    label:'Pools',
    icon: TbPool ,
    description:'This property has a pool',
  },
  {
    label:'Islands',
    icon: GiIsland ,
    description:'This property is on an isLand',
  },
  {
    label:'Lake',
    icon: GiBoatFishing ,
    description:'This property is close to lake',
  },
  {
    label:'Skiing',
    icon: FaSkiing ,
    description:'This rpoperty has skiing activities',
  },
  {
    label:'Castles',
    icon: GiCastle ,
    description:'This propert is in castle',
  },
  {
    label:'Camping',
    icon: GiForestCamp ,
    description:'This property has camping activities',
  },
  {
    label:'Arctic',
    icon: BsSnow ,
    description:'This property has snow falls',
  },
  {
    label:'Cave',
    icon: GiCaveEntrance ,
    description:'This property is in a cave',
  },
  {
    label:'Desert',
    icon: GiCactus ,
    description:'This property',
  },
  {
    label:'Barns',
    icon:GiBarn,
    description:'This property is in the barn'
  }
]

const Categories = () => {

  const params=useSearchParams();
  const category=params?.get('category');
  const pathname=usePathname();

  const isMainPage=pathname==='/';

  if(!isMainPage){
    return null;
  }

  return (
    <div
      className='
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
      '
    >
      {categories.map((item)=>(
        <CategoryBox
          key={item.label}
          label={item.label}
          selected={category===item.label}
          icon={item.icon}
        />
      ))}
    </div>
  )
}

export default Categories