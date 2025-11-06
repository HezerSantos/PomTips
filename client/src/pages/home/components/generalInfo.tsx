import React, { ReactNode } from "react"
import { FaDog } from "react-icons/fa";
import { FaCouch } from "react-icons/fa6";
import { PiMaskHappy } from "react-icons/pi";
const generalInfoInformation: GeneralInfoCardProps[] = [
    {
        icon: <FaDog />,
        header: "Pawfection in Every Set",
        text: "Your nails deserve more than a quick polish — they deserve care, creativity, and precision. Our artists craft each look with salon-level detail and Pom-approved love. You’ll walk out shining and confident, every single time."
    },
    {
        icon: <FaCouch />,
        header: "Where Style Meets Comfort",
        text: "No rush, no stress — just a cozy, relaxing experience while your nails get the attention they deserve. Every appointment is personalized to your vibe, your style, and your favorite colors."
    },
    {
        icon: <PiMaskHappy />,
        header: "Nails That Make Tails Wag",
        text: "From simple elegance to show-stopping art, we bring your nail dreams to life — all while keeping your comfort and health top priority. Every detail matters here, from prep to perfect finish."
    }
]

interface GeneralInfoCardProps {
    icon: ReactNode
    header: string
    text: string
}
const GeneralInfoCard: React.FC<GeneralInfoCardProps> = ({icon, header, text}) => {
    return (
        <>
            <div className="general-info-card">
                {icon}
                <p>{header}</p>
                <p>{text}</p>
            </div>
        </>
    )
}

const GeneralInfo: React.FC = () => {
    return(
        <>
            <section className="page-section">
                <div className="page-section__child general-info">
                                            {generalInfoInformation.map(({icon, header, text}, index) => {
                            return (
                                <GeneralInfoCard 
                                    icon={icon}
                                    header={header}
                                    text={text}
                                    key={index}
                                />
                            )
                        })}
                </div>
            </section>
        </>
    )
}

export default GeneralInfo