import React from "react"


interface ServiceImageProps {
    image: string
    name: string
}
const ServiceImage: React.FC<ServiceImageProps> = ({image, name}) => {
    return(
        <>
            <div className="service-image">
                <p>{name}</p>
                <div>
                    <img src={image} alt="" />
                </div>
            </div>
        </>
    )
}

interface ServiceContentProps {
    price: number
    text: string
}
const ServiceContent: React.FC<ServiceContentProps> = ({price, text}) => {
    return(
        <>
            <div className="service-content">
                <div>
                    <p>Base Price</p>
                    <div></div>
                    <p>${price}</p>
                </div>
                <p>{text}</p>
                <button>Book Now</button>
            </div>
        </>
    )
}

interface ServiceItemProps {
    name: string
    price: number
    text: string
    image: string
}
const ServiceItem: React.FC<ServiceItemProps> = ({name, price, text, image}) => {
    return(
        <>
            <div className="service-item">
                <ServiceImage image={image} name={name}/>
                <ServiceContent price={price} text={text}/>
            </div>
        </>
    )
}

export default ServiceItem