"use client"

import React from "react"

function FacebookShare() {
  const url = window.location.href;

  function ShareWebAPI() {
    if (navigator.share) {
      navigator.share({
        title: "Hi guys checkout this lovely event on CrowdPass",
        url: url
      })
        .catch(err => alert("Error Sharing: " + err))
    } 
  }
  return (
    <>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank">
        <img
          src={"/assets/Facebook.svg"}
          width={32}
          height={32}
          alt="facebook"
        />
      </a>
    </>
  )
}

export default FacebookShare;