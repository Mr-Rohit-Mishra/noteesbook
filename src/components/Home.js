import React from 'react'
import Notes from './Notes'



export default function Home(props) {
  const {showAlert}= props
  return (
    <>
      <Notes showAlert={showAlert}/>
    </>

  )
}
