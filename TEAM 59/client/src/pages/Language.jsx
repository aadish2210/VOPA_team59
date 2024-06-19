import React from 'react'
import LanguageCard from '../Components/LanguageCard';
const Language = () => {
  const data = [{
    name : "English",
    url : "https://learnenglishkids.britishcouncil.org/sites/kids/files/styles/430x261_4/public/image/worksheets-acrostic-poems_1.png?itok=TgyrlqjA",
  },
  {
    name : "Hindi",
    url : "https://static.vecteezy.com/system/resources/previews/026/813/031/non_2x/ka-hindi-alphabet-a-timeless-classic-vector.jpg"
  },
  {
    name : "Marathi",
    url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKuZgfelia65lFzX1GrXauXEcaFMu_xu7X_Q&s"
  }
  ]
  return (
    <div className='flex justify-center h-screen items-center bg-blue-400'>
      <div className='flex flex-wrap justify-center gap-4 items-center max-w-6xl'>
      {data.map(function(item){
        return <LanguageCard url={item.url} name={item.name}/>
      })}
      </div>
    </div>
  )
}

export default Language;