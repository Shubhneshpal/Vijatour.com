import React from 'react'
import Header from './Header'
import Cards from './CountryCards/Cards'
import Footer from '../Footer/Footer'

const Home = () => {
  return (
    <div className='mian-wrapper'>
      <div className="content">      
      <Header/>
      <Cards/>  
      <Footer/>         
      </div>
    </div>
  )
}

export default Home
