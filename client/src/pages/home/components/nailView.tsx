import React, { RefObject, SetStateAction, UIEvent, useRef, useState } from "react"
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import nailInfo from "../helpers/nailInfo";


interface NailCardProps {
    header: string
    price: number
    imgUrl: string
}

const NailCard: React.FC<NailCardProps> = ({header, price, imgUrl}) => {
    return(
        <>
            <div className="nail-card">
                <div>
                    <p>{header}</p>
                    <p>Starting at ${price}</p>
                </div>
                <div>
                    <img src={imgUrl} alt="" />
                </div>
            </div>
        </>
    )
}


type NailViewScrollButtonType = (
    nailContainer: RefObject<HTMLDivElement | null>
) => void

const nailScrollRight: NailViewScrollButtonType = (nailContainer) => {
    const width = (nailContainer.current?.clientWidth || 0 ) / 4
    nailContainer.current?.scrollBy({ left: width, behavior: 'smooth' })
}

const nailScrollLeft: NailViewScrollButtonType = (nailContainer) => {
    const width = nailContainer.current?.clientWidth
    nailContainer.current?.scrollBy({ left: -Number(width), behavior: 'smooth' })
}

interface NailViewScrollProps {
    nailContainer: RefObject<HTMLDivElement | null>,
    percentScrolled: number
}


type NailScrollEventType = (e: UIEvent<HTMLDivElement>, setPercentScrolled: React.Dispatch<SetStateAction<number>>) => void
const nailScrollEvent: NailScrollEventType = (e, setPercentScrolled) => {
    const container = e.currentTarget
    const percentScrolled = container.scrollLeft / (container.scrollWidth - container.clientWidth) * 100;
    setPercentScrolled(percentScrolled)
}

const NailViewScroll: React.FC<NailViewScrollProps> = ({nailContainer, percentScrolled}) => {
    return(
        <>
            <div className="nail-view-scroll">
                <div className="nail-view-scroll-full">
                    <div className="nail-view-scroll-partial" style={{width: `${percentScrolled}%`}}>
                    </div>
                </div>
                <div className="nail-view-scroll-buttons">
                    <button onClick={() => nailScrollLeft(nailContainer)}>
                        <IoIosArrowDropleft />
                    </button>
                    <button onClick={() => nailScrollRight(nailContainer)}>
                        <IoIosArrowDropright />
                    </button>
                </div>
            </div>
        </>
    )
}

const NailView: React.FC = () => {
    const nailContainer = useRef<HTMLDivElement | null>(null)
    const [ percentScrolled, setPercentScrolled ] = useState(0)
    return (
        <>
            <section className="page-section">
                <div className="page-section__child nail-view">
                    <div className="nail-view-content" ref={nailContainer} onScroll={(e) => nailScrollEvent(e, setPercentScrolled)}>
                        {nailInfo.map(({header, price, imgUrl}, index) => {
                            return (
                                <NailCard 
                                    header={header}
                                    price={price}
                                    imgUrl={imgUrl}
                                    key={index}
                                />
                            )
                        })}
                    </div>
                    <NailViewScroll nailContainer={nailContainer} percentScrolled={percentScrolled}/>
                </div>
            </section>
        </>
    )
}

export default NailView