const Chart = ({correct}: any) => {
    return(
        <div style={{width: '200px', height: '200px'}}>
            <svg viewBox = "0 0 300 300" >
                <circle cx="150" cy="150" r="110" fill="none" stroke="rgb(196 181 253)" strokeWidth="60" />
                <path d="M150,40 A110,110 180 1,0 150,260 A110,110 0 1,0 150,40" fill="none" stroke="rgb(109 40 217)" strokeWidth="60"
                strokeDasharray={`${2 * Math.PI * 110} ${2 * Math.PI * 110}`}
                strokeDashoffset={2 * Math.PI * 110 * (1 - correct/4)} />
                <text id="guideLine" x="110" y="140" fontSize="30">진행률</text>
                <text textAnchor="middle" id="guideLine" x="150" y="180" fontSize="30">{(correct/4)*100}%</text>
            </svg>
        </div>
    )
}

export default Chart