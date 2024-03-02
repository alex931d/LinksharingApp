


function BenefitCard({img,title,paragraph}){

    return(
        <>
            <div className="benefit-card">
               <img src={img} alt="" />
                <span className="bold">
                     {title}
                </span>

                <p>
                    {paragraph}
                </p>
            </div>
        </>
    )
}
export default BenefitCard;