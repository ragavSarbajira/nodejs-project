import arcjet,{ tokenBucket,shield,detechBot} from "@arcjet/node";

import "dotenv/config"

export const aj=arcjet({
    key:process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules:[
        // SHIELD PROTECTS YOUR APP FROM COMMON ATTACKS EG:SQL INJECTION,XSS ,CSRF ATTACKS
        shield({mode:"LIVE"}),
        detectBot({
            mode:"LIVE",
            //BLOCK ALL BOTS EXECPT SEARCH ENGINEES
            allow:[
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
    //RATE LIMITING   

    tokenBucket({
        mode:"LIVE",
        refillrate:5,
        interval:10,
        capacity:10,

    })
    ]

})