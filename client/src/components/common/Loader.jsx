import React from "react";

function Loader() {

    return (

        <div
            className="
                fixed
                inset-0
                bg-white/80
                backdrop-blur-sm
                flex
                items-center
                justify-center
                z-50
            "
        >

            <div className="flex flex-col items-center">

                {/* SPINNER */}

                <div
                    className="
                        w-16
                        h-16
                        border-4
                        border-blue-200
                        border-t-blue-600
                        rounded-full
                        animate-spin
                    "
                />

                {/* TEXT */}

                <p
                    className="
                        mt-5
                        text-gray-600
                        font-medium
                        text-lg
                    "
                >

                    Loading...

                </p>

            </div>

        </div>

    );

}

export default Loader;