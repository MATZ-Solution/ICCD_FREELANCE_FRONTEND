function Tabs({ datas, active, setActive }) {
    return (
        <div className="mt-8 flex flex-wrap gap-6 sm:gap-10">
            {datas.map((data, index) => (
                <button key={index} className="cursor-pointer" onClick={() => setActive(data)}>
                    <p className={`font-semibold ${active === data ? 'text-[#3DBF07]' : 'text-[#A8A8A8]'}`}>{data}</p>
                </button>
            ))
            }
        </div>
    )
}

export default Tabs