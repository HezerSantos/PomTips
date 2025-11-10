import ServiceItem from "./serviceItem"
import img from '../../../assets/images/nailOne.jpg'
const ServicesContent: React.FC = () => {
    return(
        <>
            <section className="page-section">
                <div className="page-section__child services-content">
                    <ServiceItem 
                        name="Acrylic Full Set"
                        price={60}
                        text="A durable and versatile nail enhancement that lets you customize length, shape, and design. Perfect for intricate art, gems, or bold colors. Long-lasting and professional results every time."
                        image={img}
                    />
                    <ServiceItem 
                        name="Acrylic Full Set"
                        price={60}
                        text="A durable and versatile nail enhancement that lets you customize length, shape, and design. Perfect for intricate art, gems, or bold colors. Long-lasting and professional results every time."
                        image={img}
                    />
                </div>
            </section>
        </>
    )
}

export default ServicesContent