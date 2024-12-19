"use client"

import React from "react"

function LinkedINShare() {
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

            {/* LinkedIn */}
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`} target="_blank">
                <img
                    src={"/assets/Instagram.svg"}
                    width={32}
                    height={32}
                    alt="instagram"
                />
            </a>
            {/* LinkedIn */}

        </>
    )
}

export default LinkedINShare;