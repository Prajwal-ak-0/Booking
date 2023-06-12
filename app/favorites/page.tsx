import React from 'react'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import getFavoriteListings from '../actions/getFavoriteListings'
import getCurrentUser from '../actions/getCurrentUser'
import FavoriteClient from './FavoriteClient'

const page =async () => {
    const listings=await getFavoriteListings();
    const currentUser=await getCurrentUser();

    if(listings.length===0){
        return(
            <ClientOnly>
                <EmptyState
                    title='No favorites found'
                    subTitle='Looks like you have no favorites listings.'
                />
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <FavoriteClient
            listings={listings}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default page