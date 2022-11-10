export default function PrintComp(props) {
    return (
        <div className="h-screen w-3/4 mx-auto">
                <div>
                    <div ref={ref}>
                        <div className="bgCustom flex flex-col justify-center">
                            <div className="flex-none p-4 text-white h-full bg-slate-900 opacity-75">
                                <div className="flex flex-col justify-between items-center">
                                    <div className="flex w-full mb-5">
                                        <div className="flex-1"></div>
                                        <div className="flex-1">
                                            <p className="text-3xl font-bold text-center">[LOGO HERE]</p>
                                        </div>
                                        <div className="flex-1 text-right">
                                            <p className="text-sm">Certification Number:</p>
                                            <p className="text-sm font-bold">{props.certificates[0].id}</p>
                                        </div>
                                    </div>
                                    <div className="my-5">
                                        <p className="text-7xl font-bold">{props.certificates[0].title}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="mb-2">This is to acknowledge that</p>
                                        <p className="text-xl font-bold mb-2">{props.certificates[0].name}</p>
                                        <p className="mb-2">has successfully completed all requirements and criteria for</p>
                                        <p className="text-xl font-bold mb-2">{props.certificates[0].cert_title}</p>
                                        <p className="mb-2">certification through examination administered by EC-Council</p>
                                    </div>
                                    <div className="flex flex-row justify-around items-center text-sm w-full mt-5">
                                        <div className="flex-1 text-center">
                                            <p>Issue Date: <strong>{props.certificates[0].awardedOn}</strong></p>
                                        </div>
                                        <div className="flex-1 text-center">
                                            <p>Expiry Date: <strong>{props.certificates[0].expiredOn}</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    )
}