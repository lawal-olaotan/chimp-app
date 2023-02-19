import { WelcomeImages } from "./WelcomeImages"

export const FreeTrials = ()=> {
    return (
        <button>
            <WelcomeImages imagePath='/free.png' imageAlt='free trial' imageText='Track Free trials'/>
        </button>
    )
}