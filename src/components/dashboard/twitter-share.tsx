"use client"

import React from 'react'

const TwitterShare = () => {
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
            {/* Twitter */}
            <a href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURI("Hi guys checkout this lovely event on CrowdPass")}`} target="_blank">
                <img
                    src={"/assets/Twitter.svg"}
                    width={32}
                    height={32}
                    alt="twitter"
                />
            </a>
            {/* Twitter */}
        </>
    )
}


export default TwitterShare